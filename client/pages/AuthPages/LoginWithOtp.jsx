import React, { useState, useRef, useEffect } from 'react';
import { BsFingerprint } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

// Image imports
import dice1 from '../../src/assets/dicePng1.png';
import dice2 from '../../src/assets/dicePng5.png';
import Pawn1 from '../../src/assets/ludoToken6.png';
import Pawn2 from '../../src/assets/ludoToken4.png';

const OTP_LENGTH = 6;

const LoginWithOtp = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(60);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Timer logic
    useEffect(() => {
        let interval = null;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setResMessage("");
        setIsLoading(true);

        if (!email) {
            setResMessage("Please enter your email.");
            setIsLoading(false);
            return;
        }

        try {
            // Using the same API endpoint as the sign-up flow
            const response = await axiosInstance.post("/auth/send-otp", { email });
            setResMessage(response.data?.message || "OTP sent successfully!");
            setIsOtpSent(true);
            setTimer(60);
        } catch (error) {
            setResMessage(error.response?.data?.message || "Failed to send OTP.");
            setIsOtpSent(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setResMessage("");
        setIsLoading(true);

        const enteredOTP = otp.join("");
        if (enteredOTP.length !== OTP_LENGTH) {
            setResMessage("Please enter the complete 6-digit OTP.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/otp-verification", { email, otp: enteredOTP });
            if (response.data?.success) {
                setResMessage(response.data.message);
                if (response.data?.token) {
                    localStorage.setItem('token', response.data.token);
                }
                navigate("/dashboard");
            } else {
                setResMessage(response.data?.message || "OTP verification failed.");
            }
        } catch (error) {
            setResMessage(error.response?.data?.message || "An error occurred during verification.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        setTimer(60);
        handleSendOtp(e);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 text-white flex items-center justify-center p-4">
            {/* Background Elements */}
            <img src={dice2} alt="Ludo Dice" className="absolute md:top-20 md:left-10 w-70 h-70 transform -rotate-12 opacity-60 animate-float z-100 top-0 left-0" />
            <img src={Pawn1} alt="Ludo Pawn" className="absolute top-10 right-20 w-60 h-60 transform rotate-45 opacity-70 animate-float-delay z-100" />
            <img src={dice1} alt="Ludo Dice" className="absolute bottom-10 left-32 w-50 h-50 transform rotate-45 opacity-50 animate-float z-100" />
            <img src={Pawn2} alt="Ludo Pawn" className="absolute left-130 top-5 w-56 h-56 transform -rotate-12 opacity-80 animate-float-delay z-100" />

            {/* Main Card */}
            <div className="relative z-10 p-8 rounded-3xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-2xl w-full max-w-sm border-2 border-purple-500 border-opacity-30">
                <h1 className="text-4xl font-bold text-center mb-4 p-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Login with OTP
                </h1>
                <p className="text-center text-sm mb-8 text-gray-300">
                    {isOtpSent ? "Enter the OTP sent to your email." : "Enter your email to receive an OTP."}
                </p>

                <form className="space-y-6">
                    {!isOtpSent && (
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 bg-opacity-70 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder-gray-400"
                            />
                        </div>
                    )}

                    {isOtpSent && (
                        <div className="flex justify-center space-x-2 md:space-x-3">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-10 h-10 md:w-12 md:h-12 text-center text-xl font-bold rounded-lg bg-gray-700 bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col items-center space-y-3">
                        {!isOtpSent ? (
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isLoading}
                                className={`w-full py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-fuchsia-500 to-purple-600"
                                    }`}
                            >
                                {isLoading ? "Sending..." : "Send OTP"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={otp.join("").length !== OTP_LENGTH || isLoading}
                                className={`w-full py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${otp.join("").length === OTP_LENGTH && !isLoading ? "bg-gradient-to-r from-fuchsia-500 to-purple-600" : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </button>
                        )}

                        <p className={`text-sm text-center font-semibold ${resMessage.includes("success") ? "text-green-400" : "text-red-400"}`}>
                            {resMessage}
                        </p>

                        {isOtpSent && (
                            <div className="text-sm text-gray-400">
                                {timer > 0 ? (
                                    <span>Resend in <span className="text-purple-400 font-bold">{timer}</span> seconds</span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </form>

                <div className="mt-8 border-t border-gray-600 pt-6 flex justify-center">
                    <a href="/login-register" className="text-sm text-gray-400 hover:text-white transition duration-200">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginWithOtp;
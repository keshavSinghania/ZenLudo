import React, { useState, useEffect } from 'react'; 
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import axiosInstance from '../../api/axios';

import { IoEye, IoEyeOff } from "react-icons/io5";

import dice1 from '../../src/assets/dicePng1.png';
import dice2 from '../../src/assets/dicePng2.png';
import Pawn1 from '../../src/assets/ludoToken1.png';
import Pawn2 from '../../src/assets/ludoToken2.png';


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setResMessage("Invalid or missing token in URL.");
            navigate('/login-register');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResMessage("");
        
        if (isLoading) {
            return;
        }

        if (password !== confirmPassword) {
            setResMessage("Passwords do not match.");
            return;
        }

        const token = searchParams.get('token');
        if (!token) {
            setResMessage("Invalid or missing token.");
            return;
        }

        setIsLoading(true);

        try {
            // Send the new password AND the token to your backend
            const response = await axiosInstance.put("/auth/reset-password", { newPassword:password, token });
            
            if (response.data.success) {
                setResMessage(response.data.message);
            } else {
                setResMessage(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                setResMessage(error.response.data.message || "An error occurred. Please try again.");
            } else if (error.request) {
                setResMessage("No response from server. Check your network connection.");
            } else {
                setResMessage("Request failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 text-white flex items-center justify-center p-4">
            {/* Background Elements (Dice and Pawns) */}
            <img
                src={dice2}
                alt="Ludo Dice"
                className="absolute md:top-20 md:left-10 w-70 h-70 transform -rotate-12 opacity-60 animate-float z-100 top-0 left-0"
            />
            <img
                src={Pawn1}
                alt="Ludo Pawn"
                className="absolute top-10 right-20 w-60 h-60 transform rotate-45 opacity-70 animate-float-delay z-100"
            />
            <img
                src={dice1}
                alt="Ludo Dice"
                className="absolute bottom-10 left-32 w-50 h-50 transform rotate-45 opacity-50 animate-float z-100"
            />
            <img
                src={Pawn2}
                alt="Ludo Pawn"
                className="absolute left-130 top-5 w-56 h-56 transform -rotate-12 opacity-80 animate-float-delay z-100"
            />

            {/* Main Card */}
            <div className="relative z-10 p-8 rounded-3xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-2xl w-full max-w-sm border-2 border-purple-500 border-opacity-30">
                <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 p-2">
                    Reset Password
                </h1>
                <p className="text-center text-sm mb-8 text-gray-300">
                    Enter your new password below.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 bg-opacity-70 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder-gray-400"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 bg-opacity-70 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder-gray-400"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
                            isLoading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-fuchsia-500 to-purple-600'
                        }`}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className='flex justify-center text-amber-300 p-2'>
                    <p>{resMessage}</p>
                </div>
                <div className="mt-8 border-t border-gray-600 pt-6 flex justify-center">
                    <a href="/login-register" className="text-sm text-gray-400 hover:text-white transition duration-200">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
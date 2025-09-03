import React, { useState, useRef, useEffect } from 'react';

import { BsFingerprint } from 'react-icons/bs';

// Image imports (assuming you place your new images in this folder)
import dice1 from '../../src/assets/dicePng1.png';
import dice2 from '../../src/assets/dicePng5.png';
import Pawn1 from '../../src/assets/ludoToken6.png';
import Pawn2 from '../../src/assets/ludoToken4.png';

const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  // Timer logic for resending OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsResending(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input field
    if (element.value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input field on Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length === OTP_LENGTH) {
      alert(`Verifying OTP: ${enteredOTP}`);
      // Add your verification logic here (e.g., API call)
    } else {
      alert("Please enter a complete 6-digit OTP.");
    }
  };

  const handleResend = () => {
    setTimer(60);
    setIsResending(false);
    // Add logic to resend the OTP (e.g., API call)
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

      {/* Main Card for OTP Verification */}
      <div className="relative z-10 p-8 rounded-3xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-2xl w-full max-w-sm border-2 border-purple-500 border-opacity-30">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Verify your account
        </h1>
        <p className="text-center text-sm mb-8 text-gray-300">
          We've sent a 6-digit OTP to your email. Please enter it below.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-center space-x-2 md:space-x-3">
            {otp.map((data, index) => {
              return (
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
              );
            })}
          </div>

          <div className="flex flex-col items-center space-y-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={otp.join("").length !== OTP_LENGTH}
              className={`w-full py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
                otp.join("").length === OTP_LENGTH
                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Verify OTP
            </button>
            
            {isResending ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-gray-400">
                Resend in <span className="text-purple-400 font-bold">{timer}</span> seconds
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 border-t border-gray-600 pt-6 flex justify-around">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-2 mb-2 shadow-xl">
              <BsFingerprint className="text-3xl text-blue-500" />
            </div>
            <span className="text-xs text-gray-300 text-center">
              Login with OTP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
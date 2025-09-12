import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsFingerprint } from 'react-icons/bs';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../ReactRedux/authSlice.js';
import axiosInstance from '../../api/axios';

// Image imports
import dice2 from '../../assets/dicePng2.png';
import dice3 from '../../assets/dicePng3.png';
import dice4 from '../../assets/dicePng4.png';
import Pawn5 from '../../assets/ludoToken5.png';
import Pawn6 from '../../assets/ludoToken6.png';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dataChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setResMessage("");
    setIsLoading(true);

    const endpoint = isLoginMode ? "/auth/login" : "/auth/register";

    try {
      const response = await axiosInstance.post(endpoint, formData);
      const data = response.data;

      if (data?.success) {
        setResMessage(data.message);

        if (isLoginMode) {
          localStorage.setItem("token", data.token);
          dispatch(login({ authToken: data.token }));
          navigate("/dashboard");
        } else {
          navigate("/otp-verification", { state: { email: formData.email } });
        }
      } else {
        setResMessage(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("API error:", err.response?.data?.message || err.message);
      setResMessage(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 text-white flex items-center justify-center p-4">
      
      {/* Background Elements */}
      <img src={dice2} alt="Ludo Dice" className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 md:w-70 md:h-70 transform -rotate-12 opacity-60 animate-float z-100" />
      <img src={Pawn6} alt="Ludo Pawn" className="absolute top-10 right-5 w-16 h-16 sm:w-32 sm:h-32 md:w-60 md:h-60 transform rotate-45 opacity-70 animate-float-delay z-100 md:hidden lg:block" />
      <img src={dice3} alt="Ludo Dice" className="absolute bottom-10 left-10 w-14 h-14 sm:w-28 sm:h-28 md:w-50 md:h-50 transform rotate-45 opacity-50 animate-float z-100" />
      <img src={Pawn5} alt="Ludo Pawn" className="absolute left-20 top-5 w-16 h-16 sm:w-32 sm:h-32 md:w-56 md:h-56 transform -rotate-12 opacity-80 animate-float-delay z-100" />
      <img src={dice4} alt="Dice" className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 md:w-56 md:h-56 transform -rotate-12 opacity-80 animate-float-delay z-10" />

      {/* Main Card */}
      <div className="relative z-10 p-8 rounded-3xl bg-gray-900 bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-2xl w-full max-w-sm border-2 border-purple-500 border-opacity-30 transition-all duration-500 hover:shadow-lg-glow">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide animate-pulse-slow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            ZenLudo
          </span>
        </h1>

        {/* Middle Buttons for Login / Sign Up */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`px-6 py-2 rounded-l-full font-semibold transition duration-300 ${isLoginMode ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-purple-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`px-6 py-2 rounded-r-full font-semibold transition duration-300 ${!isLoginMode ? "bg-cyan-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-cyan-500"}`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={dataChangeHandler}
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-700 bg-opacity-60 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 placeholder-gray-400 text-white neon-border-box"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={dataChangeHandler}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-400 text-white neon-border-box"
            />
            <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-cyan-400 transition-colors"
                 onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-full text-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-xl neon-button-shadow"}`}
            disabled={isLoading}
          >
            {isLoginMode ? (isLoading ? "Logging in..." : "Login") : (isLoading ? "Registering..." : "Sign Up")}
          </button>
        </form>

        {resMessage && (
          <p className={`mt-4 text-center font-semibold ${resMessage.toLowerCase().includes("error") ? "text-red-400" : "text-green-400"}`}>
            {resMessage}
          </p>
        )}

        <p onClick={() => navigate("/forgot-password")} className="text-center text-sm mt-4 text-gray-400 cursor-pointer hover:text-pink-400 transition-colors duration-200">
          Forgot Password?
        </p>

        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-around">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-2 mb-2 shadow-xl hover:scale-110 transition duration-300 cursor-pointer neon-icon-glow">
              <FcGoogle className="text-3xl" />
            </div>
            <span className="text-xs text-gray-400 text-center hover:text-pink-400 transition-colors">
              Continue with Google
            </span>
          </div>
          <div onClick={() => navigate("/login-with-otp")} className="flex flex-col items-center">
            <div className="bg-white rounded-full p-2 mb-2 shadow-xl hover:scale-110 transition duration-300 cursor-pointer neon-icon-glow">
              <BsFingerprint className="text-3xl text-cyan-500" />
            </div>
            <span className="text-xs text-gray-400 text-center hover:text-cyan-400 transition-colors">
              Login with OTP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;


// ends
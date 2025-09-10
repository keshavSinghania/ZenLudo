import React from "react";
import bgImage from "../src/assets/LudoBoard1.png";

function LudoLoader() {
  // Floating glowing particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 8 + 4;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 3;
    return (
      <div
        key={`particle-${i}`}
        className="animate-float animate-color-shift absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.6) 60%, transparent 100%)",
          boxShadow: "0 0 10px rgba(139,92,246,0.6), 0 0 20px rgba(139,92,246,0.4)",
        }}
      ></div>
    );
  });

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>

      {/* Floating Particles */}
      {particles}

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Game Board */}
        <div
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square bg-contain bg-no-repeat bg-center animate-pulse-glow neon-board"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Loading Text */}
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse p-5">
          LOADING GAME...
        </h2>
      </div>
    </div>
  );
}

export default LudoLoader;

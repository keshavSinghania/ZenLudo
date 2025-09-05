import React from "react";
import bgImage from "../../src/assets/LudoBoard1.png";

function PlayWithBots() {
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
        }}
      ></div>
    );
  });

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden">
      {/* Matching Gradient Overlay (same as Dashboard) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>

      {/* Floating Particles */}
      {particles}

      {/* Game Board */}
      <div
        className="relative z-10 w-full h-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square bg-contain bg-no-repeat bg-center animate-pulse-glow neon-board"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </div>
  );
}

export default PlayWithBots;

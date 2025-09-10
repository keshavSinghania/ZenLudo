import React from "react";
import { useSelector } from "react-redux";
import LudoLoader from "../../Components/LudoLoader";
import bgImage from "../../assets/LudoBoard1.png";

function PlayWithBots() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Show loader until Redux confirms login
  if (!isLoggedIn) return <LudoLoader loadingMessage="Loading your game..." />;

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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>
      {particles}
      <div
        className="relative z-10 w-full h-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square bg-contain bg-no-repeat bg-center animate-pulse-glow neon-board"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </div>
  );
}

export default PlayWithBots;

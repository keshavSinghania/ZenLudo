import React from "react";
import bgImage from "../../src/assets/LudoBoard1.png";
import { useNavigate } from "react-router-dom";

function PlayWithFriends() {
  const navigate = useNavigate();
  const handlePlayOnSameDevice = () => {
    console.log("Starting a new game on the same device...");
    // Add logic here to navigate to the game board for local play
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4">
      {/* Background with Ludo feel */}
      <div
        className="absolute inset-0 opacity-10 bg-contain bg-no-repeat bg-center pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 p-8 rounded-3xl bg-gray-950/80 backdrop-blur-xl border border-purple-700/30 max-w-2xl w-full text-center shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-pulse-glow">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-4xl">🎲</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Play with Friends
            </span>
          </h2>
        </div>
        <p className="text-gray-400 text-lg sm:text-xl font-medium mb-10 tracking-wide">
          Roll the dice with your squad.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {/* Play on Same Device Card */}
          <div className="p-6 rounded-2xl bg-gray-800/60 border border-emerald-600/50 shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-emerald-400/80">
            {/* You can find or generate a new icon for this, or use a simple emoji */}
            <span className="block text-5xl mb-4 animate-pulse-slow">🎮</span>
            <h3 className="text-2xl font-bold mb-4 text-emerald-300">Same Device</h3>
            <p className="text-gray-400 mb-6">
              Challenge friends and family on a single device, no internet needed.
            </p>
            <button
              onClick={()=>{navigate('game')}}
              className="w-full py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Start Local Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayWithFriends;
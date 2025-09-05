import React, { useState } from "react";
import bgImage from "../../src/assets/LudoBoard1.png";
import dicePng7 from "../../src/assets/dicePng7.png"; 
import ludoToken8 from "../../src/assets/LudoToken8.png"; 

function CreateJoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    setIsCreating(true);
    setTimeout(() => {
      const code = generateRandomCode();
      setGeneratedCode(code);
      setIsCreating(false);
    }, 1500);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) return;
    setIsJoining(true);
    setTimeout(() => {
      console.log("Attempting to join room:", roomCode);
      setIsJoining(false);
      // Add logic here to navigate to the game room
    }, 1500); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4 sm:p-6 md:p-8 relative">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10 bg-contain bg-no-repeat bg-center pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 p-6 sm:p-8 md:p-10 rounded-3xl bg-gray-950/80 border border-purple-700/30 max-w-2xl w-full text-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
          <span className="text-3xl sm:text-4xl">🎲</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Create or Join Room
            </span>
          </h2>
        </div>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-10 tracking-wide">
          Roll the dice with your squad.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Create Room Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gray-800/60 border border-purple-600/50 shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-purple-400/80">
            <img src={dicePng7} alt="Ludo Dice" className="block w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 animate-bounce-slow" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-purple-300">New Game</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Start your own private game room and invite your friends.
            </p>
            {!generatedCode ? (
              <button
                onClick={handleCreateRoom}
                disabled={isCreating}
                className={`w-full py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.4)]
                  ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isCreating ? 'Creating...' : 'Create Room'}
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-sm sm:text-xl font-mono text-white mb-2 tracking-widest bg-gray-800 py-2 px-4 rounded-md border border-purple-400">
                  {generatedCode}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="mt-2 py-1 sm:py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  {copySuccess ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            )}
          </div>

          {/* Join Room Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gray-800/60 border border-indigo-600/50 shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-indigo-400/80">
            <img src={ludoToken8} alt="Ludo Token" className="block w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 animate-pulse-slow" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-indigo-300">Join Game</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Enter a room code to jump right into your friend's game.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm sm:text-base"
              />
              <button
                onClick={handleJoinRoom}
                disabled={isJoining || !roomCode.trim()}
                className={`w-full py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105
                  ${isJoining || !roomCode.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isJoining ? 'Joining...' : 'Join Room'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJoinRoom;

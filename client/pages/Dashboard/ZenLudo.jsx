
import React from 'react';
import { BsPersonCircle, BsTrophy, BsCoin, BsGear, BsController, BsChatDots, BsPlay, BsPersonPlus } from 'react-icons/bs';
import newLudoBg from '../../src/assets/LudoBg.png';
import GameIcon3D from '../../src/assets/ludoToken6.png';
import Pawn from '../../src/assets/ludoToken4.png';
import Dice from '../../src/assets/dicePng1.png';


const ZenLudoDashboard = () => {
    const userName = "ZenLudoPlayer";
    const coins = 1250;
    const rank = "5th";

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed text-white" 
            style={{ backgroundImage: `url(${newLudoBg})` }}
        >
            <div className="relative min-h-screen bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-8 flex flex-col">
                
                {/* Background "floating" 3D elements */}
                <img src={Pawn} alt="Ludo Pawn" className="absolute top-10 right-20 w-40 h-40 transform -rotate-45 opacity-70 animate-float-delay z-0" />
                <img src={Dice} alt="Ludo Dice" className="absolute bottom-10 left-32 w-36 h-36 transform rotate-45 opacity-50 animate-float z-0" />
                
                {/* Header */}
                <header className="w-full max-w-lg mx-auto flex justify-between items-center mb-12 relative z-10">
                    <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-70 p-3 rounded-full border border-purple-500 shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <BsPersonCircle className="text-4xl text-blue-400" />
                        <span className="text-lg font-semibold">{userName}</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-70 p-3 rounded-full border border-yellow-400 shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <BsCoin className="text-4xl text-yellow-400" />
                        <span className="text-lg font-semibold">{coins}</span>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow flex flex-col items-center justify-center space-y-10 relative z-10">
                    {/* Game Logo/Title with 3D effect */}
                    <div className="flex items-center justify-center p-4">
                        <img src={GameIcon3D} alt="Game Icon" className="w-28 h-28 md:w-36 md:h-36 transform rotate-12" />
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 ml-4 animate-pulse-slow">
                            ZenLudo
                        </h1>
                    </div>

                    {/* Options Grid with 3D and Hover Effects */}
                    <div className="grid grid-cols-2 gap-8 w-full max-w-xl p-6 bg-gray-900 bg-opacity-50 rounded-3xl shadow-3d border border-gray-700">
                        {/* Play with Friends */}
                        <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl transform hover:scale-105 transition-transform cursor-pointer animate-jiggle">
                            <BsPersonPlus className="text-5xl text-purple-400 mb-3" />
                            <span className="font-bold text-sm md:text-md text-center">Play with Friends</span>
                        </div>
                        
                        {/* Play with AI */}
                        <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl transform hover:scale-105 transition-transform cursor-pointer animate-jiggle-delay">
                            <BsController className="text-5xl text-blue-400 mb-3" />
                            <span className="font-bold text-sm md:text-md text-center">Play with AI</span>
                        </div>

                        {/* Create Room */}
                        <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl transform hover:scale-105 transition-transform cursor-pointer animate-jiggle">
                            <BsPlay className="text-5xl text-green-400 mb-3" />
                            <span className="font-bold text-sm md:text-md text-center">Create Room</span>
                        </div>
                        
                        {/* Join Room */}
                        <div className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl transform hover:scale-105 transition-transform cursor-pointer animate-jiggle-delay">
                            <BsPlay className="text-5xl text-yellow-400 mb-3" />
                            <span className="font-bold text-sm md:text-md text-center">Join Room</span>
                        </div>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="w-full max-w-lg mx-auto mt-auto flex justify-around items-center p-4 rounded-2xl bg-gray-800 bg-opacity-70 shadow-inner border border-gray-600 relative z-10">
                    <div className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white cursor-pointer transition-colors">
                        <BsTrophy className="text-3xl" />
                        <span className="text-xs">Rank</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1 text-white cursor-pointer">
                        <BsPersonCircle className="text-3xl" />
                        <span className="text-xs">Profile</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white cursor-pointer transition-colors">
                        <BsGear className="text-3xl" />
                        <span className="text-xs">Settings</span>
                    </div>
                </nav>

            </div>
        </div>
    );
};

export default ZenLudoDashboard;
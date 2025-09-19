import React, { useEffect, useState } from "react";
import diceBg from "../../assets/LudoBoard1.png";
import defaultAvatar from "../../assets/default-avatar-zenludo.png";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfilePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth)
  //firstPlaceWins//gamesPlayed//gamesWon//name//profilePic//recentGames//username(data coming from db )
    return (
        <div className="relative w-full min-h-screen bg-gray-950 text-white overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${diceBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-70"></div>

            {/* Profile Header */}
            <div className="relative z-10 flex flex-col items-center py-12 px-4 border-b border-purple-800">
                <img
                    src={userData?.profilePic}
                    alt={userData?.name}
                    className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-lg object-cover"
                />
                <h1 className="mt-4 text-4xl font-extrabold">{userData?.name}</h1>
                <p className="text-gray-400">@{userData?.username}</p>

                {/* Actions */}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition shadow-md font-semibold text-sm"
                    >
                        Edit Profile
                    </button>
                    <button 
                    onClick={()=>navigate("/dashboard/add-friends")}
                    className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:scale-105 transition shadow-md font-semibold text-sm">
                        Add Friend
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 max-w-4xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                    <p className="text-2xl font-bold">{userData?.gamesPlayed ?? "N/A"}</p>
                    <p className="text-gray-400 text-sm">Games Played</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{userData?.gamesWon ?? "N/A"}</p>
                    <p className="text-gray-400 text-sm">Games Won</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{userData?.firstPlaceWins ?? "N/A"}</p>
                    <p className="text-gray-400 text-sm">1st Place Wins</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">
                        {userData?.gamesPlayed
                            ? `${Math.round((userData?.gamesWon / userData?.gamesPlayed) * 100)}%`
                            : "N/A"}
                    </p>
                    <p className="text-gray-400 text-sm">Win Rate</p>
                </div>
            </div>

            {/* Recent Games */}
            <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
                <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
                {userData?.recentGames?.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-200 space-y-2 max-h-40 overflow-y-auto">
                        {userData.recentGames.map((game, idx) => (
                            <li key={idx}>{game}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">No recent games found</p>
                )}
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                        {/* Avatar Upload */}
                        <div className="mb-4 flex flex-col items-center">
                            <img
                                src={userData?.profilePic || defaultAvatar}
                                alt="avatar"
                                className="w-24 h-24 rounded-full border-2 border-purple-500 object-cover mb-2"
                            />
                            <input type="file" className="text-sm text-gray-300" />
                        </div>

                        {/* Change Name */}
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Change Name</label>
                            <input
                                type="text"
                                defaultValue={userData?.name}
                                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Change Username */}
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Change Username (1/month)</label>
                            <input
                                type="text"
                                defaultValue={userData?.username}
                                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Save Button */}
                        <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

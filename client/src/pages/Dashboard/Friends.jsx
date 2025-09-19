import React from "react";
import diceBg from "../../assets/LudoBoard1.png";
import defaultAvatar from "../../assets/default-avatar-zenludo.png";
import axiosInstance from "../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  

  // Floating particles
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

  const [fetchFriendLoading , setFetchFriendLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [friends , setFriends] = useState([]);


  //function to fetch all the friends 
  useEffect(()=>{
    fetchFriends();
  },[])
  const fetchFriends = async() => {
    try {
        setNotification('');
        setFetchFriendLoading(true);
        const response = await axiosInstance.get("/friend/fetch-friends");
        if(response?.data?.success){
            setNotification(response?.data?.message);
            console.log(response?.data?.data);
            setFriends(response?.data?.data);
            // profilePic username name gamesPlayed gamesWon firstPlaceWins recentGames (this information receiving from db)
        }
    } catch (error) {
         if (error.code === "ERR_NETWORK") {
                setNotification("Network error: Check your internet connection.");
            } else if (error.response) {
                setNotification(error.response.data?.message || "Server error occurred");
            } else {
                setNotification(error.message || "Unexpected error occurred");
            }
    }finally{
        setFetchFriendLoading(false);
    }
  }

  return (
    <div className="relative w-full h-full bg-gray-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${diceBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60"></div>
        {particles}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full overflow-y-auto py-10 px-4">
        <div className="flex flex-col items-center space-y-10">
          {/* Title */}
          <h1 className="text-4xl p-2 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse-slow">
            My Friends
          </h1>

          {/* Friend List */}
          <div className="w-full max-w-3xl">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="p-4 mb-4 bg-gray-900 bg-opacity-80 rounded-xl border border-purple-600 flex items-center justify-between hover:scale-105 transition shadow-lg"
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={friend.profilePic || defaultAvatar}
                    alt={friend.name}
                    className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{friend.name || "N/A"}</h3>
                    <p className="text-gray-400 text-sm">@{friend.username || "N/A"}</p>

                    {/* Status */}
                    {friend?.isOnline ? (
                      <p className="text-green-400 text-xs font-medium">🟢 Online</p>
                    ) : (
                      <p className="text-gray-400 text-xs">
                        Last active: {friend?.lastActive || "Recently"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold hover:scale-105 transition transform shadow-md"
                    onClick={() => alert(`Chat with ${friend.name}`)}
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}

            {friends.length === 0 && (
              <p className="text-gray-400 text-center">No friends found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;

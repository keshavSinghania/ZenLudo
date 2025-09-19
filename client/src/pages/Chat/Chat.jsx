import React, { useState } from "react";
import { useSelector } from "react-redux";
import LudoLoader from "../../Components/LudoLoader"; 
import defaultAvatar from "../../assets/default-avatar-zenludo.png";
import bgImage from "../../assets/LudoBoard1.png"; 
import { FaSearch, FaArrowLeft } from "react-icons/fa";


function PlayWithBots() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const friends = [
    { id: 1, name: "Meow1", lastMessage: "Hey! How are you?", avatar: defaultAvatar, status: "online" },
    { id: 2, name: "Miss meow", lastMessage: "milk milk", avatar: defaultAvatar, status: "offline" },
    { id: 3, name: "mr meow", lastMessage: "rat rat", avatar: defaultAvatar, status: "online" },
    { id: 4, name: "bhagad billa", lastMessage: "khiii khiii", avatar: defaultAvatar, status: "away" },
    { id: 5, name: "Billu don", lastMessage: "Dekh dekh dekh kaise khush ho rha", avatar: defaultAvatar, status: "online" },
    { id: 6, name: "Keshav singhania", lastMessage: "Bye guyz", avatar: defaultAvatar, status: "offline" },
  ];
  const messages = [
    { id: 1, sender: "me", text: "Hii dog!", time: "10:30 AM" },
    { id: 2, sender: "friend", text: "gooooooooood night😄", time: "10:32 AM" },
    { id: 3, sender: "me", text: "tin tin tin", time: "10:34 AM" },
    { id: 4, sender: "friend", text: "lalalalalala", time: "10:35 AM" },
    { id: 5, sender: "me", text: "bhaaaaag jaa", time: "10:36 AM" },
    { id: 6, sender: "friend", text: "meow meow", time: "10:37 AM" },
    { id: 7, sender: "me", text: "kyu bhaaaai hila dala n?", time: "10:38 AM" },
    { id: 8, sender: "friend", text: "chaloo bye....", time: "10:39 AM" },
  ];

  const [activeView, setActiveView] = useState("friends");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        className="animate-float animate-color-shift absolute rounded-full z-10" // z-10 for particles
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
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>

      {/* Floating Particles */}
      {particles}

      {/* Ludo Board Background (behind the chat UI) */}
      <div
        className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center animate-pulse-glow neon-board z-20" // z-20 for Ludo board
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* MAIN CHAT UI glass */}
      <div className="relative flex w-full h-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-30 mx-4 my-4 md:mx-auto md:max-w-7xl lg:max-w-screen-lg xl:max-w-screen-xl"> {/* z-30 for chat UI */}

        {/* LEFT PORTION - Friends List */}
        <div className={`
            w-full md:w-1/4 lg:w-[25vw] xl:w-[20vw] 
            flex-col p-4 
            border-r border-white/10 
            bg-white/5 backdrop-blur-md 
            text-white 
            ${activeView === 'friends' ? 'flex' : 'hidden'} 
            md:flex 
            transition-all duration-300 ease-in-out
        `}>
          {/* ZenChat Logo */}
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              ZenChat
            </h2>
          </div>

          {/* SEARCH INPUT */}
          <div className="flex items-center p-3 mb-6 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-purple-500 transition-colors">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="search"
              placeholder="Search Friends..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-bold mb-4 text-gray-300">Conversations</h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                    <div
                        key={friend.id}
                        className={`flex items-center gap-4 p-3 mb-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors relative 
                                    ${selectedFriend && selectedFriend.id === friend.id ? 'bg-white/15' : ''}`}
                        onClick={() => {
                            setSelectedFriend(friend);
                            setActiveView("chat");
                        }}
                    >
                        <div className="relative">
                            <img
                                src={friend.avatar}
                                alt={friend.name}
                                className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                            />
                            {/* Status indicator */}
                            <span className={`
                                absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white/20 
                                ${friend.status === "online" ? "bg-green-500" :
                                  friend.status === "offline" ? "bg-gray-500" :
                                  "bg-yellow-500"}
                            `}/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-white truncate">{friend.name}</h3>
                            <p className="text-sm text-gray-300 truncate">{friend.lastMessage}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400 mt-10">No friends found.</p>
            )}
          </div>
        </div>

        {/* RIGHT PORTION Chat Area */}
        <div className={`
            w-full flex-col md:w-3/4 lg:w-[75vw] xl:w-[80vw] 
            flex-grow 
            text-white 
            ${activeView === 'chat' ? 'flex' : 'hidden'} 
            md:flex 
            transition-all duration-300 ease-in-out
        `}>
          {/* Top Bar Friend Info */}
          <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-white/10 backdrop-blur-md rounded-t-lg shadow-lg">
            {/* Mobile back button */}
            <button
              onClick={() => setActiveView("friends")}
              className="md:hidden text-white text-xl p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <FaArrowLeft />
            </button>
            <img
              src={selectedFriend ? selectedFriend.avatar : defaultAvatar}
              alt={selectedFriend ? selectedFriend.name : "Selected Friend"}
              className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{selectedFriend ? selectedFriend.name : "Select a friend"}</h2>
              <p className={`text-sm ${selectedFriend && selectedFriend.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                {selectedFriend ? (selectedFriend.status === 'online' ? 'Online' : selectedFriend.status === 'offline' ? 'Offline' : 'Away') : 'Offline'}
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-5 py-3 rounded-3xl text-sm shadow-md ${
                    msg.sender === "me"
                      ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-br-none"
                      : "bg-white/20 text-white rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-gray-300 mt-1 text-right">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-b-lg shadow-lg">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-5 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform font-bold text-white shadow-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayWithBots;
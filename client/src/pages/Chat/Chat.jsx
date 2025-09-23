import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import LudoLoader from "../../Components/LudoLoader";
import defaultAvatar from "../../assets/default-avatar-zenludo.png";
import bgImage from "../../assets/LudoBoard1.png";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../api/axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Chat() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [limit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [chatLoadingError, setChatLoadingError] = useState("Loading your chat...");
    const [text, setText] = useState("");
    const [activeView, setActiveView] = useState("friends");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [hasMoreData, setHasMoreData] = useState(true);
    const chatEndRef = useRef(null);

    // fetch friends
    const fetchFriends = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/friend/fetch-friends");
            const data = response?.data;
            if (data?.success) {
                setFriends(data?.data);
            } else {
                setErrorMessage(data?.message || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErrorMessage("Network error: Check your internet connection.");
            } else if (error.response) {
                setErrorMessage(error.response.data?.message || "Server error occurred.");
            } else {
                setErrorMessage(error.message || "Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // fetch conversation
    const fetchConversation = async (friendId, reset = false) => {
        try {
            setChatLoadingError("Loading your chat...");
            setChatLoading(true);
            const response = await axiosInstance.get(`/message/fetch-conversation/${friendId}`, {
                params: { skip, limit },
            });
            const data = response?.data;
            if (data?.success) {
                setMessages((prevMessages) => [...prevMessages, ...data?.data]);
                if (data?.data.length === 0 && reset) {
                    setChatLoadingError("Say hi! to start the conversation.");
                }
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setChatLoadingError("Network error: Check your internet connection.");
            } else if (error.response) {
                setChatLoadingError(error.response.data?.message || "Server error occurred.");
            } else {
                setChatLoadingError(error.message || "Unexpected error occurred.");
            }
        } finally {
            setChatLoading(false);
        }
    };

    // send message
    const sendMessage = async (e) => {
        e.preventDefault();
        if (text.trim().length === 0 || !selectedFriend?._id) return;
        try {
            const newMessage = {
                _id: `temp-${Date.now()}`,
                senderId: user?._id,
                text,
                createdAt: new Date().toISOString(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setText("");

            const response = await axiosInstance.post("/message/send-message", {
                receiverId: selectedFriend?._id,
                text: newMessage.text,
            });

            const data = response?.data;
            if (data?.success) {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg._id === newMessage._id ? { ...data?.data, senderId: user?._id } : msg
                    )
                );
            } else {
                setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== newMessage._id));
                setErrorMessage(data?.message || "Failed to send message.");
            }
        } catch (error) {
            setMessages((prevMessages) => prevMessages.filter((msg) => !msg._id.startsWith("temp-")));
            setErrorMessage("Failed to send message. Please try again.");
        }
    };

    //fetch older messages
    const fetchOlderMessages = () => {
        console.log("check")
    }
    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // open conversation
    const openConversation = (friend) => {
        setSelectedFriend(friend);
        setActiveView("chat");
        setMessages([]);
        setSkip(0);
        setChatLoadingError("Loading your chat...");
        fetchConversation(friend._id, true);
    };

    const filteredFriends = friends.filter((friend) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isLoggedIn) return null;

    if (isLoading && friends.length === 0) {
        return <LudoLoader loadingMessage={errorMessage || "Loading your friends list..."} />;
    }

    const particles = Array.from({ length: 20 }, (_, i) => {
        const size = Math.random() * 8 + 4;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        return (
            <div
                key={`particle-${i}`}
                className="animate-float animate-color-shift absolute rounded-full z-10"
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
                className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center animate-pulse-glow neon-board z-20"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className="relative flex w-full h-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-30 mx-4 my-4 md:mx-auto md:max-w-7xl lg:max-w-screen-lg xl:max-w-screen-xl">
                {/* LEFT PORTION */}
                <div
                    className={`
            w-full md:w-1/4 lg:w-[25vw] xl:w-[20vw]
            flex-col p-4
            border-r border-white/10
            bg-white/5 backdrop-blur-md
            text-white
            ${activeView === "friends" ? "flex" : "hidden"}
            md:flex
            transition-all duration-300 ease-in-out
          `}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                            ZenChat
                        </h2>
                    </div>

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
                        {errorMessage ? (
                            <p className="text-center text-red-400 mt-10">{errorMessage}</p>
                        ) : filteredFriends.length > 0 ? (
                            filteredFriends.map((friend) => (
                                <div
                                    key={friend?._id}
                                    className={`flex items-center gap-4 p-3 mb-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors ${selectedFriend && selectedFriend._id === friend._id ? "bg-white/15" : ""
                                        }`}
                                    onClick={() => openConversation(friend)}
                                >
                                    <div className="relative">
                                        <img
                                            src={friend?.profilePic || defaultAvatar}
                                            alt={friend?.name}
                                            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                                        />
                                        <span
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white/20 ${friend?.status === "online"
                                                ? "bg-green-500"
                                                : friend?.status === "offline"
                                                    ? "bg-gray-500"
                                                    : "bg-yellow-500"
                                                }`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg text-white truncate">{friend?.username}</h3>
                                        <p className="font-semibold text-sm text-white truncate">{friend?.name}</p>
                                        <p className="text-sm text-gray-300 truncate">
                                            {friend?.lastMessage?.length > 0
                                                ? friend?.lastMessage[friend.lastMessage.length - 1].text
                                                : "No message"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 mt-10">No friends found.</p>
                        )}
                    </div>
                </div>

                {/* RIGHT PORTION */}
                <div
                    className={`
            w-full flex-col md:w-3/4 lg:w-[75vw] xl:w-[80vw]
            flex-grow
            text-white
            ${activeView === "chat" ? "flex" : "hidden"}
            md:flex
            transition-all duration-300 ease-in-out
          `}
                >
                    {selectedFriend ? (
                        <>
                            <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-white/10 backdrop-blur-md rounded-t-lg shadow-lg">
                                <button
                                    onClick={() => setActiveView("friends")}
                                    className="md:hidden text-white text-xl p-2 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <FaArrowLeft />
                                </button>
                                <img
                                    src={selectedFriend.profilePic || defaultAvatar}
                                    alt={selectedFriend.name}
                                    className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedFriend?.name}</h2>
                                    <p className="text-sm font-bold text-gray-400">{selectedFriend?.username}</p>
                                    <p className={`text-sm ${selectedFriend?.status === "online" ? "text-green-400" : "text-gray-400"}`}>
                                        {selectedFriend.status === "online"
                                            ? "Online"
                                            : selectedFriend?.status === "offline"
                                                ? "Offline"
                                                : "Away"}
                                    </p>
                                </div>
                            </div>

                            <div id="" className="flex-1 p-4 custom-scrollbar">
                                <InfiniteScroll
                                    dataLength={messages.length}
                                    next={fetchOlderMessages}
                                    inverse={true}
                                    hasMore={hasMoreData}
                                    loader={<h4 className="text-center">aur msssgg dikha de</h4>}
                                    height="100%"  
                                    
                                    style={{ display: "flex", flexDirection: "column-reverse" }}
                                >
                                    {chatLoading ? (
                                        <p className="flex items-center justify-center text-center p-5 text-gray-400">
                                            {chatLoadingError}
                                        </p>
                                    ) : messages.length !== 0 ? (
                                        messages.map((msg) => (
                                            <div
                                                key={msg._id}
                                                className={`flex ${msg?.senderId !== selectedFriend?._id ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs px-5 py-3 rounded-3xl text-sm shadow-md ${msg.senderId !== selectedFriend?._id
                                                            ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-br-none"
                                                            : "bg-white/20 text-white rounded-bl-none"
                                                        }`}
                                                >
                                                    <p>{msg.text}</p>
                                                    <span className="block text-[10px] text-gray-300 mt-1 text-right">
                                                        {new Date(msg?.createdAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="flex items-center justify-center text-center p-5 text-gray-400">
                                            {chatLoadingError || "Send hi to start a conversation."}
                                        </p>
                                    )}

                                    <div ref={chatEndRef} />
                                </InfiniteScroll>

                            </div>


                            <form onSubmit={sendMessage}>
                                <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-b-lg shadow-lg">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        onChange={(e) => setText(e.target.value)}
                                        value={text}
                                        className="flex-1 px-5 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform font-bold text-white shadow-lg"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xl text-center p-4">
                            <p>Please select a friend to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;

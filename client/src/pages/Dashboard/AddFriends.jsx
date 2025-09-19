import React, { useState, useEffect } from "react";
import diceBg from "../../assets/LudoBoard1.png";
import defaultAvatar from "../../assets/default-avatar-zenludo.png";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";

const AddFriends = () => {
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

    // SEARCH FRIEND LOGIC
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [friendInformation, setFriendInformation] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [displayResult, setDisplayResult] = useState(false);
    const  friendIds  = useSelector((state) => state.auth.friendIds);

    const handleSearch = async () => {
        try {
            setDisplayResult(false);
            setLoading(true);
            setErrorMessage("");

            const response = await axiosInstance.post("/friend/search-friend", {
                friendUsername: username,
            });

            if (response?.data?.success) {
                setFriendInformation(response.data.friendInformation);
                setDisplayResult(true);
            } else {
                setErrorMessage(response?.data?.message || "Something went wrong");
                setFriendInformation(null);
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErrorMessage("Network error: Check your internet connection.");
            } else if (error.response) {
                setErrorMessage(error.response.data?.message || "Server error occurred");
            } else {
                setErrorMessage(error.message || "Unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    // HANDLE SEND FRIEND REQUEST
    const [sendFriendRequestLoading, setSendFriendRequestLoading] = useState(false);
    const sendFriendRequest = async (friendId) => {
        try {
            setSendFriendRequestLoading(true);
            setErrorMessage("");

            const response = await axiosInstance.post("/friend/send-friend-request", {
                friendId: friendId
            });
            if (response?.data?.success) {
                setErrorMessage(response?.data?.message);
                setFriendInformation(null);
            } else {
                setErrorMessage(response?.data?.message || "Something went wrong while searching ");
                setFriendInformation(null);
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErrorMessage("Network error: Check your internet connection.");
            } else if (error.response) {
                setErrorMessage(error.response.data?.message || "Server error occurred");
            } else {
                setErrorMessage(error.message || "Unexpected error occurred");
            }
        } finally {
            setSendFriendRequestLoading(false);
        }
    }

    // HANDLE ALL THE RECEIVED FRIEND REQUEST
    const [friendRequests, setFriendRequests] = useState([]);
    const [fetchFriendRequestsMessage, setFetchFriendRequestsMessage] = useState("");

    const fetchAllFriendRequest = async () => {
        try {
            const response = await axiosInstance.get("/friend/fetch-friend-requests");
            if (response.data.success) {
                setFetchFriendRequestsMessage("");
                setFriendRequests(response?.data?.friendRequests);
            } else {
                setFetchFriendRequestsMessage(response?.data?.message || "Something went wrong while fetching your all friend requests");
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setFetchFriendRequestsMessage("Network error: Check your internet connection.");
            } else if (error.response) {
                setFetchFriendRequestsMessage(error.response.data?.message || "Server error occurred");
            } else {
                setFetchFriendRequestsMessage(error.message || "Unexpected error occurred");
            }
        }
    }

    useEffect(() => {
        fetchAllFriendRequest();
    }, []);

    // HANDLE ACCEPT AND REJECT FRIEND REQUESTS
    const [acceptOrRejectLoading, setAcceptOrRejectLoading] = useState(false);
    const [acceptOrRejectMessage, setAcceptOrRejectMessage] = useState("");
    const handelAcceptOrRejectFriendRequest = async ({ task, friendId }) => {
        try {
            setAcceptOrRejectMessage("");
            setAcceptOrRejectLoading(true);
            const response = await axiosInstance.post(`/friend/${task}-friend-request`, { friendId: friendId });
            if (response?.data?.success) {
                setAcceptOrRejectMessage(response?.data?.message);
            } else {
                setAcceptOrRejectMessage(response?.data?.message);
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setAcceptOrRejectMessage("Network error: Check your internet connection.");
            } else if (error.response) {
                setAcceptOrRejectMessage(error.response.data?.message || "Server error occurred");
            } else {
                setAcceptOrRejectMessage(error.message || "Unexpected error occurred");
            }
        } finally {
            fetchAllFriendRequest();
            setAcceptOrRejectLoading(false);
        }
    }

    return (
        <div className="relative w-full h-full bg-gray-950 text-white">
            {/* Backgrounds */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat opacity-20"
                    style={{ backgroundImage: `url(${diceBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60"></div>
                {particles}
            </div>

            {/* Scrollable content container */}
            <div className="relative z-10 w-full h-full overflow-y-auto py-10 px-4">
                <div className="flex flex-col items-center space-y-10">
                    {/* Title */}
                    <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse-slow">
                        Friends
                    </h1>

                    {/*SEARCH FRIEND*/}
                    <div className="w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-white">Search Friend</h2>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Enter username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="flex-1 px-4 py-3 bg-gray-900 bg-opacity-70 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 neon-border-box transition duration-300"
                            />
                            <button
                                className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-xl hover:scale-105 transition transform shadow-md font-semibold"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>

                        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

                        {/* DISPLAYING SEARCH RESULT */}
                        {displayResult && friendInformation && (
                            <div className="p-5 bg-gray-900 bg-opacity-80 rounded-xl border border-purple-600 shadow-lg flex flex-col md:flex-row gap-6 transition hover:scale-105">
                                <div className="flex-shrink-0 flex justify-center items-center">
                                    <img
                                        src={friendInformation.profilePic || defaultAvatar}
                                        className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-purple-500 object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold">{friendInformation.name}</h3>
                                        <p className="text-gray-400 text-sm">@{friendInformation.username}</p>
                                    </div>

                                    {/* Game Stats */}
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <p className="text-white font-semibold">{friendInformation.gamesPlayed ?? 0}</p>
                                            <span className="text-gray-400 text-xs">Games Played</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{friendInformation.gamesWon ?? 0}</p>
                                            <span className="text-gray-400 text-xs">Games Won</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{friendInformation.firstPlaceWins ?? 0}</p>
                                            <span className="text-gray-400 text-xs">1st Place Wins</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{friendInformation.recentGames?.length ?? 0}</p>
                                            <span className="text-gray-400 text-xs">Recent Games</span>
                                        </div>
                                    </div>

                                    {/* Recent Games */}
                                    <div className="mt-4">
                                        <p className="text-gray-400 text-sm font-medium mb-1">Recent Games:</p>
                                        {friendInformation.recentGames?.length > 0 ? (
                                            <ul className="text-white text-sm list-disc list-inside max-h-28 overflow-y-auto">
                                                {friendInformation.recentGames.map((game, idx) => (
                                                    <li key={idx}>{game || "N/A"}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-white text-sm">N/A</p>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        {friendIds?.includes(friendInformation._id) ? (
                                            <button
                                                disabled
                                                className="px-5 py-2 bg-gray-600 rounded-full shadow-md font-semibold text-sm cursor-not-allowed"
                                            >
                                                Already Friend
                                            </button>
                                        ) : (
                                            <button
                                                disabled={sendFriendRequestLoading}
                                                onClick={() => sendFriendRequest(friendInformation._id)}
                                                className={`cursor-pointer px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 ${sendFriendRequestLoading ? "from-cyan-300 to-blue-300" : ""
                                                    } rounded-full hover:scale-105 transition transform shadow-md font-semibold text-sm`}
                                            >
                                                {sendFriendRequestLoading ? "Sending request..." : "Send Request"}
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    {/*FRIEND REQUESTS */}
                    <div className="w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-white">Friend Requests</h2>
                        {friendRequests.map((req) => (
                            <div
                                key={req._id}
                                className="p-4 mb-3 bg-gray-900 bg-opacity-80 rounded-xl border border-purple-600 flex items-center justify-between transition hover:scale-105"
                            >
                                <div className="flex items-center gap-4">
                                    <img src={req.profilePic || defaultAvatar} className="w-14 h-14 rounded-full border-2 border-purple-500" />
                                    <div>
                                        <h3 className="text-lg font-semibold">{req.name}</h3>
                                        <p className="text-gray-400">@{req.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { handelAcceptOrRejectFriendRequest({ task: "accept", friendId: req._id }) }}
                                        disabled={acceptOrRejectLoading}
                                        className="px-4 cursor-pointer py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-sm font-semibold hover:scale-105 transition transform shadow-md">
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => { handelAcceptOrRejectFriendRequest({ task: "reject", friendId: req._id }) }}
                                        disabled={acceptOrRejectLoading}
                                        className="px-4 py-2 cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-sm font-semibold hover:scale-105 transition transform shadow-md">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                        {acceptOrRejectMessage.length > 0 && <p className="text-gray-400">{acceptOrRejectMessage}</p>}
                        {friendRequests.length === 0 && !fetchFriendRequestsMessage && !acceptOrRejectMessage && (
                            <p className="text-gray-400">No friend request found</p>
                        )}
                        {fetchFriendRequestsMessage && <p className="text-gray-400">{fetchFriendRequestsMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFriends;

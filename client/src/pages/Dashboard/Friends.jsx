import React, { useState } from "react";
import diceBg from "../../assets/LudoBoard1.png";
import defaultAvatar from "../../assets/default-avatar-zenludo.png"
import axiosInstance from "../../api/axios";
const SearchFriend = () => {

    // Floating neon particles
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

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [friendInformation, setFriendInformation] = useState({
        name: "",
        username: "",
        profilePic: "",
        gamesPlayed: null,
        gamesWon: null,
        firstPlaceWins: null,
        recentGames: null,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [displayResult, setDisplayResult] = useState(false);

    //to fill all the friend information into friendInformation state
    const updateFriendInformation = (friendInformation) => {
        setFriendInformation((prev) => ({ ...prev, ...friendInformation }));
    }

    //function to handle data ( username) changes (updating to the state)
    const dataChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    

    //function to handle search 
    const handleSearch = async () => {
        try {
            setDisplayResult(false);
            setLoading(true);
            setErrorMessage("");
            const response = await axiosInstance.post("/friend/search-friend", {
                friendUsername: username
            });

            if (response?.data?.success) {
                updateFriendInformation(response.data.friendInformation);
                setDisplayResult(true);
            } else {
                setErrorMessage(response?.data?.message || "Something went wrong");
                setFriendInformation({
                    name: null,
                    username: null,
                    profilePic: null,
                    gamesPlayed: null,
                    gamesWon: null,
                    firstPlaceWins: null,
                    recentGames: null,
                });
                setDisplayResult(false);
            }

        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setErrorMessage("Network error: Please check your internet connection.");
            } else if (error.response) {
                setErrorMessage(error.response.data?.message || "Server error occurred");
            } else {
                setErrorMessage(error.message || "An unexpected error occurred");
            }

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gray-950 text-white overflow-hidden py-10 px-4">
            {/* Dice/board background */}
            <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 z-0"
                style={{ backgroundImage: `url(${diceBg})` }}
            ></div>

            {/* Gradient overlay */}.
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>

            {/* Floating particles */}
            {particles}

            {/* Title */}
            <h1 className="relative z-10 text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse-slow">
                Search Friends
            </h1>

            {/* Search Input + Button */}
            <div className="relative z-10 w-full max-w-md mb-6 flex">
                <input
                    type="text"
                    placeholder="Search by username..."
                    onChange={dataChangeHandler}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            handleSearch();
                        }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-900 bg-opacity-70 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 neon-border-box transition duration-300"
                />
                <button
                    className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-xl hover:scale-105 transition transform shadow-md text-white font-semibold"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    Search
                </button>
            </div>

            {/* Results */}
            <div className="relative z-10 w-full max-w-md flex flex-col gap-4">

                {loading && (<p className="text-center text-gray-400">Please wait....</p>)}
                {errorMessage && (<p className="text-center text-red-600">{errorMessage}</p>)}

                {displayResult && (
                    <div className="p-6 bg-gray-900 bg-opacity-80 border border-purple-600 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,255,0.5),0_0_50px_rgba(0,255,255,0.3)] hover:scale-105">

                        {/* Profile Picture */}
                        <div className="flex-shrink-0 flex justify-center items-center">
                            <img
                                src={defaultAvatar}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-purple-500 object-cover"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 flex flex-col justify-between">
                            {/* Name & Username */}
                            <div>
                                <h2 className="text-2xl font-bold text-white">{friendInformation?.name || "N/A"}</h2>
                                <p className="text-gray-400 text-sm">@{friendInformation?.username || "N/A"}</p>
                            </div>

                            {/* Game Stats */}
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-white font-semibold">{friendInformation?.gamesPlayed ?? 0}</p>
                                    <span className="text-gray-400 text-xs">Games Played</span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{friendInformation?.gamesWon ?? 0}</p>
                                    <span className="text-gray-400 text-xs">Games Won</span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{friendInformation?.firstPlaceWins ?? 0}</p>
                                    <span className="text-gray-400 text-xs">1st Place Wins</span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{friendInformation?.recentGames?.length ?? 0}</p>
                                    <span className="text-gray-400 text-xs">Recent Games</span>
                                </div>
                            </div>

                            {/* Recent Games */}
                            <div className="mt-4">
                                <p className="text-gray-400 text-sm font-medium mb-1">Recent Games:</p>
                                {friendInformation?.recentGames?.length > 0 ? (
                                    <ul className="text-white text-sm list-disc list-inside max-h-28 overflow-y-auto">
                                        {friendInformation.recentGames.map((game, idx) => (
                                            <li key={idx}>{game || "N/A"}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-white text-sm">N/A</p>
                                )}
                            </div>

                            {/* Add Friend Button */}
                            <div className="mt-4 flex justify-end">
                                <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:scale-105 transition transform shadow-md font-semibold text-sm">
                                    Add Friend
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFriend;

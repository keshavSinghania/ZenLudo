import React, { useState } from 'react';

export const ChooseNumOfPlayers = ({ setOpenNumOfPlayersModel, setNumOfPlayers , startGameHandler}) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (num) => {
    setSelected(num);
    setNumOfPlayers(num);
  };

  const handleStart = () => {
    setOpenNumOfPlayersModel(false);
    console.log(`Game starting with ${selected} players`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center transform transition-all duration-300 scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow-lg">
          Choose Number of Players
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          {[2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              className={`px-6 py-3 rounded-xl font-bold transition-transform duration-300 shadow-lg
                ${
                  selected === num
                    ? 'bg-purple-500 text-white scale-110'
                    : 'bg-white/90 text-gray-900 hover:bg-purple-200'
                }`}
            >
              {num} Players
            </button>
          ))}
        </div>

        {selected && (
          <button
            onClick={startGameHandler}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-md mb-4"
          >
            Start Game
          </button>
        )}

        <button
          onClick={() => setOpenNumOfPlayersModel(false)}
          className="text-red-300 hover:underline font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChooseNumOfPlayers;

import React from "react";

const NetworkError = ({ retry }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 text-white z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-extrabold text-red-500 mb-4">
          ⚠️ Network Error
        </h2>
        <p className="text-gray-300 mb-6">
          Unable to connect to the server. Please check your internet connection.
        </p>
        <button
          onClick={retry}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-md"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default NetworkError;

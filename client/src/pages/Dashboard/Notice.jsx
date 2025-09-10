import React from 'react';

const Notice = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-gradient-to-r from-purple-800 via-blue-800 to-pink-800 text-white rounded-2xl shadow-lg border-2 border-purple-500">
      <h1 className="text-3xl font-bold mb-4 text-center">Notice</h1>
      <p className="mb-4">
        Hey! This is <span className="font-semibold">Keshav Singhania</span>, thanks for showing interest in my <span className="italic font-semibold">ZenLudo</span> Project.
      </p>
      <p className="mb-4">
        Currently, the game is under construction. There are many logic flaws in the game, and I am actively trying to fix them.
      </p>
      <p className="mb-4">
        However, you can still try playing with a friend in local game mode — but beware, there might be some logic errors hehehe!
      </p>
      <p className="mb-4">
        As I am doing this project alone, it will take some time to complete. Stay connected!
      </p>
      <p>
        You can contact me on <span className="font-semibold">WhatsApp: 8434090080</span> or via email: <span className="font-semibold">worksinghania@gmail.com</span>
      </p>
    </div>
  );
};

export default Notice;

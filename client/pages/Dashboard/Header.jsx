// Header.js
import React from 'react';

function Header() {
  return (
    <header className="flex justify-end w-full p-4 space-x-4">
      {/* Icons will need custom components to add the glow effects */}
      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-800">
        <span className="text-xl">🔍</span>
      </div>
      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-800">
        <span className="text-xl">❤️</span>
      </div>
      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-800">
        <span className="text-xl">👤</span>
      </div>
    </header>
  );
}

export default Header;
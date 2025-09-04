// Navigation.js
import React from 'react';

const navItems = [
  { name: 'Play with Bots', icon: '🤖' },
  { name: 'Play with Friends', icon: '🤝', active: true },
  { name: 'Create or Join Room', icon: '➕' },
  { name: 'Friends', icon: '👥' },
  { name: 'History', icon: '📜' },
  { name: 'Profile', icon: '👤' },
];

function Navigation() {
  return (
    <nav className="w-64 p-4 space-y-4">
      <div className="flex items-center space-x-2 text-2xl font-bold mb-8">
        <span className="text-purple-400">Zen</span><span className="text-indigo-400">Ludo</span>
      </div>
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              item.active
                ? 'bg-purple-600 bg-opacity-30 border border-purple-400 text-white shadow-purple-500/50'
                : 'hover:bg-gray-800 text-gray-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
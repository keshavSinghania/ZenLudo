import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex w-screen h-screen bg-gray-950 text-white font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-0"></div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none transition"
      >
        ☰
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-20 backdrop-blur-sm"
        ></div>
      )}

      {/* Main Content */}
      <div className="relative flex flex-grow z-10">
        {/* Sidebar */}
        <nav
          className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
            w-52 lg:w-64 p-4 space-y-6
            bg-gray-950/90 backdrop-blur-lg border-r border-purple-700/20
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0 lg:bg-transparent lg:z-auto z-30
          `}
        >
          <div className="flex items-center space-x-2 text-2xl font-extrabold mb-10">
            <span className="text-purple-400 drop-shadow-lg">Zen</span>
            <span className="text-indigo-400 drop-shadow-lg">Ludo</span>
          </div>
          <ul className="space-y-4">
            {[
              { name: "Play with Bots", icon: "🤖", path: "play-with-bots" },
              { name: "Play with Friends", icon: "🤝", path: "play-with-friends" },
              { name: "Create or Join Room", icon: "➕", path: "create-join-room" },
              { name: "Friends", icon: "👥", path: "friends" },
              { name: "History", icon: "📜", path: "history" },
              { name: "Profile", icon: "👤", path: "profile" },
            ].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? "bg-purple-600/30 border border-purple-400/40 text-white shadow-md shadow-purple-500/40"
                        : "hover:bg-gray-800 text-gray-300"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Children pages */}
        <div className="flex flex-grow items-center justify-center p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

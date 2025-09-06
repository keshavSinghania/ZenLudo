// Pawn.jsx

import React from 'react';

const Pawn = ({ color, children, onClick }) => {
  return (
    <div 
      className={`
        glowing-circle-pawn ${color}
      `}
      onClick={onClick}
    >
      <div 
        className="text-white text-lg font-bold z-10" 
        style={{ textShadow: "0 0 5px rgba(0,0,0,0.5)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Pawn;
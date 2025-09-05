import React from 'react';

const Pawn = ({ color, children }) => {
  return (
    <div 
      className={`
        glowing-circle-pawn ${color}
      `}
    >
      {/* This is the new part for the number */}
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
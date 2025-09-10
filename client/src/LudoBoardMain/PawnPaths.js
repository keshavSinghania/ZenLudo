// PawnPaths.js

// The global path for all pawns (52 squares)
export const GLOBAL_PATH = [
  // Red's Path (0 - 5)
  { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 5, col: 6 },
  // Green's Path (6 - 18)
  { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 }, { row: 1, col: 6 }, { row: 0, col: 6 }, { row: 0, col: 7 }, 
  { row: 0, col: 8 }, { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 }, 
  { row: 6, col: 9 },
  // Yellow's Path (19 - 31)
  { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 }, { row: 6, col: 14 },
  { row: 7, col: 14 }, { row: 8, col: 14 }, { row: 8, col: 13 }, { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 },
  // Blue's Path (32 - 44)
  { row: 9, col: 8 }, { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 },
  { row: 14, col: 8 }, { row: 14, col: 7 }, { row: 14, col: 6 }, { row: 13, col: 6 }, { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 },
  { row: 9, col: 6 },
  // Final loop (45 - 51)
  { row: 8, col: 5 }, { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 }, { row: 8, col: 1 }, { row: 8, col: 0 },
  { row: 7, col: 0 } // Last spot before red home path
];

// Special spots on the global path
export const SAFE_SPOTS = [
  { row: 6, col: 1 }, { row: 8, col: 1 }, // Red Safe Spots
  { row: 1, col: 6 }, { row: 1, col: 8 }, // Green Safe Spots
  { row: 6, col: 13 }, { row: 8, col: 13 }, // Yellow Safe Spots
  { row: 13, col: 6 }, { row: 13, col: 8 }, // Blue Safe Spots
  { row: 0, col: 7 }, { row: 7, col: 14 }, { row: 14, col: 7 }, { row: 7, col: 0 } // Corners
];

// Entry points for each player on the global path
export const ENTRY_POINT = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

// The home path for each player
export const HOME_PATHS = {
  red: [
    { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 },
    { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }
  ],
  green: [
    { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 },
    { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }
  ],
  yellow: [
    { row: 7, col: 13 }, { row: 7, col: 12 }, { row: 7, col: 11 },
    { row: 7, col: 10 }, { row: 7, col: 9 }, { row: 7, col: 8 }
  ],
  blue: [
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 },
    { row: 10, col: 7 }, { row: 9, col: 7 }, { row: 8, col: 7 }
  ],
};

// Pawn starting positions in home base
export const START_POSITIONS = {
  red: [{ row: 2, col: 2 }, { row: 2, col: 12 }, { row: 12, col: 2 }, { row: 12, col: 12 }],
  green: [{ row: 2, col: 2 } ,{ row: 2, col: 12 }, { row: 12, col: 2 }, { row: 12, col: 12 }],
  yellow: [{ row: 2, col: 2 }, { row: 2, col: 12 },{ row: 12, col: 2 },  { row: 12, col: 12 }],
  blue: [{ row: 2, col: 2 }, { row: 2, col: 12 }, { row: 12, col: 2}, { row: 12, col: 12 }],
};
// // Pawn starting positions in home base
// export const START_POSITIONS = {
//   red: [{ row: 2, col: 2 }, { row: 3, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 3 }],
//   green: [{ row: 2, col: 12 }, { row: 3, col: 12 }, { row: 2, col: 13 }, { row: 3, col: 13 }],
//   yellow: [{ row: 12, col: 12 }, { row: 13, col: 12 }, { row: 12, col: 13 }, { row: 13, col: 13 }],
//   blue: [{ row: 12, col: 2 }, { row: 13, col: 2 }, { row: 12, col: 3 }, { row: 13, col: 3 }],
// };
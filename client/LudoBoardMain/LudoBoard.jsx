import React, { useEffect, useState, useCallback } from "react";
import bgImage from "../src/assets/LudoBoard1.png";
import Pawn from "./Pawn";
import {
  GLOBAL_PATH,
  ENTRY_POINT,
  HOME_PATHS,
  SAFE_SPOTS,
  START_POSITIONS,
} from "./PawnPaths.js";
import { FaStar, FaArrowLeft, FaArrowRight, FaArrowDown, FaArrowUp } from "react-icons/fa";

function LudoBoardBackground() {
  // --- STATE MANAGEMENT ---
  const noOfPlayers = 2;
  const allPlayers = ["red", "green", "yellow", "blue"];
  const playersPlaying = allPlayers.slice(0, noOfPlayers);

  // Turn and dice state
  const [blockRolling, setBlockRolling] = useState(false);
  const [blockPawnMove, setBlockPawnMove] = useState(true);
  const [rolledValue, setRolledValue] = useState(0);
  const [whichColorRolledNow, setWhichColorRolledNow] = useState(playersPlaying[0]);
  const [playerRollCount, setPlayerRollCount] = useState(0);
  const [haveToRoll, setHaveToRoll] = useState(playersPlaying[0]);
  const [errMessage, setErrMessage] = useState("ZenLudo");
  const [diceValue, setDiceValue] = useState({
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0,
  });

  // Pawns positions
  const [allPawns, setAllPawns] = useState({
    red: { red1: -1, red2: -1, red3: -1, red4: -1 },
    green: { green1: -1, green2: -1, green3: -1, green4: -1 },
    yellow: { yellow1: -1, yellow2: -1, yellow3: -1, yellow4: -1 },
    blue: { blue1: -1, blue2: -1, blue3: -1, blue4: -1 },
  });

  // --- HELPER FUNCTIONS ---

  /**
   * Passes the turn to the next player in the sequence.
   */
  const passDiceToNextPlayer = () => {
    const nextPlayerIndex = (playerRollCount + 1) % noOfPlayers;
    setPlayerRollCount(nextPlayerIndex);
    setHaveToRoll(playersPlaying[nextPlayerIndex]);
    setBlockRolling(false);
    setBlockPawnMove(true);
    setRolledValue(0);
  };

  /**
   * Checks if a position is a safe spot.
   */
  const isSafeSpot = (pos) => {
    if (pos === -1 || pos === "end" || typeof pos !== "number") return false;
    const { row, col } = GLOBAL_PATH[pos];
    return SAFE_SPOTS.some((spot) => spot.row === row && spot.col === col);
  };

  /**
   * Determines if a given pawn can move with the current dice roll.
   */
  const canPawnMove = (pawnPosition, pawnColor, rolled) => {
    if (pawnPosition === -1) {
      return rolled === 6; // Only a 6 allows a pawn to enter the board
    }
    if (pawnPosition === "end") {
      return false;
    }
    if (typeof pawnPosition === "number") {
      const entryIndex = ENTRY_POINT[pawnColor];
      const stepsFromEntry = (pawnPosition - entryIndex + 52) % 52;
      const newSteps = stepsFromEntry + rolled;
      return newSteps <= 56;
    }
    if (typeof pawnPosition === "string" && pawnPosition.startsWith("h")) {
      const homeIndex = parseInt(pawnPosition.slice(1));
      return homeIndex + rolled <= 5; // Must not overshoot the end
    }
    return false;
  };

  /**
   * Handles the dice roll logic for a given pawn color.
   */
  const handleDiceRoll = useCallback(
    (pawnColor) => {
      setErrMessage("");
      setWhichColorRolledNow(pawnColor);

      if (blockRolling && haveToRoll === pawnColor) {
        setErrMessage("Move your pawn first.");
        return;
      }

      if (haveToRoll !== pawnColor) {
        setErrMessage(`It's ${haveToRoll}'s turn, not yours, ${pawnColor}.`);
        return;
      }

      const randomNum = Math.floor(Math.random() * 6) + 1;
      setRolledValue(randomNum);
      setDiceValue((prev) => ({
        ...prev,
        [pawnColor]: randomNum,
      }));
      setBlockPawnMove(false);
      setBlockRolling(true);

      // Check if any pawns can move
      const pawnsCanMove = Object.values(allPawns[pawnColor]).some((pos) =>
        canPawnMove(pos, pawnColor, randomNum)
      );

      if (!pawnsCanMove) {
        setErrMessage("No valid moves available. Passing turn.");
        passDiceToNextPlayer();
      } else if (randomNum === 6) {
        setBlockRolling(false); // Allow another roll for a 6
      }
    },
    [blockRolling, haveToRoll, allPawns, playerRollCount, playersPlaying]
  );

  /**
   * Handles the movement of a specific pawn and captures opponent pawns.
   */
  const handlePawnMovement = (pawnNumber, pawnColor) => {
    setErrMessage("");
    const pawnName = `${pawnColor}${pawnNumber}`;
    const currentPosition = allPawns[pawnColor][pawnName];

    if (blockPawnMove) {
      setErrMessage("Roll the dice first.");
      return;
    }

    if (whichColorRolledNow !== pawnColor) {
      setErrMessage(`${whichColorRolledNow} must move a pawn, not ${pawnColor}.`);
      return;
    }

    if (!canPawnMove(currentPosition, pawnColor, rolledValue)) {
      setErrMessage("This pawn cannot move with the current roll.");
      return;
    }

    let newPosition;
    const rolled = rolledValue;

    if (currentPosition === -1 && rolled === 6) {
      newPosition = ENTRY_POINT[pawnColor];
    } else if (typeof currentPosition === "number") {
      const entryIndex = ENTRY_POINT[pawnColor];
      const stepsTaken = (currentPosition - entryIndex + 52) % 52;
      const totalSteps = stepsTaken + rolled;

      if (totalSteps < 51) {
        newPosition = (entryIndex + totalSteps) % 52;
      } else if (totalSteps === 51) {
        newPosition = "h0";
      } else if (totalSteps <= 56) {
        newPosition = `h${totalSteps - 51}`;
      } else {
        setErrMessage("Move exceeds home path. Try another pawn.");
        return;
      }
    } else if (typeof currentPosition === "string" && currentPosition.startsWith("h")) {
      const homeIndex = parseInt(currentPosition.slice(1));
      const newHomeIndex = homeIndex + rolled;
      if (newHomeIndex <= 5) {
        newPosition = newHomeIndex === 5 ? "end" : `h${newHomeIndex}`;
      } else {
        setErrMessage("Move exceeds home path. Try another pawn.");
        return;
      }
    } else {
      setErrMessage("Invalid move for this pawn.");
      return;
    }

    // Prepare new state
    const newPawns = JSON.parse(JSON.stringify(allPawns)); // Deep copy
    newPawns[pawnColor][pawnName] = newPosition;

    // Capture opponent pawns on non-safe spots (excluding own pawns)
    let captured = false;
    if (typeof newPosition === "number" && !isSafeSpot(newPosition)) {
      playersPlaying.forEach((player) => {
        if (player !== pawnColor) { // Only capture opponent pawns
          Object.entries(newPawns[player]).forEach(([opponentPawnName, opponentPos]) => {
            if (opponentPos === newPosition) {
              newPawns[player][opponentPawnName] = -1;
              captured = true;
            }
          });
        }
      });
    }

    // Update state
    setAllPawns(newPawns);

    // Handle turn changes
    if (captured || rolled === 6) {
      setErrMessage(captured ? "Pawn captured! Roll again." : "Rolled a 6! Roll again.");
      setBlockRolling(false);
      setBlockPawnMove(true);
    } else {
      passDiceToNextPlayer();
    }
  };

  // Check for win condition
  useEffect(() => {
    playersPlaying.forEach((color) => {
      const hasWon = Object.values(allPawns[color]).every((pos) => pos === "end");
      if (hasWon) {
        setErrMessage(`Player ${color} has won the game!`);
        setBlockRolling(true);
        setBlockPawnMove(true);
      }
    });
  }, [allPawns, playersPlaying]);

  // Clear error message after 3 seconds
  useEffect(() => {
    if (errMessage) {
      const timer = setTimeout(() => setErrMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errMessage]);

  // Handle dice rolling using keys
  useEffect(() => {
    const keyMap = {
      "7": "red",
      "9": "green",
      "1": "blue",
      "3": "yellow",
    };

    const rollDiceAccordingToKey = (e) => {
      const color = keyMap[e.key];
      console.log(`Key pressed: ${e.key}, Color: ${color}, haveToRoll: ${haveToRoll}, blockRolling: ${blockRolling}`);
      if (color) {
        if (blockRolling && haveToRoll === color) {
          setErrMessage("Move your pawn first.");
        } else if (haveToRoll !== color) {
          setErrMessage(`It's ${haveToRoll}'s turn, not yours, ${color}.`);
        } else {
          handleDiceRoll(color);
        }
      }
    };

    window.addEventListener("keydown", rollDiceAccordingToKey);
    return () => window.removeEventListener("keydown", rollDiceAccordingToKey);
  }, [haveToRoll, blockRolling, handleDiceRoll]);

  // --- UI RENDERING LOGIC ---

  /**
   * Renders a pawn at the correct position with offset for overlaps.
   */
  const renderPawn = (pawnNumber, pawnColor) => {
    const pawnName = `${pawnColor}${pawnNumber}`;
    const pawnPosition = allPawns[pawnColor][pawnName];
    let top, left;

    if (pawnPosition === -1) {
      return null; // Pawns in home base are rendered by PawnHouse
    } else if (pawnPosition === "end") {
      top = 7;
      left = 7;
    } else if (typeof pawnPosition === "string" && pawnPosition.startsWith("h")) {
      const homeIndex = parseInt(pawnPosition.slice(1));
      const homePathCoords = HOME_PATHS[pawnColor][homeIndex];
      top = homePathCoords.row;
      left = homePathCoords.col;
    } else if (typeof pawnPosition === "number") {
      const globalPathCoords = GLOBAL_PATH[pawnPosition];
      top = globalPathCoords.row;
      left = globalPathCoords.col;
    } else {
      return null;
    }

    const totalRows = 15;
    const size = 100 / totalRows;
    const gapAdjustment = 0.5 / totalRows / 2;
    const pawnSize = size * 1.2;

    // Calculate offset for overlapping pawns
    const pawnsAtPosition = playersPlaying.flatMap((color) =>
      Object.entries(allPawns[color]).filter(([_, pos]) => pos === pawnPosition)
    );
    const index = pawnsAtPosition.findIndex(([name]) => name === pawnName);
    const offset = pawnsAtPosition.length > 1 ? {
      x: (index % 2 === 0 ? -0.2 : 0.2),
      y: (Math.floor(index / 2) % 2 === 0 ? -0.2 : 0.2)
    } : { x: 0, y: 0 };

    return (
      <div
        key={`${pawnColor}-${pawnNumber}`}
        className="absolute flex items-center justify-center cursor-pointer"
        style={{
          top: `${top * size + gapAdjustment - (pawnSize / 200)}%`,
          left: `${left * size + gapAdjustment - (pawnSize / 200)}%`,
          width: `${pawnSize}%`,
          height: `${pawnSize * 1.2}%`,
          transform: `translate(${offset.x}rem, ${offset.y}rem)`,
          zIndex: 10 + index,
        }}
        onClick={() => handlePawnMovement(pawnNumber, pawnColor)}
      >
        <Pawn color={pawnColor}>{pawnNumber}</Pawn>
      </div>
    );
  };

  /**
   * Reusable pawn house component for home base pawns.
   */
  const PawnHouse = ({ color, pawns, onPawnClick }) => {
    const pawnsInHouse = Object.entries(pawns).filter(
      ([_, position]) => position === -1
    );
    const totalRows = 15;
    const size = 100 / totalRows;
    const gapAdjustment = 0.5 / totalRows / 2;
    const pawnSize = size * 1.2;

    return (
      <div
        className={`w-4/5 h-4/5 bg-${color}-800/50 rounded-lg p-2 relative`}
      >
        {pawnsInHouse.map(([pawnName, _], index) => {
          const pawnNumber = parseInt(pawnName.slice(-1));
          const positions = START_POSITIONS[color]; // Get all positions for the color
          const posIndex = Math.min(index, positions.length - 1); // Ensure index doesn't exceed available positions
          const { row, col } = positions[posIndex];
          return (
            <div
              key={pawnName}
              className="absolute flex items-center justify-center"
              style={{
                top: `${row * size + gapAdjustment - (pawnSize / 200)}%`,
                left: `${col * size + gapAdjustment - (pawnSize / 200)}%`,
                width: `${pawnSize}%`,
                height: `${pawnSize * 1.2}%`,
                zIndex: 10 + index,
              }}
              onClick={() => onPawnClick(pawnNumber, color)}
            >
              <Pawn color={color}>{pawnNumber}</Pawn>
            </div>
          );
        })}
      </div>
    );
  };

  // Background glowing particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 8 + 4;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 3;
    return (
      <div
        key={`particle-${i}`}
        className="animate-float animate-color-shift absolute rounded-full bg-white/40"
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

  // --- UI RENDERING ---
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden p-4">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-10"></div>
      {particles}

      <div className="relative z-20 w-full max-w-[600px] aspect-square rounded-xl p-4 bg-gray-800/60 shadow-xl">
        <div className="grid grid-cols-15 grid-rows-15 w-full h-full gap-0.5">
          <div className="col-span-6 row-span-6 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="bg-red-700 w-[70%] h-[70%] rounded-lg flex items-center justify-center" >
              <PawnHouse color="red" pawns={allPawns.red} onPawnClick={handlePawnMovement} />
            </div>
          </div>
          <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6 gap-1">
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaArrowDown /></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaStar /></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-green-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
          </div>
          <div className="col-span-6 row-span-6 bg-green-600 rounded-lg flex items-center justify-center">
            <div className="bg-green-700 w-[70%] h-[70%] rounded-lg flex items-center justify-center">
              <PawnHouse color="green" pawns={allPawns.green} onPawnClick={handlePawnMovement} />
            </div>
          </div>
          <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3 gap-1">
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaArrowRight /></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-red-600 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaStar /></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
          </div>
          <div className="col-span-3 row-span-3 bg-red-600 grid grid-cols-2 grid-rows-2">
            <div className="bg-red-600"></div>
            <div className="bg-green-600"></div>
            <div className="bg-blue-600"></div>
            <div className="bg-yellow-600"></div>
          </div>
          <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3 gap-1">
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaStar /></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaArrowLeft /></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-yellow-600 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
          </div>
          <div className="col-span-6 row-span-6 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="bg-blue-700 w-[70%] h-[70%] rounded-lg flex items-center justify-center">
              <PawnHouse color="blue" pawns={allPawns.blue} onPawnClick={handlePawnMovement} />
            </div>
          </div>
          <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6 gap-1">
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaStar /></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-blue-700 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
            <div className="bg-white/20 flex items-center justify-center"><FaArrowUp /></div>
            <div className="bg-white/20 flex items-center justify-center"></div>
          </div>
          <div className="col-span-6 row-span-6 bg-yellow-600 rounded-lg flex items-center justify-center">
            <div className="bg-yellow-700 w-[70%] h-[70%] rounded-lg flex items-center justify-center">
              <PawnHouse color="yellow" pawns={allPawns.yellow} onPawnClick={handlePawnMovement} />
            </div>
          </div>
        </div>

        {playersPlaying.flatMap((color) =>
          Object.keys(allPawns[color]).map((pawnName, index) =>
            renderPawn(index + 1, color)
          )
        )}
      </div>

      {/* Error message */}
      <div className="absolute z-100 top-5 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-2 rounded shadow-lg">
        <h2 className="text-red-500 text-lg font-bold text-center">{errMessage}</h2>
      </div>

      {/* Dices */}
      <div className="dice-group">
        <div
          onClick={() => haveToRoll === "red" && handleDiceRoll("red")}
          className={`dice-container absolute top-18 left-20 md:left-30 lg:left-40 transition-all duration-300 cursor-pointer
    ${haveToRoll === "red" ? "bg-red-500 shadow-lg animate-pulse border-2 border-red-900" : "bg-red-400"} hover:shadow-neon-red-hover`}
        >
          <div className="dice-dots" data-value={diceValue?.red}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div
          onClick={() => haveToRoll === "green" && handleDiceRoll("green")}
          className={`dice-container absolute top-18 right-20 md:right-30 lg:right-40 transition-all duration-300 cursor-pointer
    ${haveToRoll === "green" ? "bg-green-500 shadow-lg animate-pulse border-2 border-green-900" : "bg-green-400"} hover:shadow-neon-green-hover`}
        >
          <div className="dice-dots" data-value={diceValue?.green}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div
          onClick={() => haveToRoll === "blue" && handleDiceRoll("blue")}
          className={`dice-container absolute bottom-18 left-20 md:left-30 lg:left-40 transition-all duration-300 cursor-pointer
    ${haveToRoll === "blue" ? "bg-blue-500 shadow-lg animate-pulse border-2 border-blue-900" : "bg-blue-400"} hover:shadow-neon-blue-hover`}
        >
          <div className="dice-dots" data-value={diceValue?.blue}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div
          onClick={() => haveToRoll === "yellow" && handleDiceRoll("yellow")}
          className={`dice-container absolute bottom-18 right-20 md:right-30 lg:right-40 transition-all duration-300 cursor-pointer
    ${haveToRoll === "yellow" ? "bg-yellow-500 shadow-lg animate-pulse border-2 border-yellow-900" : "bg-yellow-400"} hover:shadow-neon-yellow-hover`}
        >
          <div className="dice-dots" data-value={diceValue?.yellow}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LudoBoardBackground;
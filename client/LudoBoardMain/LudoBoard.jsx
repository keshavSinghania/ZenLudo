import React, { useState } from "react";
import bgImage from "../src/assets/LudoBoard1.png";
import Pawn from "./Pawn";

function LudoBoardBackground() {
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

  //LOGIC TO HANDLE DICE ROLLING STARTS HERE........................

  let noOfPlayers = 4;
  const [errMessage, setErrMessage] = useState("");
  const [numOfPlayers, setNumOfPlayers] = useState(noOfPlayers);
  //array of all the possible players
  const allPlayers = ["red", "green", "yellow", "blue"];
  //array of all the color players who is playing current game
  const playersPlaying = [];

  //storing all the players playing current game
  for (let i = 0; i < numOfPlayers; i++) {
    playersPlaying.push(allPlayers[i]);
  }

  //player roll count [this roll count would incremeent by one evertime new player roll dice (note new player) if same player rolls again due to 6 , it would not increment];
  //will use this count to determine which player would roll dice next..
  //formula to determine which player will going to roll((count % noOfPlayers)+1)
  const [playerRollCount, setPlayerRollCount] = useState(0);


  //haveToRoll this constant will contains the name of the color of the player who is eligble to roll dice for now
  const [haveToRoll, setHaveToRoll] = useState(playersPlaying[0]);

  //this funciton will findout whom to roll dice next ((count % noOfPlayers)+1)
  const passDiceToNextPlayer = () => {
    const nextPlayerIndex = (playerRollCount + 1) % numOfPlayers;
    setPlayerRollCount(nextPlayerIndex);
    setHaveToRoll(playersPlaying[nextPlayerIndex]);
  }
  //logic to prevent rolling dice whenever user want 
  const [diceValue, setDiceValue] = useState({
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0,
  });

  ///button to handle roll 
  const rolled = (pawnColor, pawnNumber) => {
    setErrMessage("");
    //checking correct player is rolling dice or not
    if (haveToRoll !== pawnColor) {
      setErrMessage(`It's ${haveToRoll} turn not yours ${pawnColor} pookie..`);
      return;
    }

    //first generate random number btw 1 to 6
    let randomNum = Math.floor(Math.random() * 6) + 1;

    //updating randomNum on screen
    setDiceValue((prev) => ({
      ...prev,
      [pawnColor]: randomNum,
    }));

    //increasing movement count of pawn
    pawnMovementCountHandler(randomNum,pawnNumber,pawnColor)

    //giving chance to next player if value is not equal to 6
    if (randomNum == 6) {
      return;
    } else {
      passDiceToNextPlayer();
    }
  }
  //LOGIC TO HANDLE DICE ROLLING ENDS HERE........................

  // LOGIC TO HANDLE PAWN MOVEMENT STARTS HERE........................

  //red pawns movement tracking
  const [redPawn, setRedPawn] = useState(
    {
      red1: -1,
      red2: -1,
      red3: -1,
      red4: -1,
    }
  )
  //green pawns movement tracking
  const [greenPawn, setGreenPawn] = useState(
    {
      green1: -1,
      green2: -1,
      green3: -1,
      green4: -1,
    }
  )
  //yellow pawns movement tracking
  const [yellowPawn, setYellowPawn] = useState(
    {
      yellow1: -1,
      yellow2: -1,
      yellow3: -1,
      yellow4: -1,
    }
  )
  //blue pawns movement tracking
  const [bluePawn, setBluePawn] = useState(
    {
      blue1: -1,
      blue2: -1,
      blue3: -1,
      blue4: -1,
    }
  )

  //handle red pawn movement count
const pawnMovementCountHandler = (count, pawnNumber, pawnColor) => {
  const pawnName = `${pawnColor}${pawnNumber}`;
  
  let updatedState;
  switch(pawnColor) {
    case "red":
      const redOldPosition = redPawn[pawnName];
      const redNewPosition = redOldPosition + count;
      updatedState = { ...redPawn, [pawnName]: redNewPosition };
      setRedPawn(updatedState);
      break;
    case "green":
      const greenOldPosition = greenPawn[pawnName];
      const greenNewPosition = greenOldPosition + count;
      updatedState = { ...greenPawn, [pawnName]: greenNewPosition };
      setGreenPawn(updatedState);
      break;
    case "yellow":
      const yellowOldPosition = yellowPawn[pawnName];
      const yellowNewPosition = yellowOldPosition + count;
      updatedState = { ...yellowPawn, [pawnName]: yellowNewPosition };
      setYellowPawn(updatedState);
      break;
    case "blue":
      const blueOldPosition = bluePawn[pawnName];
      const blueNewPosition = blueOldPosition + count;
      updatedState = { ...bluePawn, [pawnName]: blueNewPosition };
      setBluePawn(updatedState);
      break;
  }
};

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden p-4">
      {/* Background board image */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 opacity-60 z-10"></div>

      {/* Floating particles */}
      {particles}

      {/* Error message displaying */}
      <div className="absolute z-200 top-5">
        <h2 className="text-red-600">{errMessage}</h2>
      </div>
      {/* Main Board*/}
      <div className="relative z-20 w-full max-w-[600px] aspect-square rounded-xl p-4 bg-gray-800/60 shadow-xl">
        <div className="grid grid-cols-15 grid-rows-15 w-full h-full gap-0.5">
          {/* Top Red) */}
          <div className="col-span-6 row-span-6 bg-red-600 rounded-lg flex items-center justify-center">
            {/* red goti ka ghar */}
            <div className="w-4/5 h-4/5 bg-red-800/50 rounded-lg p-2 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-red-400 rounded-full flex items-center justify-center "><Pawn color={"red"}>{redPawn.red1}</Pawn></div>
              <div className="bg-red-400 rounded-full flex items-center justify-center "><Pawn color={"red"}>{redPawn.red2}</Pawn></div>
              <div className="bg-red-400 rounded-full flex items-center justify-center "><Pawn color={"red"}>{redPawn.red3}</Pawn></div>
              <div className="bg-red-400 rounded-full flex items-center justify-center "><Pawn color={"red"}>{redPawn.red4}</Pawn></div>
            </div>
          </div>

          {/* Top Path */}
          <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6 gap-1">
            {/* Path squares */}
            <div className="bg-white/20">R12</div>
            <div className="bg-white/20">R13</div>
            <div className="bg-white/20">R14</div>
            <div className="bg-white/20">R11</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R15</div>
            <div className="bg-white/20">R10</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R16</div>
            <div className="bg-white/20">R9</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R17</div>
            <div className="bg-white/20">R8</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R18</div>
            <div className="bg-white/20">R7</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R19</div>
          </div>

          {/* Top Green) */}
          <div className="col-span-6 row-span-6 bg-green-600 rounded-lg flex items-center justify-center">
            {/* Green goti ka ghar */}
            <div className="w-4/5 h-4/5 bg-green-800/50 rounded-lg p-2 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-green-400 flex items-center justify-center rounded-full"><Pawn color={"green"}>{greenPawn.green1}</Pawn></div>
              <div className="bg-green-400 flex items-center justify-center rounded-full"><Pawn color={"green"}>{greenPawn.green2}</Pawn></div>
              <div className="bg-green-400 flex items-center justify-center rounded-full"><Pawn color={"green"}>{greenPawn.green3}</Pawn></div>
              <div className="bg-green-400 flex items-center justify-center rounded-full"><Pawn color={"green"}>{greenPawn.green4}</Pawn></div>
            </div>
          </div>

          {/* Left Path */}
          <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3 gap-1">
            {/* Path squares */}
            <div className="bg-white/20">R1</div>
            <div className="bg-white/20">R2</div>
            <div className="bg-white/20">R3</div>
            <div className="bg-white/20">R4</div>
            <div className="bg-white/20">R5</div>
            <div className="bg-white/20">R6</div>
            <div className="bg-white/20">R52 </div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R51</div>
            <div className="bg-white/20">R50</div>
            <div className="bg-white/20">R49</div>
            <div className="bg-white/20">R48</div>
            <div className="bg-white/20">R47</div>
            <div className="bg-white/20">R46</div>
          </div>

          {/* Home center h bhaiiii */}
          <div className="col-span-3 row-span-3 bg-red-600 grid grid-cols-2 grid-rows-2">
            <div className="bg-red-600"></div>
            <div className="bg-blue-600"></div>
            <div className="bg-green-600"></div>
            <div className="bg-yellow-600"></div>
          </div>

          {/* Right Path */}
          <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3 gap-1">
            {/* Path squares */}
            <div className="bg-white/20">R20</div>
            <div className="bg-white/20">R21</div>
            <div className="bg-white/20">R22</div>
            <div className="bg-white/20">R23</div>
            <div className="bg-white/20">R24</div>
            <div className="bg-white/20">R25</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R26</div>
            <div className="bg-white/20">R32</div>
            <div className="bg-white/20">R31</div>
            <div className="bg-white/20">R30</div>
            <div className="bg-white/20">R29</div>
            <div className="bg-white/20">R28</div>
            <div className="bg-white/20">R27</div>
          </div>

          {/* Bottom blue (neela) */}
          <div className="col-span-6 row-span-6 bg-blue-600 rounded-lg flex items-center justify-center">
            {/* Blue goti ka ghar*/}
            <div className="w-4/5 h-4/5 bg-blue-800/50 rounded-lg p-2 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-blue-400 rounded-full flex items-center justify-center"><Pawn color={"blue"}>{bluePawn.blue1}</Pawn></div>
              <div className="bg-blue-400 rounded-full flex items-center justify-center"><Pawn color={"blue"}>{bluePawn.blue2}</Pawn></div>
              <div className="bg-blue-400 rounded-full flex items-center justify-center"><Pawn color={"blue"}>{bluePawn.blue3}</Pawn></div>
              <div className="bg-blue-400 rounded-full flex items-center justify-center"><Pawn color={"blue"}>{bluePawn.blue4}</Pawn></div>
            </div>
          </div>

          {/* Bottom Path */}
          <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6 gap-1">
            {/* Path squares */}
            <div className="bg-white/20">R45</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R33</div>
            <div className="bg-white/20">R44</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R34</div>
            <div className="bg-white/20">R43</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R35</div>
            <div className="bg-white/20">R42</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R36</div>
            <div className="bg-white/20">R41</div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20">R37</div>
            <div className="bg-white/20">R40</div>
            <div className="bg-white/20">R39</div>
            <div className="bg-white/20">R38</div>
          </div>

          {/* Buttom(yellow) peeela */}
          <div className="col-span-6 row-span-6 bg-yellow-600 rounded-lg flex items-center justify-center">
            {/* pelli goti ka ghar */}
            <div className="w-4/5 h-4/5 bg-yellow-800/50 rounded-lg p-2 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-yellow-400 rounded-full flex items-center justify-center"><Pawn color={"yellow"}>{yellowPawn.yellow1}</Pawn></div>
              <div className="bg-yellow-400 rounded-full flex items-center justify-center"><Pawn color={"yellow"}>{yellowPawn.yellow2}</Pawn></div>
              <div className="bg-yellow-400 rounded-full flex items-center justify-center"><Pawn color={"yellow"}>{yellowPawn.yellow3}</Pawn></div>
              <div className="bg-yellow-400 rounded-full flex items-center justify-center"><Pawn color={"yellow"}>{yellowPawn.yellow4}</Pawn></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dices */}
      <div onClick={() => rolled("red")} className="absolute bg-red-400 w-[85px] h-[85px] z-20 rounded top-18 left-20 md:left-30 lg:w-[100px] lg:h-[100px] lg:left-40 text-5xl text-center flex items-center justify-center">{diceValue?.red}</div>
      <div onClick={() => rolled("green")} className="absolute bg-green-400 w-[85px] h-[85px] z-20 rounded top-18 right-20 md:right-30 lg:w-[100px] lg:h-[100px] lg:right-40 text-5xl text-center flex items-center justify-center">{diceValue?.green}</div>
      <div onClick={() => rolled("blue")} className="absolute bg-blue-400 w-[85px] h-[85px] z-20 rounded bottom-18 left-20 md:left-30 lg:w-[100px] lg:h-[100px] lg:left-40 text-5xl text-center flex items-center justify-center">{diceValue?.blue}</div>
      <div onClick={() => rolled("yellow")} className="absolute bg-yellow-400 w-[85px] h-[85px] z-20 rounded bottom-18 right-20 md:right-30 lg:w-[100px] lg:h-[100px] lg:right-40 text-5xl text-center flex items-center justify-center">{diceValue?.yellow}</div>
    </div>
  );
}

export default LudoBoardBackground;
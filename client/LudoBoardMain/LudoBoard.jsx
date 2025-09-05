import React from "react";
import bgImage from "../src/assets/LudoBoard1.png";

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

      {/* Main Board*/}
      <div className="relative z-20 w-full max-w-[600px] aspect-square rounded-xl p-4 bg-gray-800/60 shadow-xl">
        <div className="grid grid-cols-15 grid-rows-15 w-full h-full gap-0.5">
          {/* Top Red) */}
          <div className="col-span-6 row-span-6 bg-red-600 rounded-lg flex items-center justify-center">
            {/* red goti ka ghar */}
            <div className="w-4/5 h-4/5 bg-red-800/50 rounded-lg p-2 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-red-400 rounded-full"></div>
              <div className="bg-red-400 rounded-full"></div>
              <div className="bg-red-400 rounded-full"></div>
              <div className="bg-red-400 rounded-full"></div>
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
              <div className="bg-green-400 rounded-full"></div>
              <div className="bg-green-400 rounded-full"></div>
              <div className="bg-green-400 rounded-full"></div>
              <div className="bg-green-400 rounded-full"></div>
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
              <div className="bg-blue-400 rounded-full"></div>
              <div className="bg-blue-400 rounded-full"></div>
              <div className="bg-blue-400 rounded-full"></div>
              <div className="bg-blue-400 rounded-full"></div>
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
              <div className="bg-yellow-400 rounded-full"></div>
              <div className="bg-yellow-400 rounded-full"></div>
              <div className="bg-yellow-400 rounded-full"></div>
              <div className="bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LudoBoardBackground;
# 🎲 ZenLudo

ZenLudo is a **feature-rich multiplayer Ludo game** designed for both casual and competitive players. With a focus on **social connectivity, fair gameplay, and customization**, ZenLudo delivers a seamless experience across devices.  

---

## 🚀 Key Features

### 🔑 1. User Account & Profile
- **Quick Google Sign-Up:** Instantly create an account using your Google profile. Your name, email, and profile picture sync automatically.  
- **Email Registration with OTP:** Secure sign-up with email verification powered by Nodemailer.  
- **Multiple Login Options:** Choose between Google or email/password login.  
- **Profile Customization:** Upload custom profile pictures and update your display name once per month.  
- **Easy Account Recovery:** Reset passwords quickly for email-based accounts.  

---

### 👥 2. Friends & Social
- **Unique Friend IDs:** Each player gets a unique ID for easy friend search, even with duplicate usernames.  
- **Friend Requests & Notifications:** Requests appear as pop-ups when users log in.  
- **Friend Limit:** Add up to **100 friends**.  
- **Safe Friend Removal:** Confirmation required before removing friends.  
- **Real-Time Status:** Track friends’ online/offline status and last seen times.  
- **Invite Controls:** Invite friends every 30 seconds or freeze invites for 10 minutes.  

---

### 🎮 3. Game Modes
- **Login Required:** All players must log in to play.  
- **Local Multiplayer:** Play with **2–6 players** on one device.  
- **Bot Matches:** Three difficulty levels:
  - *Easy:* Occasionally skips cutting tokens.  
  - *Medium:* Balanced AI.  
  - *Hard:* Near-perfect strategic play.  
- **Room Creation & Management:**  
  - Create up to **3 rooms per day** with unique ID, password, and group name.  
  - Shareable invite links (password required).  
  - Invite friends directly without password entry.  
  - Admin controls: Kick players (5-min cooldown), assign colors, and apply themes.  
- **Spectator Mode:** Watch games after being eliminated.  
- **Timer Option:** Enable per-move timers for faster gameplay.  

---

### ⚔️ 4. Gameplay & History
- **Cheating Prevention:** All moves validated server-side for fairness.  
- **AFK Handling:**  
  - After 30s of inactivity, dice auto-rolls.  
  - After 3 auto-rolls, player is marked *dead*; tokens remain still.  
- **Game History:** View the last **3 game results**.  
- **Performance Stats:**  
  - Track total first-place wins by mode.  
  - Detailed analytics: Win/loss ratio, dice roll trends, and streaks.  
- **Auto Room Close:** Inactive rooms close automatically.  

---

### 💬 5. Chat & Communication
- **Friend Chat:** Message online friends outside of matches.  
- **In-Room Chat:** Chat, send emojis, and voice chat during gameplay.  
- **Voice Options:**  
  - Push-to-talk or open mic.  
  - Mute specific players or all except yourself.  
- **Moderation:** Offensive language triggers a **30-min chat/voice ban**.  
- **Temporary Logs:** Room chats are session-based only.  

---

### 🎨 6. Visual & Fun Enhancements
- **Animated Dice:** Immersive dice-rolling animations.  
- **Custom Skins:** Unlockable board themes and dice designs visible to all.  
- **Room Personalization:** Room creators can showcase their themes and dice.  

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Real-time Communication:** Socket.io  
- **Authentication & Security:** JWT, Google OAuth, Nodemailer (OTP)  
- **Deployment:** Docker-ready  

---

## 📦 Project Setup
```bash
# Clone the repository
git clone https://github.com/your-username/ZenLudo.git

# Navigate to project directory
cd ZenLudo

# Install dependencies (backend)
cd server
npm install

# Install dependencies (frontend)
cd ../client
npm install

# Create .env files for client and server
touch .env

# Run development servers
npm run dev

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    authToken: "",
    name: "",
    username: "",
    profilePic: "",
    gamesPlayed: "",
    gamesWon: "",
    firstPlaceWins: "",
    recentGames: "",
    friendIds: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.authToken = action.payload?.authToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.authToken = "";
      state._id = '';
      state.name ='';
      state.username = '';
      state.profilePic ='';
      state.gamesPlayed = '';
      state.gamesWon = '';
      state.firstPlaceWins = '';
      state.recentGames = '';
      state.friendIds = [];
    },
    updateProfileData: (state,action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.username = action.payload?.username;
      state.profilePic = action.payload?.profilePic;
      state.gamesPlayed = action.payload?.gamesPlayed;
      state.gamesWon = action.payload?.gamesWon;
      state.firstPlaceWins = action.payload?.firstPlaceWins;
      state.recentGames = action.payload?.recentGames;
      state.friendIds = action.payload?.friendIds;
    },
  },
});

export const { login, logout , updateProfileData} = authSlice.actions;
export default authSlice.reducer;

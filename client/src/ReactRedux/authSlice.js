import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    authToken: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.authToken = action.payload?.authToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.authToken = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

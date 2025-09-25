import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    onlineFriends : [],
  },
  reducers: {
    updateOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },

    addOnlineFriend : (state , action) => {
        if(!state.onlineFriends.includes(action.payload)){
            state.onlineFriends.push(action.payload);
        }
    },

    removeOnlineFriend: (state, action) => {
        state.onlineFriends = state.onlineFriends.filter(
            (id) => id !== action.payload
        );
    }
  },
});

export const { updateOnlineFriends, addOnlineFriend, removeOnlineFriend} = socketSlice.actions;
export default socketSlice.reducer;

import {configureStore} from "@reduxjs/toolkit"
import  authSlice  from "./authSlice.js"
import socketSlice from "./socketSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        socket : socketSlice
    }
}) 
export default store;
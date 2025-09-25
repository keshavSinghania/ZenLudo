import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { addOnlineFriend, removeOnlineFriend, updateOnlineFriends } from "../ReactRedux/socketSlice";

export const initSocket = (userId,  dispatch) => {
  const socket = io(import.meta.env.VITE_BACKEND_URI);

  //Runs when socket connects
  socket.on("connect", () => {
    console.log("Connected!", socket.id);

    //saying who am i
    socket.emit("join", userId);
  });

  // runs only once after connecting → full list of online friends
  socket.on("updateOnlineFriends", (onlineFriends) => {
    dispatch(updateOnlineFriends(onlineFriends));
  });

//   Runs whenever one friend comes online
  socket.on("friendCameOnline", (friendId) => {
    dispatch(addOnlineFriend(friendId));
  });

  // Runs whenever one friend goes offline
  socket.on("friendWentOffline", (friendId) => {
    dispatch(removeOnlineFriend(friendId));
  });

  // Runs when (I) disconnect
  socket.on("disconnect", (reason) => {
    console.log("Disconnected from frontend", reason);
  });

  return socket;
};

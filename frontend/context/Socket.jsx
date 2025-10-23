import { createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { clearLocalStorage, getData } from "../hooks/localstorage";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

  const WS = useRef(null);
  const groupId = 'My_group_id'
  useEffect(() => {

    clearLocalStorage()
    // console.log('clear local storage')
    WS.current = io("https://group-chat-backend-rwca.onrender.com");

    WS.current.on('connect' , ()=>{
      console.log('i am running')
      const userData = getData('userData')
      
      if(!userData) return 
      console.log('i am running for joining group')
      WS.current.emit('join-group' , { groupId , username : userData.name})
    })


     // Cleanup function: Closes the socket connection
  return () => {
    console.log('Cleaning up socket connection...');
    WS.current.disconnect();

    // Optional: Also remove specific listeners to prevent memory leaks, though disconnect() should handle this
    WS.current.off('connect');
    WS.current.off('disconnect');
  };

  }, []);


  return <SocketContext.Provider value={{WS , groupId}}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

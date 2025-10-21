import { useContext, useEffect, useState } from "react";
import Message from "../../components/message/Message";
import "./ChatRoom.css";
import { SocketContext } from "../../../context/Socket";
import { getData, setData } from "../../../hooks/localstorage";
import { v4 as uuidv4 } from "uuid"

const ChatRoom = () => {
  const { groupId, WS: WSRef } = useContext(SocketContext);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const userdata = getData("userData");
  const pastMessages = getData('messages') || []

  const socket = WSRef.current;

  useEffect(() => {
    if (!socket) return;
 
    socket.on("message", (messageData) => {
      //  if (userdata._id == messageData._id) return
      const messageInLocalStorage = getData("messages") ?? []
      setMessages([...messageInLocalStorage , messageData]);
      setData({ key: "messages", data: [...messageInLocalStorage , messageData] });
      // console.log(messages);
    });
  }, [socket]);

  function sendMessage() {
    const socket = WSRef.current;

    const newMessage = {
      groupId,
      _id : uuidv4() ,
      sender_id: userdata._id,
      name: userdata.name,
      profilePicUrl: userdata.profilePicUrl,
      sender: false,
      message: msg,
    };


    setData({ key: "messages", data: [...messages, newMessage] });
    setMessages([...messages, newMessage]);
    if (socket) {
      socket.emit("message", { ...newMessage, sender: true });
    }
    setMsg("");
  }
  
  //  MESSAGES

  function chats(messages){
    if(!messages.length){
      return (
          <div style={{ color: "#d5d5d5", textAlign: "center" }}>
            No messages
          </div>
        )} 

      return ( messages.map((message) => 
              <Message
                key={message._id}
                name={message.name}
                profilePicUrl={message.profilePicUrl}
                sender={message.sender}
                message={message.message}
              />
           ))
  }

  return (
    <div className="container">
      {/* HEADER */}
      <header>
        <div className="user-profile-pic"></div>
        <div className="grp-details">
          <div className="grp-name"> Random group chat</div>
          <div className="activity">Some is typing</div>
        </div>
      </header>
      {/* CHATS */}
      <div className="message-container">
        {messages.length ? chats(messages) : chats(pastMessages)}
      </div>
      {/* FOOTER */}
      <footer>
        <input
          type="text"
          name="message"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="Say something..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatRoom;

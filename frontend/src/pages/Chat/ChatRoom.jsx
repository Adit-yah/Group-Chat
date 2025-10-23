import { useContext, useEffect, useState } from "react";
import Message from "../../components/message/Message";
import "./ChatRoom.css";
import { SocketContext } from "../../../context/Socket";
import { getData, setData } from "../../../hooks/localstorage";
import { v4 as uuidv4 } from "uuid";
import { useAutoScroll } from "../../../hooks/useAutoScroll";

const ChatRoom = () => {
  const { groupId, WS: WSRef } = useContext(SocketContext);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);
  const [newComers, setNewComers] = useState([])
  const userdata = getData("userData");
  const pastMessages = getData("messages") || [];

  //AUTOMATIC SCROLL
  const messageContainerRef = useAutoScroll(messages);

  //SOCKET IO
  const socket = WSRef.current;

  // SOCKET EVENTS AND EVENT LISTENERS
  useEffect(() => {
    if (!socket) return;

    //SOCKET EVENT LISTENERS
    function socketOnMessage(messageData) {
      const messageInLocalStorage = getData("messages") ?? [];
      setMessages([...messageInLocalStorage, messageData]);
      setData({
        key: "messages",
        data: [...messageInLocalStorage, messageData],
      });
    }
    function socketOnTyping(username) {
      setTypers((prev) => {
        if (!prev.includes(username)) {
          return [...prev, username];
        }
        return prev;
      });
      console.log(typers, username + " is typing");
    }
    function socketOnStopTyping(username) {
      setTypers((prev) => {
        return prev.filter((p) => p !== username);
      });
      console.log(username + " is stop typing");
    }

    //SOCKET EVENTS
    socket.on("message", socketOnMessage);
    socket.on("typing", socketOnTyping);
    socket.on("stopTyping", socketOnStopTyping);
    // socket.on('notify' , socketOnNotify)

    // CLEANER FUNCTION
    return () => {
      socket.off("message", socketOnMessage);
      socket.off("typing", socketOnTyping);
      socket.off("stopTyping", socketOnStopTyping);
    };
  }, [socket]);

  //EVENT EMITTING
  //1. HANDLING TYPING NOTIFICATION
  useEffect(() => {
    if (!socket) return;
    const timer = setTimeout(() => {
      socket.emit("stopTyping", { groupId, username: userdata.name });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, socket]);

  // HANDLING SENDING MESSAGES
  function sendMessage() {
    const socket = WSRef.current;
    const time = new Date()
    const formatTime = time.toLocaleTimeString('en-US', { hour : '2-digit' , minute : '2-digit'})
    const newMessage = {
      groupId,
      _id: uuidv4(),
      sender_id: userdata._id,
      name: userdata.name,
      profilePicUrl: userdata.profilePicUrl,
      sender: false,
      message: msg,
      time: formatTime
    };

    setData({ key: "messages", data: [...messages, newMessage] });
    setMessages([...messages, newMessage]);
    if (socket) {
      socket.emit("message", { ...newMessage, sender: true });
    }
    setMsg("");
  }

  // HANDLING MESSAGE WHEN USER CLICK ENTER 
  function handleButtonKeyDown(e){
    if(!msg.length) return
    if(e.key === 'Enter' && !e.shiftKey){
      sendMessage()
    }
  }

  //RENDERING MESSAGES
  function chats(messages) {
    if (!messages.length) {
      return (
        <div style={{ color: "#d5d5d5", textAlign: "center" }}>No messages</div>
      );
    }

    return messages.map((message) => (
      <Message
        key={message._id}
        name={message.name}
        profilePicUrl={message.profilePicUrl}
        sender={message.sender}
        message={message.message}
        time={message.time}
      />
    ));
  }

  return (
    <div className="container">
      {/* HEADER */}
      <header>
        
        <div className="user-profile-pic"></div>
        <div className="grp-details">
          <div className="grp-name"> Random group chat</div>
          <div className="activity"> {typers.length ? typers.join(', ') + ' is typing...' : ''}</div>
        </div>
      </header>
      {/* CHATS */}
      <div ref={messageContainerRef} className="message-container">
        {messages.length ? chats(messages) : chats(pastMessages)}
      </div>
      {/* FOOTER */}
      <footer>
        <input
          type="text"
          name="message"
          value={msg}
          onKeyDown={handleButtonKeyDown}
          onChange={(e) => {
            setMsg(e.target.value);
            socket && socket.emit("typing", { groupId, username: userdata.name });
          }}
          placeholder="Say something..."
        />
        <button disabled={!msg.length}  onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatRoom;

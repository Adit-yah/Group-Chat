import Message from "../../components/message/Message";
import "./ChatRoom.css";

const ChatRoom = () => {
 const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi rem distinctio unde voluptatum cupiditate officiis, quod, dolor quaerat expedita architecto nam sit neque, eum temporibus velit! Officiis alias illum eos?"
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
      <Message sender={true} message={message}/>
      <Message sender={false} message={message}/>
      </div>
      {/* FOOTER */}
      <footer>
        <input type="text" name="message" placeholder="Say something..." />
        <button>Send</button>
      </footer>
    </div>
  );
};

export default ChatRoom;

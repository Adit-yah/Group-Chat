import "./Message.css";

const Message = ({ profilePicUrl , sender , message , name}) => {
    
  return (
    <div 
    className="message"
    style={{flexDirection : sender ? 'row' : "row-reverse"}}
    >
      <div className="left-part">
        <img src={profilePicUrl} />
        <div className="time">HH : HH</div>
      </div>
      <div className='right-part'>
        <h1 style={{ alignSelf : sender ? 'start' : 'end'}}>{name}</h1>
        <p className={`message ${sender ? 'sender-message' : 'receiver-message'}`}>{message}</p>
        </div>
    </div>
  );
};

export default Message;

import "./Message.css";

const Message = ({sender , message}) => {
    
  return (
    <div 
    className="message"
    style={{flexDirection : sender ? 'row' : "row-reverse"}}
    >
      <div className="left-part">
        <img src="" />
        <div className="time">HH : HH</div>
      </div>
      <div className={`right-part ${sender ? 'sender-message' : 'receiver-message'}`}>{message}</div>
    </div>
  );
};

export default Message;

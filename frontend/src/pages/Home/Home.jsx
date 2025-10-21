import "./Home.css";
import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {  setData } from "../../../hooks/localstorage";
import {  SocketContext } from "../../../context/Socket";
import { v4 as uuidv4} from 'uuid'


const Home = () => {

  const [name, setName] = useState('')
  const [profilePicUrl, setProfilePicUrl] = useState('')
  const navigate = useNavigate()  

  const { groupId , WS : WSRef} = useContext(SocketContext)
  
  
  
  function formHandler(e){
    e.preventDefault()
    setData({
      'key' : 'userData' ,
      'data' : { _id : uuidv4() ,  name , profilePicUrl }
    })
    navigate('/chat')
    setName('')
    setProfilePicUrl('')  

    if(WSRef.current){
      WSRef.current.emit('join-group' , { groupId , username : name})
    }
  }


  return (

    <div className="home-container">
      {/* CONTAINER */}
      <div className="bg-image">
        {/* HEADING */}
        <h1 className="heading">RANDOM GROUP CHAT</h1>

        {/* FORM */}
        <form className="form" onSubmit={formHandler}>
          
          <div className="name-input">
            <label>Name</label>
            <input type="text" required name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>

          <div className="profilePicUrl-input">
            <label>Profile url</label>
            <input type="text" required name="profile-pic" value={profilePicUrl} onChange={(e)=>setProfilePicUrl(e.target.value)} />
          </div>

          <button type="submit">Join Now</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

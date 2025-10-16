import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* CONTAINER */}
      <div className="bg-image">
        {/* HEADING */}
        <h1 className="heading">RANDOM GROUP CHAT</h1>

        {/* FORM */}
        <form className="form">
          
          <div className="name-input">
            <label>Name</label>
            <input type="text" name="name" />
          </div>

          <div className="profilePicUrl-input">
            <label>Profile url</label>
            <input type="text" name="profile-pic" />
          </div>

          <button type="submit">Join Now</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

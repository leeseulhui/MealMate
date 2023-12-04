import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import BottomTabNav from "../BottomTabNav";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleCameraClick = () => {
    console.log('Camera icon clicked');
  };

  const handleAddClick = () => {
    navigate('/add-friend');
  };

  const handleMoreClick = () => {
    console.log('More icon clicked');
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img
            src={Cam}
            alt=""
            onClick={handleCameraClick}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={Add}
            alt=""
            onClick={handleAddClick}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={More}
            alt=""
            onClick={handleMoreClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <Messages />
      <div className="input-wrapper">
        <Input />
      </div>
    </div>
  );
};

export default Chat;

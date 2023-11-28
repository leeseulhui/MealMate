import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      try {
        const chatCollection = collection(db, "userChats", currentUser.uid);
        const unsub = onSnapshot(chatCollection, (snapshot) => {
          const chatData = {};
          snapshot.forEach((doc) => {
            chatData[doc.id] = doc.data();
          });
          setChats(chatData);
        });

        return () => {
          unsub();
        };
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  
  const handleSelect = (chatUserId) => {
    // Use chatUserId to identify the selected user
    const selectedChat = chats[chatUserId];
  
    if (selectedChat) {
      dispatch({ type: "CHANGE_USER", payload: selectedChat.userInfo });
    } else {
      console.error("Selected user information not found");
    }
  };
  

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1]?.date - a[1]?.date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[0])}
          >
            <img src={chat[1]?.userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo.displayName}</span>
              <p>{chat[1]?.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;

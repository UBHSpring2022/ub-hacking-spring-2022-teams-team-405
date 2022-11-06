import React, { useEffect,useState,useRef } from "react";
import ChatWebSocket from "./ChatWebSocket";
import InputEmoji from "react-input-emoji";
import { Avatar } from "@mui/material";
import "../styles/Chat.scss";

function Chat({ cable }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  function handleSubmit(){
    fetch(`http://localhost:3000/send-message`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "super-token": localStorage.getItem("token"),
        "super-token": " vHHxHPP75FuqUeML3TkJiFbHKpH4uu3W8Td7",
    },
    body: JSON.stringify({
        "uuid": window.location.href.match(/\d+$/)[0],
        "content": newMessage,
    }),

  })
  }
  return <div className="chat">
    <div className="chat-header">
      <Avatar style={{ height: "7vh", width: "7vh" }} src={`https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg`} />
    </div>
    <div className="chat-body" ref={messageEl}>
  
      {messages.map((message) => {
        let sender = false;
        let x = message.created_at.split("T")[1].split(".")[0].split(":")[0] + ":" + message.created_at.split("T")[1].split(".")[0].split(":")[1];
        if (message.sender === "") { // change to current user
          sender = false;
        }
        return (<div key={message.id}>
          <p className={`chat-message ${sender && "chat-receiver"}`}>
            <span className="chat-name">{message.sender_name}</span>
            {message.content}
            <span className="chat-timestamp">{x}</span>
          </p>
        </div>)
      })}
    </div>
    <div className="chat-footer">
      <form>
        <InputEmoji
          cleanOnEnter
          placeholder={"Type a message..."}
          type="text"
          onEnter={() => handleSubmit()}        
          value={newMessage}
          onChange={setNewMessage}
        />
      </form>
    </div>
    <ChatWebSocket cableApp={cable} messages={messages} setMessages={setMessages} />
  </div>;

}

export default Chat;
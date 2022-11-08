import React, { useEffect,useState,useRef } from "react";
import ChatWebSocket from "./ChatWebSocket";
import InputEmoji from "react-input-emoji";
import { Avatar } from "@mui/material";
import "../styles/Chat.scss";
import { useSelector } from "react-redux";

function Chat({ cable }) {

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/chat?uuid=${window.location.href.match(/\d+$/)[0]}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "super-token": localStorage.getItem("token"),
        },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log("result", result);
        if(result.error){
            // FAILED
            setLoaded(false)
        }else{
            // success
            setLoaded(true)
        }
        });
  }, [])
  
  
  function ChatBox({setLoaded}){
    const user = useSelector((state) => state.user);
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
          "super-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
          "uuid": window.location.href.match(/\d+$/)[0],
          "content": newMessage,
      }),
    })
    }

    return(
      <div className="chat">
    <div className="chat-header">
      <Avatar style={{ height: "7vh", width: "7vh" }} src={`https://avatars.dicebear.com/api/adventurer/${user.profile.display_name}.svg`} />
    </div>
    <div className="chat-body" ref={messageEl}>
  
      {messages.map((message) => {
        let sender = false;
        console.log(user)
        let x = message.created_at.split("T")[1].split(".")[0].split(":")[0] + ":" + message.created_at.split("T")[1].split(".")[0].split(":")[1];
        if (message.sender === user.profile.email) { // change to current user
          sender = true;
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
    <ChatWebSocket cableApp={cable} messages={messages} setMessages={setMessages} setLoaded={setLoaded} />
    </div>
    )
  }
  return (
    <>
    {loaded? <ChatBox setLoaded={setLoaded}/>: <h1 className="error">Page Not Found</h1>}
    </>
  );

}

export default Chat;
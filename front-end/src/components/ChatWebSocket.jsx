import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ChatWebSocket({ cableApp,messages,setMessages,setLoaded}) {
  const location = useLocation();
  const getRoomData = (uuid) => {
    fetch(`http://localhost:3000/chat?uuid=${uuid}`,{
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
            setMessages(result.messages);
        }
        });
      };
  
  const updateApp = (result) => {
    if(result.error){
        // FAILED
    }else{
        // success
        // console.log("result",result.room.messages);
        setMessages(result.room.messages);
    }
  };
  useEffect(() => {
    getRoomData(window.location.href.match(/\d+$/)[0]);
    cableApp.room = cableApp.cable.subscriptions.create(
      {
        channel: "RoomsChannel",
        room: window.location.href.match(/\d+$/)[0],
      },
      {
        received: (result) => {
        //   console.log("updatedRoom", result);
          updateApp(result);
        },
      }
    );
  }, [location]);

  return <div></div>;
}

export default ChatWebSocket;
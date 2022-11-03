import React,{useState,useRef,useEffect}from 'react';
import queryString from 'query-string';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import { BiTrash } from "react-icons/bi";
const Main_chat =  (msgData) =>{
let msgDataItems;
var [ msgsData, setMsgsData ] = useState([]);
  //useEffect function
  useEffect(
		() => {
      console.log("message data to map : ",msgData.msgData)
      msgsData=msgData.msgData;
      console.log("local data",msgsData)

      if(msgData.msgData !== undefined){
        msgDataItems= msgData.msgData.map(item=>{
        return(
          <li>{item.msg}</li>
        )
      })
      ReactDOM.render(
        msgDataItems,
        document.getElementById('mesgsContainer')
      );
      }
      console.log("items",msgDataItems)
      
    }
    )
  return (
    <ul id="mesgsContainer"></ul>
  )
     }
export default Main_chat;
import React,{useState,useRef,useEffect}from 'react';
import ReactDOM from "react-dom";
import AvatarChat from './AvatarChat';
import { BiTrash } from "react-icons/bi";
const Main_chat =  (msgs) =>{
    console.log((msgs.msgs));
    let msgsItems=msgs.msgs.map((msgItem)=>{
        return (
        <li>
            <div className="msg_header">
                <AvatarChat src={"Avatar_source"} />
            </div>
            <div className="msg_body">
            {msgItem.msg}
            </div>
        </li>
        )
    });
  return( 
      <ul>{msgsItems}</ul>
  )
}
export default Main_chat;
import React, {  Component } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

class Broadcast extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
  yourID="";
  users = {};
  stream;
  receivingCall =false;
  caller= ""; 
  callerSignal ;
  callAccepted= false;
  userVideo = React.createRef();
  partnerVideo = React.createRef();
  socket = React.createRef();
  
  connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    timeout: 10000, //before connect_error and connect_timeout are emitted.
    transports: ["websocket"],
  };
  //startStream function
  startStream() {
    console.log("streaming function");
    console.log(this.socket.current)
    /*this.socket.current = io.connect(
      "https://serv.uism-tn.com:8081/",
      this.connectionOptions
    );

    this.socket.current.emit("start-stream-teacher", this.socket.current.id);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.stream=stream;
        if (this.userVideo.current) {
            this.userVideo.current.srcObject = stream;
        }
      });

      this.socket.current.on("yourID", (id) => {
      console.log("yourID", id);
      this.YourID=id;
    });

    this.socket.current.on("allUsers", (users) => {
      this.users=users;
    });

    this.socket.current.on("hey", (data) => {
    this.receivingCall=true;
    this.caller=data.from;
      this.Signal=data.signal;
    });*/
  }
  //Peer call
  
  //redering just started
  render() {
    this.socket.current = io.connect(
        "https://serv.uism-tn.com:8081/",
        this.connectionOptions
      );
   return(
    <div>
        <h1>Broadcast</h1>
        <button
        onClick={this.startStream}
        >
           start Streaming
        </button>
    </div>
   );

}
}
export default Broadcast;

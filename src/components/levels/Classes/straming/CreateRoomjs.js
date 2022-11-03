import React, { useState, sessionStorage, useRef, useEffect } from "react";
import { v1 as uuid } from "uuid";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Peer from "peerjs";
import "bootstrap/dist/js/bootstrap.min.js";
//jquery, popper.js libraries for bootstrap modal
import "jquery/dist/jquery.min.js";
import Translate from "react-translate-component";
import en from "../../../../languages/en-US";
import ar from "../../../../languages/ar-TN";
import Counterpart from "counterpart";
import axios from "axios";
import io from "socket.io-client";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
let socket;
let captureStream = null;
const CreateRoom = (props) => {
  var room = "romm";
  var messages = [];
  const datauser = JSON.parse(window.sessionStorage.session);
  const [validity, setvalidity] = useState([]);
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    console.log("use effect");
  });
  function stream_test() {
    socket = io.connect("localhost:5000");
    socket.emit("join-room", "ROOM_ID", datauser.nom_users);
    socket.on("user-connected", (userId) => {
      console.log("user connected", userId);
    });
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .the((stream) => {
        console.log(stream);
      });
  }

  function create() {
    var IdSeance = JSON.parse(window.sessionStorage.seance);
    console.log(IdSeance);
    if (datauser.type == "enseignant" || datauser.type == "user") {
      const id = uuid();
      console.log(id);
      props.history.push(`/room/${id}`);
      fetch("https://uism-tn.com/api/stream.php", {
        crossDomain: true,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomstream: id,
          idseance: IdSeance,
        }),
      });
    }
  }
  function join() {
    if (datauser.type == "etudiant") {
      var IdSeance = JSON.parse(window.sessionStorage.seance);
      let initialStrm = [];
      fetch("https://uism-tn.com/api/stream.php?id_seance=" + IdSeance)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.stream[0]["nom_streaming"]);
          // window.open(window.location.href+"room/" );
          props.history.push(`/room/` + data.stream[0]["nom_streaming"]);
        });
    }
  }

  if (datauser.type == "enseignant" || datauser.type == "user") {
    return (
      <div>
        <button
          id="btn_create_strm"
          class="btn btn-success"
          onClick={() => {
            stream_test();
          }}
        >
          <Translate content="start_room" />
        </button>
        <video id="video" autoplay></video>
      </div>
    );
  } else if (datauser.type == "etudiant") {
    return (
      <button id="btn_join_strm" class="btn btn-success" onClick={join()}>
        <Translate content="join_room" />
      </button>
    );
  } else {
    return (
      <div>
        <button
          id="btn_create_strm"
          class="btn btn-success"
          onClick={() => {
            stream_test();
          }}
        >
          <Translate content="start_room" />
        </button>
        <video id="video" autoplay></video>
      </div>
    );
  }
  /*
  const peerConnections = {};
  const config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"]
      }
    ]
  };
  
  const socket = io.connect(window.location.origin);
  const video = document.querySelector("video");
  
  // Media contrains
  const constraints = {
    video: { facingMode: "user" }
    // Uncomment to enable audio
    // audio: true,
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      socket.emit("broadcaster");
    })
    .catch(error => console.error(error));
    socket.on("watcher", id => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[id] = peerConnection;
    
      let stream = video.srcObject;
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };
    
      peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("offer", id, peerConnection.localDescription);
        });
    });
    
    socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });
    
    socket.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });*/
};

export default CreateRoom;

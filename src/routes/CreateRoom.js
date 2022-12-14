import React, { useState, sessionStorage, useRef, useEffect } from "react";
import { v1 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//jquery, popper.js libraries for bootstrap modal
import "jquery/dist/jquery.min.js";
import Translate from "react-translate-component";
import en from "../languages/en-US";
import ar from "../languages/ar-TN";
import Counterpart from "counterpart";
import axios from "axios";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

const CreateRoom = (props) => {
  const datauser = JSON.parse(window.sessionStorage.session);
  const [validity, setvalidity] = useState([]);

  function create() {
    console.log("create");
    var IdSeance = JSON.parse(window.sessionStorage.seance);
    console.log(IdSeance);
    if (datauser.type == "enseignant" || datauser.type == "user") {
      const id = uuid();
      props.history.push(`/app/room/${id}`);
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
      <button id="btn_create_strm" class="btn btn-success" onClick={create}>
        <Translate content="start_room" />
      </button>
    );
  } else if (datauser.type == "etudiant") {
    return (
      <button id="btn_join_strm" class="btn btn-success" onClick={join}>
        <Translate content="join_room" />
      </button>
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

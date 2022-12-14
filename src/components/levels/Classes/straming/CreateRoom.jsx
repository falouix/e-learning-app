import React, { useState, sessionStorage, useRef, useEffect } from "react";
import { v1 as uuid } from "uuid";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Peer from 'peerjs';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery, popper.js libraries for bootstrap modal
import 'jquery/dist/jquery.min.js';
import Translate from "react-translate-component";
import en from "../../../../languages/en-US";
import ar from "../../../../languages/ar-TN";
import Counterpart from "counterpart";
import axios from "axios";
import io from 'socket.io-client';
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
let socket;
let captureStream = null;
const CreateRoom = (props) => {
var room="romm";
var messages=[];
  const datauser = JSON.parse(window.sessionStorage.session);
  const [validity, setvalidity] = useState([]);
    useEffect(() => {
      console.log("use effect")
    });


    function screen_test(){
        // Prefer camera resolution nearest to 1280x720.
          var constraints = {
              video: {
                  cursor: 'always' | 'motion' | 'never',
                  displaySurface: 'application' | 'browser' | 'monitor' | 'window'
              }
          };

          navigator.mediaDevices(constraints)
          .then(function(mediaStream) {
            var video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
              video.play();
            };
        }).catch(function(err) {
           console.log(err.name + ": " + err.message); 
        }); // always check for errors at the end.
    }

    function stream_test(){
        
          // Prefer camera resolution nearest to 1280x720.
      var constraints = { audio: true, video: { width: 800, height: 500 } };

      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
          var video = document.querySelector('video');
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
          socket = io.connect("localhost:5000");
          socket.emit('stream', video);
          socket.emit('user-stream', video);
          socket.on('user-stream',stream=>{
              console.log(stream);
        })
        
      }).catch(function(err) { 
        console.log(err.name + ": " + err.message); 
      }); // always check for errors at the end.
    }
    
  function create() {
    var IdSeance = JSON.parse(window.sessionStorage.seance);
    console.log(IdSeance);
    if (datauser.type == "enseignant" || datauser.type == "user") {

      const id = uuid();
      console.log(id)
      props.history.push(`/room/${id}`);
      fetch('https://uism-tn.com/api/stream.php', {
        crossDomain: true,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomstream: id,
          idseance: IdSeance,
        })
      })

    }
  }
  function join() {

    if (datauser.type == "etudiant") {
      var IdSeance = JSON.parse(window.sessionStorage.seance);
      let initialStrm = [];
      fetch('https://uism-tn.com/api/stream.php?id_seance=' + IdSeance)
        .then(response => {
          return response.json();
        }).then(data => {
          console.log(data.stream[0]['nom_streaming']);
          // window.open(window.location.href+"room/" );
          props.history.push(`/room/` + data.stream[0]['nom_streaming']);
        });
    }
  }

  if (datauser.type == "enseignant" || datauser.type == "user") {
    return (
        <div>
            <video id="video" className="Streaming_vid" autoplay playsinline controls="false"></video>
      <button id="btn_create_strm" class="btn btn-success" onClick={()=>{stream_test()}}><Translate content="start_room" /></button>
      <button id="btn_create_strm" class="btn btn-success" onClick={()=>{screen_test()}}>share screen</button>
     
    </div>
    );
  } else if (datauser.type == "etudiant") {
    return (
      <button id="btn_join_strm" class="btn btn-success" onClick={join()}><Translate content="join_room" /></button>
    );
  }
}

export default CreateRoom;
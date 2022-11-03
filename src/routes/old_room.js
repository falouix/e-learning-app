
import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import useObjectURL from 'use-object-url';
import RecordRTC from "recordrtc";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import { ProgressBar, Jumbotron, Button, Form } from "react-bootstrap";
import $ from "jquery";

const Room = (props) => {
  
  const [recorder, setrecorder] = useState([]);
  const [progress, setprogress] = useState(100);
const [streamvid, setstreamvid] = useState([]);
  const datauser = JSON.parse(window.sessionStorage.session);
  console.log(datauser.type);
  // const  streamerid  = props.match.params.streamerid;
  //  alert(props.match.params.roomID);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);
  const myStream = useRef([]);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        alert("accept chat");
        
//stream = ''; 
       // console.log("123");
       // console.log(stream);
        userVideo.current.srcObject = stream;
        userStream.current = stream;
        // myStream = stream;
        socketRef.current = io("https://serv.uism-tn.com:8120/");   
        socketRef.current.emit("join room", props.match.params.roomID);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        socketRef.current.on("end stream", end_stream);
      })

       .catch((stream) => {
         console.log(stream);
        alert("refuse chat");
        userVideo.current.srcObject = null ;
        userStream.current = null;
        // myStream = stream;
        socketRef.current = io("https://serv.uism-tn.com:8000");
        socketRef.current.emit("join room", props.match.params.roomID);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        socketRef.current.on("end stream", end_stream);

        });
   
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async function (stream) {
        let recorder = RecordRTC(stream, {
          type: "video",
        });
        console.log(recorder);
        recorder.startRecording();

        const sleep = (m) => new Promise((r) => setTimeout(r, m));
        await sleep(3000);
       // var     vendorURL = window.URL;
       
       // const { objectURL } = useObjectURL(stream);
        //setstreamvid(objectURL);
        setrecorder(recorder);
      });
  }, []);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
  
     // alert("stream not null");
      userStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, userStream.current)
        )
      );
 
  
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    console.log(peerRef.current);
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
    //  setpeer(peerRef);
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }
  function end_stream() {
    alert("end stream");
    console.log(recorder);

    recorder.stopRecording(function () {
      let blob = recorder.getBlob();
      //  invokeSaveAsDialog(blob);
      console.log(blob);
      let url = URL.createObjectURL(blob);
      console.log(url);
      var xhr = require("xhr");

      const fd = new FormData();
      fd.append("video", blob);
      //$(".modal-body-imags").append(<DownloadLink label="Save" filename="myfile.txt"  exportFile={() => blob}/>  );
      const Idseance = JSON.parse(window.sessionStorage.seance);
      fd.append("seance", Idseance);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const urlc = "https://uism-tn.com/api/moveUplodedvideo.php";

      axios
        .post(urlc, fd, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    partnerVideo.current.srcObject = null;
    ////userVideo.current.srcObject = null;

    userStream.current.getTracks().forEach((track) => {
      track.stop();
    });

    console.log(userVideo.current.srcObject);
    console.log(partnerVideo.current.srcObject);
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(screenTrack);
      screenTrack.onended = function () {
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(userStream.current.getTracks()[1]);
      };
    });
  }
  function fileSelect(e) {
    e.preventDefault();

    console.log(e.target.file);
    console.log(e.target.doc_name.value);
    //var file = URL.createObjectURL(e.target.file);
    //console.log(file);

    const Idseance = JSON.parse(window.sessionStorage.seance);
    const doc_name = e.target.doc_name.value;
    const file = e.target.file.files[0];
    const fd = new FormData();
    fd.append("doc_name", doc_name);
    fd.append("seance", Idseance);

    fd.append("file", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const url = "https://uism-tn.com/api/upload.php";

    axios
      .post(url, fd, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (datauser.type == "enseignant" || datauser.type == "user") {
    return (
      <div>
    
        <video
          controls
          style={{ height: 500, width: 500 }}
          id="uservid"
          autoPlay
          ref={userVideo}
        />
        <video
          controls
          style={{ height: 500, width: 500,display:"none"  }}
          muted
          id="guestvid"
          ref={partnerVideo}
        />
        <button
          class="btn btn-danger "
          style={{ margin: "5px" }}
          onClick={end_stream}
        >
          End Stream
        </button>
        <button
          class="btn btn-success"
          style={{ margin: "5px" }}
          onClick={shareScreen}
        >
          Share screen
        </button>

        <div style={{ marginLeft: "45%" }}>
          <form onSubmit={fileSelect}>
            <input
              type="file"
              style={{ position: "initial", margin: "5px" }}
              name="file"
            />
            <input
              type="text"
              name="doc_name"
              class="form-control"
              placeholder="Document Title"
            />
            <button class="btn btn-success " style={{ margin: "5px" }}>
              Submit File
            </button>
          </form>
        </div>
      </div>
    );
  } else if (datauser.type == "etudiant") {
    return (
      <div>
        <video
          controls
          style={{ height: 500, width: 500,display:"none"  }}
          muted
          id="uservid"
          
          ref={userVideo}
        />
        <video
          controls
          style={{ height: 500, width: 500 }}
          id="guestvid"
          autoPlay
          ref={partnerVideo}
        />
      </div>
    );
  }

/*

  let peerConnection;
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"]
    }
  ]
};

const socket = io.connect(window.location.origin);
const video = document.querySelector("video");
socket.on("offer", (id, description) => {
  peerConnection = new RTCPeerConnection(config);
  peerConnection
    .setRemoteDescription(description)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("answer", id, peerConnection.localDescription);
    });
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0];
  };
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };
});
socket.on("candidate", (id, candidate) => {
  peerConnection
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch(e => console.error(e));
});

socket.on("connect", () => {
  socket.emit("watcher");
});

socket.on("broadcaster", () => {
  socket.emit("watcher");
});

socket.on("disconnectPeer", () => {
  peerConnection.close();
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
};*/

};

export default Room;

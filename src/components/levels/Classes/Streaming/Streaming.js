import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#test");
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const data_session = JSON.parse(sessionStorage.getItem("session"));
const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;
var gumVideo;
function Streaming() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const streamingVideo = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  var connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    timeout: 10000, //before connect_error and connect_timeout are emitted.
    transports: ["websocket"],
  };
  useEffect(() => {}, [yourID]);
  function startStream() {
    console.log("streaming function");
    socket.current = io.connect(
      "https://serv.uism-tn.com:8081/",
      connectionOptions
    );
    socket.current.emit("start-stream-teacher", socket.current.id);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      console.log("yourID", id);
      setYourID(id);
    });

    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }
  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
    var captureStream = UserVideo.captureStream();
    console.log(captureStream);
  }

  let PartnerVideo;
  if (callAccepted) {
    //PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    console.log("there is ssomeone calling you");
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  //capture user media
  function handleSuccess(stream) {
    console.log("getUserMedia() got stream:", stream);
    window.stream = stream;
    streamingVideo.current.srcObject = stream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        streamingVideo.current.srcObject = stream;
        let CaptureVideo = (
          <Video playsInline muted ref={streamingVideo} autoPlay />
        );
        ReactDOM.render(
          <>
            <h1>CaptureVideo</h1>
            {CaptureVideo}
          </>,
          document.getElementById("CaptureVideo")
        );
      });
  }
  async function init(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      console.error("navigator.getUserMedia error:", e);
    }
  }

  async function Startcamera() {
    const hasEchoCancellation = document.querySelector("#echoCancellation")
      .checked;
    console.log(hasEchoCancellation);
    const constraints = {
      audio: {
        echoCancellation: { exact: hasEchoCancellation },
      },
      video: {
        width: 1280,
        height: 720,
      },
    };
    console.log("Using media constraints:", constraints);
    await init(constraints);
  }
  //retur component contetn
  return (
    <Container>
      <Row>{UserVideo}</Row>
      <Row>{incomingCall}</Row>
      <button
        onClick={() => {
          startStream();
        }}
      >
        Start Stream
      </button>
      <div id="CaptureVideo"></div>
      <video id="gum" playsinline autoplay muted></video>
      <video id="recorded" playsinline loop></video>

      <div>
        <button
          id="start"
          onClick={() => {
            Startcamera();
          }}
        >
          Start camera
        </button>
      </div>

      <div>
        <h4>Media Stream Constraints options</h4>
        <p>
          Echo cancellation: <input type="checkbox" id="echoCancellation" />
        </p>
      </div>

      <div>
        <span id="errorMsg"></span>
      </div>
    </Container>
  );
}

export default Streaming;

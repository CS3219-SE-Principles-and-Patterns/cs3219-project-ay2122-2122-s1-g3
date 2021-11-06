import "./videoStyle.scss";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import {
  FaVideo,
  FaMicrophone,
  FaPhone,
  FaPhoneSlash,
  FaPhoneVolume,
  FaVideoSlash,
  FaMicrophoneSlash,
} from "react-icons/fa";
require("dotenv").config();

let socket
export const Video = (props) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [callingUser, setCallingUser] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  //TODO: Use real username or jwt token
  const username = Math.floor(Math.random() * 100000).toString();
  const {roomId, setVideoSocket} = props;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket = io("video-service/", {
      transports: ["websocket"],
    });
    setVideoSocket(socket)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
      socket.emit("CONNECTED_TO_VIDEO_ROOM", { roomId, username });
    });

    socket.on("ROOM:VIDEO:CONNECTION", (newUsers) => {
      setUsers(newUsers.map((u) => JSON.parse(u)));
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("callEnded", () => {
      setCallEnded(true);
      setCallAccepted(false);
      setReceivingCall(false);
    });
  }, []);

  const callUser = () => {
    setCallEnded(false);
    setCallingUser(true);
    const id = users.filter((u) => u.socketID !== me)[0].socketID;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setCallingUser(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    setCallEnded(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  //TODO: clean this
  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    setReceivingCall(false);
    socket.emit("callEnded");
    //connectionRef.current.destroy();
  };

  const toggleMic = () => {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMicOn((state) => !state);
  };

  const toggleCam = () => {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setCamOn((state) => !state);
  };
  return (
    <div className="Video">
      <div className="leftButtons">
        <button className="videoButton">
          {camOn ? (
            <FaVideo onClick={toggleCam} />
          ) : (
            <FaVideoSlash onClick={toggleCam} />
          )}
        </button>
        <button className="microhphoneButton">
          {micOn ? (
            <FaMicrophone onClick={toggleMic} />
          ) : (
            <FaMicrophoneSlash onClick={toggleMic} />
          )}
        </button>
        {/* myID: {me}
        <textarea
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        /> */}
      </div>
      <div className="cameraFeed">
        {stream ? (
          <video playsInline muted ref={myVideo} autoPlay />
        ) : (
          "Your video"
        )}
      </div>
      <div className="cameraFeed">
        {callAccepted && !callEnded ? (
          <video playsInline ref={userVideo} autoPlay />
        ) : (
          "Partner video"
        )}
      </div>
      <div className="rightButtons">
        {callAccepted && !callEnded ? (
          <button className="endCallButton" onClick={leaveCall}>
            <FaPhoneSlash />
          </button>
        ) : receivingCall && !callAccepted ? (
          <button className="callButton" onClick={answerCall}>
            {/* TODO: put username here */}
            Partner is calling
            <FaPhoneVolume />
          </button>
        ) : callingUser ? (
          <span>
            Calling User <FaPhoneVolume />
          </span>
        ) : (
          <button className="callButton" onClick={callUser}>
            <FaPhone />
          </button>
        )}
      </div>
    </div>
  );
};

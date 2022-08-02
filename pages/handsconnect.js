import Handpose from "../components/handpose";
import Logo from "../components/UI/logo";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import FriendsPose from "../components/friendspose";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Handsconnect() {
  const handIndicatorType = useControlsStore(
    (state) => state.handIndicatorType
  );
  const router = useRouter();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("seungmee");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [pairName, setPairName] = useState(null);

  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  var baseURL;
  if (typeof window !== "undefined") {
    baseURL = window.location + "?socketid=";
  }

  const socket = io("localhost:5000");

  var wrtc = require("wrtc");
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: stream,
    wrtc: wrtc,
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
      console.log(data.signal);
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log(stream);
    });

    connectionRef.current = peer;
  }, []);

  const callUser = (id) => {
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
      // wrtc: wrtc,
    });
    peer2.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer2.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log(stream);
    });

    peer2.signal(callerSignal);
    connectionRef.current = peer2;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setIdToCall(query.socketid);
    setPairName(query.name);
  }, [router.isReady, router.query]);

  return (
    <div className={styles.playground}>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          position: "fixed",
          top: 0,
          left: 0,
          background: "black",
          color: "white",
          zIndex: 100,
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => {
          navigator.clipboard.writeText(baseURL + me + "&name=" + name);
          // window.open(baseURL + me + "&name=" + name, "_blank");
          // router.push({
          //   pathname: "/handsconnect",
          //   query: { socketid: me, name: name },
          // });
        }}
      >
        invite a friend <br />
        receivingCall: {receivingCall.toString()}
        <br />
        callAccepted: {callAccepted.toString()}
        <br />
        {me}
        {receivingCall === true && (
          <div
            onClick={() => {
              answerCall();
            }}
          >
            your friend accepted. Ready?
          </div>
        )}
      </div>
      <Grid color={handColor} />

      <FriendsPose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
        videoRef={myVideo}
      />
      {callAccepted && !callEnded && (
        <>
          <div
            style={{
              width: "50vw",
              height: "50vh",
              background: "yellow",
              position: "fixed",
              bottom: 0,
              left: 0,
            }}
          >
            <FriendsPose
              handIndicatorType={handIndicatorType}
              cameraFeed={true}
              rules={rules}
              handColor={"red"}
              videoRef={userVideo}
            />
          </div>
        </>
      )}
      <div
        style={{
          width: "100%",
          height: "fit-content",
          background: "red",
          color: "white",
          position: "fixed",
          zIndex: 200,
          top: 0,
          left: 0,
          cursor: "pointer",
          textAlign: "center",
          display: pairName === undefined ? "none" : "block",
        }}
        onClick={() => {
          callUser(idToCall);
        }}
      >
        {pairName} is inviting you to play
        <br />
        {idToCall}
      </div>
      <div
        style={{
          display: "flex",
          width: "94vw",
          position: "absolute",
          bottom: 0,
          left: "3vw",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <Rules />
        <Controls />
      </div>
      <div
        style={{
          width: "100vw",
          position: "absolute",
          top: 36,
          display: "flex",
          justifyContent: "center",
          zIndex: 9,
        }}
      >
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: 5,
            background: "#f3f3f3",
          }}
        >
          <Logo color={handColor} displayTag={false} fontSize={40} />
        </div>
      </div>
    </div>
  );
}

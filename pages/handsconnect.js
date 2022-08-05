import Handpose from "../components/handpose";
import Logo from "../components/UI/logo";
import Controls from "../components/controlUI/controls";
import Rules from "../components/controlUI/rules";
import Invite from "../components/controlUI/invite";
import Grid from "../components/grid";
import { useControlsStore, useRulesStore, useInviteStore } from "../lib/store";
import styles from "../handsplay.module.scss";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import FriendsPose from "../components/friendspose";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

function Handsconnect() {
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
  const myName = useInviteStore((state) => state.myName);
  const myId = useInviteStore((state) => state.myId);
  const inviteStatus = useInviteStore((state) => state.inviteStatus);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socket = useRef();

  const [pairName, setPairName] = useState(null);

  const rules = useRulesStore((state) => state.rules);
  const handColor = useControlsStore((state) => state.handColor);
  const cameraFeed = useControlsStore((state) => state.cameraFeed);

  var baseURL;
  if (typeof window !== "undefined") {
    baseURL = window.location + "?socketid=";
  }

  useEffect(() => {
    socket.current = io.connect("localhost:5000");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.current.on("me", (id) => {
      useInviteStore.setState({ myId: id });
    });

    socket.current.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      useInviteStore.setState({ myName: data.name });
      setCallerSignal(data.signal);

      setTimeout(() => {
        answerCall();
      }, 5000);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: myName,
      });
    });
    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    useInviteStore.setState({ inviteStatus: true });

    const peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer2.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: caller });
    });

    peer2.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
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
    useInviteStore.setState({ inviteLink: baseURL + myId + "&name=" });
  }, [router.isReady, router.query, myId]);

  return (
    <div className={styles.playground}>
      {/* <div
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
          //   query: { socket.currentid: me, name: name },
          // });
        }}
      >
        {receivingCall === true && (
          <div
            onClick={() => {
              answerCall();
            }}
          >
            {caller}
            your friend accepted. Ready?
          </div>
        )}
      </div> */}
      <Grid color={handColor} />
      <FriendsPose
        handIndicatorType={handIndicatorType}
        cameraFeed={cameraFeed}
        rules={rules}
        handColor={handColor}
        videoRef={myVideo}
      />
      {callAccepted && !callEnded && (
        <FriendsPose
          handIndicatorType={handIndicatorType}
          cameraFeed={false}
          rules={rules}
          handColor={"red"}
          videoRef={userVideo}
          mirror={false}
        />
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
        <Controls /> <Invite />
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
          <Logo
            text={"HANDZCONNECT"}
            color={handColor}
            displayTag={false}
            fontSize={40}
          />
        </div>
      </div>
    </div>
  );
}
export default Handsconnect;

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import { startWebCam, startCall, answerCall, hangUp } from "./connection";
import Popup from "../../Components/popup/Popup";

const Room = () => {
  const webcamVideo = useRef();
  const remoteVideo = useRef();
  const hangupButton = useRef();

  const handleWebCam = async () => {
    let { localStream, remoteStream } = await startWebCam();

    webcamVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = remoteStream;
  };

  const handleCall = async () => {
    await startCall(state.id);
    hangupButton.current.disabled = false;
  };

  const handleIncomingCall = async () => {
    await handleWebCam();
    await answerCall(state.id);
  };

  const startMeet = async () => {
    await handleWebCam();
    if (state.status == "created") handleCall();
    else handleIncomingCall();
  };

  const navigate = useNavigate();
  const endMeet = async () => {
    const tracks = webcamVideo.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    await hangUp(state.id);
    navigate("/");
  };

  const { state } = useLocation();
  useEffect(() => {
    startMeet(state.id);
  }, []);

  return (
    <>
      <div className="roomContainer">
        <div className="mediaScreen">
          <video className="media" autoPlay ref={webcamVideo} />
          <video
            className="media"
            autoPlay
            ref={remoteVideo}
            id="remoteVideo"
          />
        </div>
        <div className="controls">
          <button className="btn" ref={hangupButton} onClick={endMeet}>
            {" "}
            Hang Up{" "}
          </button>
        </div>
      {state.status == "created" && <Popup data={state.id} />}
      </div>
    </>
  );
};

export default Room;

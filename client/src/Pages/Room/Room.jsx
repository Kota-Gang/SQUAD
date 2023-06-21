// const webcamButton = document.querySelector('#webcamButton');
// const webcamVideo = document.querySelector('#webcamVideo');
// const callButton = document.querySelector('#callButton');
// const callInput = document.querySelector('#callInput');
// const answerButton = document.querySelector('#answerButton');
// const remoteVideo = document.querySelector('#remoteVideo');
// const hangupButton = document.querySelector('#hangupButton');
import {BsCameraVideo } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { startWebCam,startCall,answerCall } from "./connection";

const Room = () => {
  const webcamButton = useRef();
  const webcamVideo = useRef();
  const callButton = useRef();
  const callInput = useRef();
  const answerButton = useRef();
  const remoteVideo = useRef();
  const hangupButton = useRef();

  const handleWebCam = async()=>{

    let {localStream,remoteStream} = await startWebCam();
    
    webcamVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = remoteStream;

    // console.log(localStream)

    callButton.current.disabled = false;
    answerButton.current.disabled = false;
    webcamButton.current.disabled = true;
  }

  const handleCall = async()=>{
    callInput.current.value = await startCall();
    hangupButton.current.disabled = false
  }

  const handleIncomingCall = async()=>{
    await answerCall(callInput.current.value);
  }

  useEffect(() => {}, []);

  return (
    <div className="roomContainer">
      <label htmlFor="callInput">Call Input</label>
      <input className="callInput" name="callInput" type="text" ref={callInput} />
      <div className="mediaScreen">
        <video className="media" autoPlay ref={webcamVideo} />
        <video className="media" ref={remoteVideo} />
      </div>
      <div className="controls">
        <button className="btn" ref={webcamButton} onClick={handleWebCam}> Enable video </button>
        <button className="btn" ref={callButton} onClick={handleCall}> call <BsCameraVideo/> </button>
        <button className="btn" ref={answerButton} onClick={ handleIncomingCall} > answer </button>
        <button className="btn" ref = {hangupButton}   > Hang up </button>
      </div>
    </div>
  );
};

export default Room;

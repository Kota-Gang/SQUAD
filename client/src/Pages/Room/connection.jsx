import { app } from "../Authenctication/firebaseconfig";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  getDoc,
  getFirestore,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"], // free stun server
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

export const startWebCam = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  remoteStream = new MediaStream();

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.addEventListener("track", (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  });

  return { localStream, remoteStream };
};

export const startCall = async (roomCode) => {
  let callDoc = doc(collection(firestore, "room"), roomCode);
  let offerCandidates = collection(callDoc, "offerCandidates");
  let answerCandidates = collection(callDoc, "answerCandidates");

  pc.onicecandidate = (event) => {
    event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
  };

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const roomWithOffer = {
    offer: {
      type: offerDescription.type,
      sdp: offerDescription.sdp,
    },
  };

  await setDoc(callDoc, roomWithOffer, { merge: true });

  onSnapshot(
    callDoc,
    { includeMetadataChanges: true },
    (snapshot) => {
      const data = snapshot.data();

      if (!pc.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }

      onSnapshot(
        answerCandidates,
        { includeMetadataChanges: true },
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    (err) => {
      console.log(err);
    }
  );
};

export const answerCall = async (roomCode) => {
  let callDoc = doc(collection(firestore, "room"), roomCode);
  let offerCandidates = collection(callDoc, "offerCandidates");
  let answerCandidates = collection(callDoc, "answerCandidates");

  // console.log(callDoc)
  // here we listen to the changes and add it to the answerCandidates
  pc.onicecandidate = (event) => {
    event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
  };

  let docSnap = await getDoc(callDoc);
  if (docSnap.exists()) {
    let callData = docSnap.data();
    const offerDescription = callData.offer;
    // console.log("offer received on answer side:",callData.offer);
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
  }

  // setting the remote video with offerDescription

  // setting the local video as the answer
  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(new RTCSessionDescription(answerDescription));

  // answer config
  const roomWithAnswer = {
    answer: {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    },
  };

  // await callDoc.update({ answer });
  await setDoc(callDoc, roomWithAnswer, { merge: true });

  onSnapshot(
    offerCandidates,
    { includeMetadataChanges: true },
    (snapshot) => {
      // console.log(snapshot);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          // console.log("received Candidate on Answer side:",data);
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    },
    (err) => {
      console.log(err);
    }
  );
};

export const  hangUp = async(roomCode)=>{
    
  
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
  
    if (pc) {
      pc.close();
    }

    
  }
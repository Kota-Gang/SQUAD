import { app } from "../Authenctication/firebaseconfig";
import { doc , setDoc ,collection, addDoc, onSnapshot, getDoc,getFirestore} from "firebase/firestore"; 

const firestore =  getFirestore(app);


const servers = {
    iceServers: [
        {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'], // free stun server
    },
    ],
    iceCandidatePoolSize: 10,
};

// global states
const pc = new RTCPeerConnection(servers);
let localStream = null; 
let remoteStream = null 



export const startWebCam = async () => {
    

    // setting local stream to the video from our camera
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true
    })

    // initalizing the remote server to the mediastream
    remoteStream = new MediaStream();
    // document.getElementById("remoteVideo").srcObject = remoteStream;


    // Pushing tracks from local stream to peerConnection
    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    })

    pc.addEventListener('track', event => {
        // console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
        //   console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
        });
      });

    return {localStream,remoteStream};

    // displaying the video data from the stream to the webpage
    
}


export const startCall = async (roomCode) => {
    let callDoc = doc(collection(firestore,"room"),roomCode);
    let offerCandidates = collection(callDoc,'offerCandidates');
    let answerCandidates = collection(callDoc,'answerCandidates');

    pc.onicecandidate = event => {
        event.candidate && addDoc(offerCandidates,event.candidate.toJSON());
    }

    // create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    // config for offer
    const roomWithOffer = {
        'offer': {
            type: offerDescription.type,
            sdp: offerDescription.sdp
        },
      };

    await setDoc(callDoc,roomWithOffer,{merge:true});

    
    // listening to changes in firestore and update the streams accordingly

    onSnapshot(callDoc,{ includeMetadataChanges: true },snapshot => {
        const data = snapshot.data();
        // console.log("snap")

        if (!pc.currentRemoteDescription && data.answer) {
            // console.log("answer received on caller side:",data.answer)
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
        }

        // if answered add candidates to peer connection
        onSnapshot(answerCandidates,{ includeMetadataChanges: true },snapshot => {
            // console.log(snapshot)
            snapshot.docChanges().forEach(change => {

                if (change.type === 'added') {
                    // console.log("Candidate received on Caller Side:",change.doc.data());
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            })
        },(err)=>{
            console.log(err);
        })
    },(err)=>{
        console.log(err);
    })

    
}


export const answerCall = async (roomCode) => {
    let callDoc = doc(collection(firestore,"room"),roomCode);
    let offerCandidates = collection(callDoc,'offerCandidates');
    let answerCandidates = collection(callDoc,'answerCandidates');


    // console.log(callDoc)
    // here we listen to the changes and add it to the answerCandidates
    pc.onicecandidate = event => {
        event.candidate && addDoc(answerCandidates,event.candidate.toJSON());
    }



    let docSnap = await getDoc(callDoc)
    if(docSnap.exists()){
        let callData =docSnap.data();
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
            sdp: answerDescription.sdp
        },
      };

    // await callDoc.update({ answer });
    await setDoc(callDoc,roomWithAnswer,{merge:true})

    onSnapshot(offerCandidates,{ includeMetadataChanges: true },snapshot => {
        // console.log(snapshot);
        snapshot.docChanges().forEach(change => {

            if (change.type === 'added') {
                let data = change.doc.data();
                // console.log("received Candidate on Answer side:",data);
                pc.addIceCandidate(new RTCIceCandidate(data));

            }
        })
    },(err)=>{
        console.log(err);
    })
}
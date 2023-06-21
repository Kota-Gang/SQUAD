import { firestore } from "../Authenctication/firebaseconfig";
import { doc , setDoc ,collection, addDoc, onSnapshot, getDoc, getDocs} from "firebase/firestore"; 

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


    // Pushing tracks from local stream to peerConnection
    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    })

    pc.ontrack = event => {
        event.streams[0].getTracks(track => {
            remoteStream.addTrack(track)
        })
    }  

    return {localStream,remoteStream};

    // displaying the video data from the stream to the webpage
    
}


export const startCall = async () => {

    // referencing firebase collections
    // const callDoc = firestore.collection('calls').doc();
    const callDoc = doc(collection( firestore,"calls"));

    const offerCandidates = collection(callDoc,'offerCandidates');
    const answerCandidates = collection(callDoc,'answerCandidates');

    // setting the input value to the calldoc id
    
    // get candidiates for caller and save to db
    pc.onicecandidate = event => {
        event.candidate && addDoc(offerCandidates,event.candidate.toJSON());
    }

    // create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    // config for offer
    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
    }

    await setDoc(callDoc,{offer});

    
    // listening to changes in firestore and update the streams accordingly

    onSnapshot(callDoc,snapshot => {
        const data = snapshot.data();

        if (!pc.currentRemoteDescription && data.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
        }

        // if answered add candidates to peer connection
        onSnapshot(answerCandidates,snapshot => {
            snapshot.docChanges().forEach(change => {

                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            })
        })
    })

    
    return callDoc.id;  
    // return "dkfja";
    
}


export const answerCall = async (callId) => {
  
    // getting the data for this particular call
    const callDoc = doc(collection(firestore,'calls'));
                    
    const offerCandidates = collection(callDoc,'offerCandidates');
    const answerCandidates = collection(callDoc,'answerCandidates');
    // const answerCandidates = collection('answerCandidates');
    // const offerCandidates = callDoc.collection('offerCandidates');

    // here we listen to the changes and add it to the answerCandidates
    pc.onicecandidate = event => {
        event.candidate && addDoc(answerCandidates,event.candidate.toJSON());

    }

    const docSnap = await getDocs(collection(firestore,"calls"));
    let callData ;
    docSnap.forEach((doc)=>{
        console.log(doc.data().offer);
        callData = doc.data();
    })
    // const callData = docSnap.data();

    // setting the remote video with offerDescription
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    

    // setting the local video as the answer
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(new RTCSessionDescription(answerDescription));

    // answer config
    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp
    }

    // await callDoc.update({ answer });
    await setDoc(callDoc,{answer})

    onSnapshot(offerCandidates,snapshot => {
        snapshot.docChanges().forEach(change => {

            if (change.type === 'added') {
                let data = change.doc.data();
                pc.addIceCandidate(new RTCIceCandidate(data));

            }
        })
    })
}
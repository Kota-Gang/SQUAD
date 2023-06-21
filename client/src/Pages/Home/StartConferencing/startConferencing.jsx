import React, { useEffect } from 'react'
import './styles.scss'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function StartConferencing({signout,verified,setValue}) {
    const navigate = useNavigate();

    const joinRef = useRef();

    useEffect(()=>{
        if(!verified){
            const goback = setTimeout(()=>{
                setValue('Sign In');
            },5000)
        }
       
    },[])

    return (
        <div className='homeContainer'>
            {verified ? <>
            <div className='homeWrapper'>
                <button className='newMeeting' onClick={()=>{
                    navigate('/meet')
                }}>New Meeting</button>
                <input onClick={()=>{
                    joinRef.current.style.display="inline";
                }} type="text" className='code' placeholder='Enter Code' />
                <span ref={joinRef}  className='join'>Join</span>
            </div>
            <button className='logout' onClick={signout}>Sign Out</button>
            </> : <><h1>Please Verify Your Email First And Sign In Again</h1><h4>Verification Link Has Been Sent To Your Email ID</h4></> }
        </div>
    )
}

export default StartConferencing

import React from 'react'
import './styles.scss'
import { useRef } from 'react'

function StartConferencing({signout}) {

    const joinRef = useRef();

    return (
        <div className='homeContainer'>
            <div className='homeWrapper'>
                <button className='newMeeting'>New Meeting</button>
                <input onClick={()=>{
                    joinRef.current.style.display="inline";
                }} type="text" className='code' placeholder='Enter Code' />
                <span ref={joinRef}  className='join'>Join</span>
            </div>
            <button className='logout' onClick={signout}>Log Out</button>
        </div>
    )
}

export default StartConferencing

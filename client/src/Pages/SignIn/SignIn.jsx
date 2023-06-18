import React, { useEffect, useState } from "react";
import {signInWithPopup} from "firebase/auth";
import { provider, auth } from "./firebaseconfig";
import GoogleButton from 'react-google-button'

function SignIn(){
    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

return (
    <div>
        <GoogleButton onClick={handleClick}/>
    </div>
);
}
export default SignIn;
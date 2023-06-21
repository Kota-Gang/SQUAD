import React, { useEffect, useState } from 'react'
import './styles.scss'
import { auth } from '../../Pages/Authenctication/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
import logo from './logo.png'

const Header = () => {

    const [user,setUser] = useState(null);

    onAuthStateChanged(auth , (userCredential)=>{
        setUser({photoURL:userCredential.photoURL,userName:userCredential.displayName});
    })

    useEffect(()=>{
        // console.log(auth.name)
    },[])

  return (
    <div className='header'>
      <div className='logo'><img src={logo} width={100} height={40} /></div>
      {user && <div className='user'> <img src={user.photoURL } className='profilePicture' alt="" /> {user.userName}</div>}
    </div>
  )
}

export default Header
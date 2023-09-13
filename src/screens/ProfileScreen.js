import React from 'react'
import "./ProfileScreen.css"
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import PlansScreen from './PlansScreen'

const ProfileScreen = () => {
    const user = useSelector(selectUser)
  return (
    <div className='profileScreen'>
        <Nav />
        <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' />
                <div className='profileScreen__details'>
                    <h2>{user.email}</h2>
                    <div className='profileScreen__plans'>
                    <h3>Plans</h3>
                    <PlansScreen/>
                        <Link to="/"><button onClick={()=> auth.signOut()} className='profileScreen__signOut'>Sign Out</button></Link>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen
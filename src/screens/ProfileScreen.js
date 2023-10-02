import React, { useEffect, useState } from 'react'
import "./ProfileScreen.css"
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import PlansScreen from './PlansScreen'
import { getDbData, getSubsscription } from '../utils/commonFuncs'
import { AVATAR_IMG } from '../utils/constants'

const ProfileScreen = () => {
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        getSubsData()
    },[])

    const getSubsData = async () => {
        await getSubsscription().then((data) => setSubscription(data))
    }


  return (
    <div className='profileScreen'>
        <Nav />
        <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
                <img src={AVATAR_IMG} />
                <div className='profileScreen__details'>
                    <h2>{user.email}</h2>
                    <div className='profileScreen__plans'>
                    <h3>Plans : {subscription?.role.toUpperCase()}</h3>
                    <PlansScreen className="plansScreen__container"/>
                        <Link to="/"><button onClick={()=> auth.signOut()} className='profileScreen__signOut'>Sign Out</button></Link>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen
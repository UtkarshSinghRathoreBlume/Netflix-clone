import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { AVATAR_IMG } from '../utils/constants'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

const HamburgerProfile = () => {
  const user = useSelector(selectUser)
  
  return (
    <div className='text-white mx-auto my-0 w-3/4'>
      <div className='flex items-center mb-5'>
        <img className='h-10 mr-3' src={AVATAR_IMG}></img>
        <h4>{user.displayName}</h4>
      </div>
      <div className='flex items-center'>
        <span className='material-symbols-outlined w-14 flex justify-center'>edit</span>
        <Link to="/profile"><h4>Manage Profile</h4></Link>
      </div>
      <div className='w-full mt-10 flex justify-center bg-red-600 py-5 rounded-md font-bold'>
        <Link to="/"><h4 onClick={()=>auth.signOut()}>Sign Out</h4></Link>
      </div>
    </div>
  )
}

export default HamburgerProfile
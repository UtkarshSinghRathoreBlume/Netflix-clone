import React, { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout, selectUser } from './features/userSlice';

const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const user = useSelector(selectUser);
  const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
          if(userAuth) {
            // Logged In
            dispatch(login({
              uid: userAuth.uid,
              email: userAuth.email,
              displayName: userAuth.displayName
            }))
          }
          else {
            // Logged out
            dispatch(logout())
          }
        })
        return unsubscribe;
      },[dispatch])

      if(!user) {
        return navigate("/")
      }

      else {
        return children
      }


}

export default AuthProvider
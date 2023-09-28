import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  signInWithPopup, GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { checkValidData } from "../utils/validate";
import PasswordRules from "../utils/PasswordRules";
import { GOOLGE_LOGO } from "../utils/constants";

const SignupScreen = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nameRef = useRef(null)
    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [showPasswordRules, setShowPasswordRules] = useState(false)

    const toggleSignIn = () => {
      setIsSignIn(!isSignIn)
    }

    const register = (e) => {
        e.preventDefault()
        setErrorMessage(checkValidData(emailRef.current.value, passwordRef.current.value))
        if(errorMessage) {
          return
        }
    
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((authUser) => {
            console.log(authUser)
        }).catch(err => {
            alert(err.message)
        })
    }

    const signIn = (e) => {
        e.preventDefault();
        setErrorMessage(checkValidData(emailRef.current.value, passwordRef.current.value))
        if(errorMessage) {
          return
        }
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((authUser) => {
            console.log(authUser)
        }).catch(err => {
            alert(err.message)
        })
    }

    const signInWithGoogle = (e) => {
      e.preventDefault()
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
        console.log(result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      
    }

  return (
    <div className="signupScreen">
      <form>
        <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn ? <input className="bg-gray-700"  type="text" placeholder="Full Name" ref={nameRef}/> : ""}
        <input className="bg-gray-700" ref={emailRef} placeholder="Email" type="email" />
        <input className="bg-gray-700" ref={passwordRef} placeholder="Password" type="password" />
        
        {/* {showPasswordRules && <PasswordRules />} */}
        {errorMessage && <p className="text-red-500 font-bold text-lg py-2 text-left">{errorMessage}</p>}
        <button type="submit" onClick={isSignIn ? signIn : register}>{isSignIn ? "Sign In" : "Sign Up"}</button>
        <div>
          <button onClick={(e)=>signInWithGoogle(e)} className="flex mt-6 items-center bg-white text-black rounded-md w-full">
            <img className="p-2" width="50px" src={GOOLGE_LOGO}></img>
            <span className="ml-3">Login with Google</span>
          </button>
        </div>
        <h4>
          <span className="signupScreen__gray">{!isSignIn ?  "Already registered?" : "New to Netflix?"}</span>
          <span className="signupScreen__link" onClick={toggleSignIn}>{!isSignIn ? " Sign In now." : " Sign Up now"}</span>
         
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;

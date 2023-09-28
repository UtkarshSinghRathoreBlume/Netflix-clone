import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";
import FirstSection from "./loginScreen_sections/FirstSection";
import SecondSection from "./loginScreen_sections/SecondSection";
import { NETFLIX_LOGO } from "../utils/constants";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll',transitionNavBar);
    return () => {
        window.removeEventListener('scroll', transitionNavBar);
    }
}, [])

  const transitionNavBar = () => {
    if(window.scrollY > 100 ) {
        setShow(true)
    }
    else {
        setShow(false)
    }
}
  return (
    <div className="loginScreen">
      <div className="loginScreen__section loginScreen__section--mainSection">
        <div className="loginScreen__background">
          <div className={`nav ${show && 'nav__black'}`}>
            <img
              className="loginScreem__logo"
              src={NETFLIX_LOGO}
            />
            <button
              className="loginScreen__button"
              onClick={()=>{window.scrollTo({top: 0, left: 0, behavior: 'smooth' })}}
            >
              Sign In
            </button>
          </div>
          <div className="loginScreen__gradient" />
        </div>
        <div className="loginScreen__body">
            <SignupScreen />
        </div>
        <div className="loginScreen__partitionLine"></div>
      </div>
      <div className="loginScreen__section loginScreen__section--firstSection">
            <FirstSection />
            <div className="loginScreen__partitionLine"></div>
      </div>
      <div className="loginScreen__section loginScreen__section--secondSection">
        <SecondSection />
        <div className="loginScreen__partitionLine"></div>
      </div>
    </div>
  );
};

export default LoginScreen;

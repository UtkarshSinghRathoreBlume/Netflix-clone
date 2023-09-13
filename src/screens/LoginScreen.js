import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";
import FirstSection from "./loginScreen_sections/FirstSection";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="loginScreen">
      <div className="loginScreen__section loginScreen__section--mainSection">
        <div className="loginScreen__background">
          <img
            className="loginScreem__logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          />
          <button
            className="loginScreen__button"
            onClick={() => setSignIn(true)}
          >
            Sign In
          </button>
          <div className="loginScreen__gradient" />
        </div>
        <div className="loginScreen__body">
          {signIn ? (
            <SignupScreen />
          ) : (
            <>
              <div className="loginScreen__title">
                <h1>The biggest Indian hits. The best Indian stories.</h1>
                <h1>All streaming here.</h1>
              </div>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership
              </h3>
              <div className="loginScreen__input">
                <form>
                  <input type="email" placeholder="Email address" />
                  <button
                    className="loginScreen__getStarted"
                    onClick={() => setSignIn(true)}
                  >
                    Get Started &gt;{" "}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        <div className="loginScreen__partitionLine"></div>
      </div>
      <div className="loginScreen__section loginScreen__section--firstSection">
            <FirstSection />
            <div className="loginScreen__partitionLine"></div>
      </div>
    </div>
  );
};

export default LoginScreen;

import React from "react";
import "./ProfileDropDown.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

const ProfileDropDown = () => {
  const user = useSelector(selectUser);
  return (
    <div className="profileDropDown">
        <div className="profileDropDown__body">
            <div className="profileDropDown__row">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img>
                <h4>{user.displayName}</h4>
              </div>
            <div className="profileDropDown__row">
              
                <span class="material-symbols-outlined">edit</span>
                <Link to="/profile"><h4>Manage Profile</h4></Link>
            </div>
        </div>
        <div className="profileDropDown__signout">
                <Link to="/"><h4 onClick={()=> auth.signOut()}>Sign out of Netflix</h4></Link>
            </div>
    </div>
  );
};

export default ProfileDropDown;

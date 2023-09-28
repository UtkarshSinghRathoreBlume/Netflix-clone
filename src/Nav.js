import React, { useEffect, useRef, useState } from "react";
import "./Nav.css";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import { AVATAR_IMG, NAV_NETFLIX_LOGO, SEARCH_LOGO } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addSearchMovies } from "./features/moviesSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const searchBar = useRef(null);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleSearchButton = (e) => {
    setShowInput(true);
    searchBar.current?.focus();
  };

  const handleClear = (e) => {
    searchBar.current.focus()
    e.stopPropagation()
    e.preventDefault()
    setShowInput(true)
    console.log(searchBar.current.value)
    searchBar.current.value=null
    console.log(searchBar.current.value)
    dispatch(addSearchMovies(null));
  }

  const handleKeyPress = (e) => {
    dispatch(addSearchMovies(searchBar.current.value));
  };

  const handleBlurInput = () => {
  
    if(document.activeElement === searchBar.current) {
        setShowInput(true)
    }
    else {
        setShowInput(false)
    }
    dispatch(addSearchMovies(null));

  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <Link to="/">
          <img className="nav__logo" src={NAV_NETFLIX_LOGO} alt="" />
        </Link>
        <img
          onClick={(e) => handleDropdown(e)}
          className="nav__avatar"
          src={AVATAR_IMG}
        ></img>
        {
          <button
            className={`nav__search--btn ${
              showInput && "moveToLeft"
            } fixed right-24 h-12 text-white`}
            onClick={(e) => handleSearchButton(e)}
          >
            <span class="material-symbols-outlined">search</span>
          </button>
        }
        <input
          onBlur={() => handleBlurInput()}
          ref={searchBar}
          onKeyUp={() => handleKeyPress()}
          type="text"
          placeholder="Titles, peoples, genres"
          className=" nav__search--input fixed right-24 h-12"
        />
        <button  className={`${!showInput && "opacity-0 "}nav__search--cross fixed h-14 right-28`} onClick={(e)=>handleClear(e)}>
            <span  class="material-symbols-outlined text-white">close</span>
        </button>
        {showDropdown ? (
          <i className="nav__upIcon" />
        ) : (
          <i className="nav__downIcon" />
        )}
      </div>
      {showDropdown && <ProfileDropDown />}
    </div>
  );
};

export default Nav;

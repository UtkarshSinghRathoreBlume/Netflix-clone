import React, { useEffect, useRef, useState } from "react";
import "./Nav.css";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import { AVATAR_IMG, NAV_NETFLIX_LOGO, SEARCH_LOGO } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addSearchMovies } from "./features/moviesSlice";
import { gptResults } from "./utils/commonFuncs";
import { addGptResult, addGptResultBtn } from "./features/gptSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showGptResults, setShowGptResults] = useState(false)
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
    searchBar.current.value=null
    dispatch(addSearchMovies(null));
  }

  const handleKeyPress = (e) => {
    let timer
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=> {
      dispatch(addSearchMovies(searchBar.current.value));
    dispatch(addGptResultBtn(false))
    },2000)
    
  };

  const handleBlurInput = () => {
  
    if(document.activeElement === searchBar.current) {
        setShowInput(true)
    }
    else {
        setShowInput(false)
    }

  }

  const handleGptSearch = async () => {
    searchBar.current.focus()
    setShowInput(true)
    dispatch(addGptResultBtn(true))
    await gptResults(searchBar.current.value).then(data =>{ 
        if (!data.choices) {
          addGptResult(null)
          alert("GPT results not present")
          return
        }
      dispatch(addGptResult(data.choices[0]?.message?.content.split(",")))})
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
            } fixed right-60 h-12 text-white`}
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
          className=" nav__search--input fixed right-60 h-12"
        />
        <button  className={`${!showInput && "opacity-0 "}nav__search--cross fixed h-14 right-64`} onClick={(e)=>handleClear(e)}>
            <span  class="material-symbols-outlined text-white">close</span>
        </button>
        <button onClick={()=>handleGptSearch()} disabled={!searchBar?.current?.value} className="nav__gptBtn fixed right-28 text-white h-12 disabled:bg-slate-500">GPT Search</button>
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

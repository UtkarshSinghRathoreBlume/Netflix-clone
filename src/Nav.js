import React, { useEffect, useState } from 'react'
import "./Nav.css"
import ProfileDropDown from './ProfileDropDown';
import { Link } from 'react-router-dom';
import { AVATAR_IMG, NAV_NETFLIX_LOGO } from './utils/constants';

const Nav = () => {

    const [show, setShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false)

    const transitionNavBar = () => {
        if(window.scrollY > 100 ) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }

    const handleDropdown = (e) => {
        e.stopPropagation()
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        window.addEventListener('scroll',transitionNavBar);
        return () => {
            window.removeEventListener('scroll', transitionNavBar);
        }
    }, [])

  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <div className='nav__contents'>
            <Link to="/"><img className='nav__logo' src={NAV_NETFLIX_LOGO} alt='' /></Link>
            <img onClick={(e)=>handleDropdown(e)}  className='nav__avatar' src={AVATAR_IMG}></img>
            {showDropdown ? <i className='nav__upIcon' /> : <i className='nav__downIcon' /> }

        </div>
        {showDropdown && <ProfileDropDown />}
    </div>
  )
}

export default Nav
import React, { useEffect, useState } from 'react'
import "./Nav.css"
import ProfileDropDown from './ProfileDropDown';
import { Link } from 'react-router-dom';

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
            <Link to="/"><img className='nav__logo' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' alt='' /></Link>
            <img onClick={(e)=>handleDropdown(e)}  className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'></img>
            {showDropdown ? <i className='nav__upIcon' /> : <i className='nav__downIcon' /> }

        </div>
        {showDropdown && <ProfileDropDown />}
    </div>
  )
}

export default Nav
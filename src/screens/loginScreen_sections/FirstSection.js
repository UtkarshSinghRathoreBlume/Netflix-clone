import React from 'react'
import "./FirstSection.css"

const FirstSection = () => {
  return (
    <div className='firstSection'>
        <div className='firstSection__leftSide'>
            <h1>Enjoy on your TV</h1>
            <h3>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more. </h3>
        </div>
        <div className='firstSection__rightSide'>
          <div >

              <video autoPlay playsInline muted loop src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v'></video>

          </div>
        </div>
    </div>
  )
}

export default FirstSection
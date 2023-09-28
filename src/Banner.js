import React, { useEffect, useState } from 'react'
import "./Banner.css"
import axios from 'axios'
import requests from './Request'
import { useSelector } from 'react-redux'
import VideoBackground from './components/VideoBackground'
import VideoTitle from './components/VideoTitle'

const Banner = () => {

    let MainMovie = {}

    const movies = useSelector(store => store.movies?.nowPlayingMovies)

    if(!movies) {
        return
    }
    else {
         MainMovie = movies[Math.floor(Math.random()*20)]
    }

    const {original_title, overview, id} = MainMovie
    
    


  return (
    <header className=' h-full w-screen aspect-video relative' >
        

        <VideoTitle title = {original_title} overview = {overview}/>
        <VideoBackground movieId={id}/>
        
    

    <div className='banner--fadeBottom absolute bottom-0' />
    </header>
  )
}

export default Banner
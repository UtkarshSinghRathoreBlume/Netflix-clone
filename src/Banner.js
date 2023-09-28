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
         MainMovie = movies[0]
        console.log(MainMovie)
    }

    const {original_title, overview} = MainMovie
    


  return (
    <header className='banner' >
        

        <VideoTitle title = {original_title} overview = {overview}/>
        <VideoBackground/>
        
    

    <div className='banner--fadeBottom' />
    </header>
  )
}

export default Banner
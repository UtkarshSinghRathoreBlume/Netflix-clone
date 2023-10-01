import React, { useEffect } from "react";
import "./VideoTitle.css";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import "./VideoBackground.css"

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId)
  const trailerVideoKey = useSelector(store=> store.movies?.trailerVideo)

  useEffect(()=> {
    
  },[movieId])


  return (
    <div className="w-screen">
      <iframe className="md:-mt-20 w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideoKey?.key}?autoplay=1&modestbranding=1&controls=0&mute=1&rel=0&showinfo=0&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

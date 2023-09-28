import React, { useEffect } from 'react'
import { truncate } from '../utils/commonFuncs'

const VideoTitle = ({title, overview}) => {

  return (
    <div className='flex flex-col justify-center w-screen aspect-video absolute px-12'>
        <h1 className='banner__title text-white'>{title}</h1>
        
        <p title={overview} className='banner__description text-white'>{truncate(overview,150)}</p>
        <div className='banner__button'>
            <button className='banner__button--active'>Play</button>
            <button className='banner__button--info'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle
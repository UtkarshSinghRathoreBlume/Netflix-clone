import React from 'react'
import { truncate } from '../utils/commonFuncs'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='banner__contents'>
        <h1 className='banner__title'>{title}</h1>
        <div className='banner__button'>
            <button className='banner__button--active'>Play</button>
            <button className='banner__button--info'>More Info</button>
        </div>
        <p title={overview} className='banner__description'>{truncate(overview,150)}</p>
    </div>
  )
}

export default VideoTitle
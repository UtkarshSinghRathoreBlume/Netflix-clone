
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../features/moviesSlice'
import { useEffect } from 'react'
import requests from '../Request'


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        getNowPlayingMovies()
    },[])
    
    const getNowPlayingMovies = async () => {
        const data = await axios.get(requests.fetNowPlaying).then(data => dispatch(addNowPlayingMovies(data.data.results)))
      }
}

export default useNowPlayingMovies
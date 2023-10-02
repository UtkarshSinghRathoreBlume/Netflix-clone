import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from 'axios';
import { base_url } from './utils/constants';
import Shimmer from './components/Shimmer';

const Row = ({title, fetchUrl, isLargeRow=false}) => {

    const [movies, setMovies] = useState(null);


    

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request
        }

        fetchData();
    },[fetchUrl]);


  return (
    <div className='row'>
        {
            movies ? 
            <>
                <h2>{title}</h2>
                <div className='row__posters'>
                    {movies.map(movie => (
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}/>)
                    ))}
                </div>

            </> : <Shimmer className="pt-36" />
        }
    </div>
  )
}

export default Row
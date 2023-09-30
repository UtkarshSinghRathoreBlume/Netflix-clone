import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovies } from '../../utils/commonFuncs'
import { addGptMovies } from '../../features/moviesSlice'
import { NO_IMAGE_PATH, base_url } from '../../utils/constants'

const SearchRow = ({results}) => {
  const isGptSearch = useSelector(store => store?.gptSearch.gptGptResultBtn)
  const gptSearchRes = useSelector(store => store?.gptSearch.gptResult)
  const [movies, setMovies] = useState(null)
  const [gptMovies, setGptMovies] = useState([])
  useEffect(() => {

      if(isGptSearch) {
        fetchGptMovies()
      }
    
      setMovies(results)
    
   
  },[results,gptSearchRes])

  const fetchGptMovies = async () => {
    const promiseArray = gptSearchRes.map((movie) => fetchAllMovies(movie))
    const tmdbResults = await Promise.all(promiseArray)
    setGptMovies(tmdbResults)
  }
 

  return (
    <div className='bg-black '>
          {!isGptSearch ? <div className='my-32 h-full text-white w-full flex flex-wrap flex-grow'>
                {results.map((data) => {
                  return(
                    <img className='mb-16 mt-16 h-72 mr-16' title={data.original_title} src={data.poster_path ? `${base_url}${data.poster_path}` : `${NO_IMAGE_PATH}`} alt='card_logo' />
                  )
                })}
                
            </div> : 
            <div className='my-32 h-full text-white w-full flex flex-wrap flex-grow'>
              {console.log(gptMovies)}
               {gptMovies.map(res => {
                  return res.results.map(data => {
                    return (
                    <img className='mb-16 mt-16 w-48 h-72 mr-16' title={data.original_title} src={data.poster_path ? `${base_url}${data.poster_path}` : `${NO_IMAGE_PATH}`} alt='card_logo' />
                  )
                    })})}
            </div>
}
        
    </div>
  )
}

export default SearchRow
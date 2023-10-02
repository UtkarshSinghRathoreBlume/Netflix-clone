import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovies } from '../../utils/commonFuncs'
import { addGptMovies } from '../../features/moviesSlice'
import { NO_IMAGE_PATH, base_url } from '../../utils/constants'
import "./SearchRow.css"
import Shimmer from '../../components/Shimmer'

const SearchRow = ({ results }) => {
  const isGptSearch = useSelector(store => store?.gptSearch.gptGptResultBtn)
  const gptSearchRes = useSelector(store => store?.gptSearch.gptResult)
  const [movies, setMovies] = useState(null)
  const [gptMovies, setGptMovies] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  let tmdbResults = null
  useEffect(() => {

    if (isGptSearch) {
      fetchGptMovies()
    }

    setMovies(results)


  }, [isGptSearch, results, gptSearchRes])

  const fetchGptMovies = async () => {
    console.log("hi")
    setShowLoader(true)
    const promiseArray = await gptSearchRes?.map((movie) => fetchAllMovies(movie))
    if (promiseArray) {
      tmdbResults = await Promise.all(promiseArray)
      setGptMovies(tmdbResults)
      setShowLoader(false)

    }
  }


  return (
    <div className='bg-black '>
      {!isGptSearch ?
         showLoader ? <Shimmer /> : <div className='searchRow__container my-32 h-full text-white w-full flex flex-wrap flex-grow'>
          {results.map((data) => {
            return (
              <img className='mb-16 mt-16 h-72 mr-16' title={data.original_title} src={data.poster_path ? `${base_url}${data.poster_path}` : `${NO_IMAGE_PATH}`} alt='card_logo' />
            )
          })}
      
                
            </div> :
      <div className='searchRow__container my-32 h-full text-white w-full flex flex-wrap flex-grow'>
        {showLoader || gptMovies == [] ? 
        <div className='pt-28'>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        </div> : gptMovies?.map(res => {
          return res.results.map(data => {
            return (
              <img className='mb-16 mt-16 w-48 h-72 mr-16' title={data.original_title} src={data.poster_path ? `${base_url}${data.poster_path}` : `${NO_IMAGE_PATH}`} alt='card_logo' />
            )
          })
        })}
      </div>
}
    </div>
      
  )
}

export default SearchRow
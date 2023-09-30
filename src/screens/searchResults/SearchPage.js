import React, { useEffect, useState } from 'react'
import { fetchAllMovies, gptResults } from '../../utils/commonFuncs'
import { useDispatch, useSelector } from 'react-redux'
import SearchRow from './SearchRow'
import { addGptMovies } from '../../features/moviesSlice'

const SearchPage = () => {
    const dispatch = useDispatch()

    const searchQuery = useSelector(store => store?.movies?.searchMovies)
    const isGptBtn = useSelector(store => store?.movies?.gptGptResultBtn)
    const gptMoviesSearch = useSelector(store => store?.movies?.gptMovies)
    const gptMoviesResults = useSelector(store => store?.movies?.gptResult)
  
    const [results,setResults] = useState([])

    useEffect(()=> {
        if(searchQuery) {

            fetchAllMovies(searchQuery).then(data => setResults(data.results))
            // gptResults(searchQuery).then(data => console.log(data))        
        }
    },[searchQuery])

    const fetchTmdbResultsArray = async () => {
        console.log("hi")
        const promiseArray = gptMoviesResults?.map((movie) => fetchAllMovies(movie))
        const tmdbResult = await Promise.all(promiseArray)
        return tmdbResult
      
    }

  return (
    <div className='bg-black h-full'>
        <SearchRow results={results} isGptBtn = {isGptBtn} gptMoviesResults = { gptMoviesSearch} gptMoviesSearch = {gptMoviesResults}/>
    </div>
  )
}

export default SearchPage
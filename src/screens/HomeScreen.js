import React from 'react'
import "./HomeScreen.css"
import Nav from '../Nav'
import Banner from '../Banner'
import requests from '../Request'
import Row from '../Row'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import { useSelector } from 'react-redux'
import SearchPage from './searchResults/SearchPage'

const HomeScreen = () => {
  const searchParams = useSelector(store => store?.movies?.searchMovies)

  useNowPlayingMovies()

  return (
    <div className='homeScreen'>
        <Nav></Nav>
        {!searchParams ? 
        <>
        <Banner />
        <div className="-mt-32 relative z-20">
          
          <Row  
            title='Trending Now'
            fetchUrl={requests.fetchTrending} />
            <Row 
            title='NETFLIX ORIGIGNALS'
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
            <Row 
            title='Top Rated'
            fetchUrl={requests.fetchTopRated} />
            <Row 
            title='Action Movies'
            fetchUrl={requests.fetchActionMovies} />
            <Row 
            title='Comedy Movies'
            fetchUrl={requests.fetchComedyMovies} />
            <Row 
            title='Horror Movies'
            fetchUrl={requests.fetchHorrorMovies} />
            <Row 
            title='Romance Movies'
            fetchUrl={requests.fetchRomanceMovies} />
            <Row 
            title='Documentaries'
            fetchUrl={requests.fetchDocumentaries} />
        </div>
        </>
        :
        <>
          <SearchPage />
        </>
        }

        
    </div>
  )
}

export default HomeScreen
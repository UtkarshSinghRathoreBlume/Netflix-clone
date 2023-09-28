import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies: null,
        trailerVideo: null,
        searchMovies: null
    },
    reducers: {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo : (state, action) => {
            state.trailerVideo = action.payload
        },
        addSearchMovies : (state, action) => {
            state.searchMovies = action.payload
        }
    }
})

export const {addNowPlayingMovies, addTrailerVideo, addSearchMovies} = moviesSlice.actions


export default moviesSlice.reducer
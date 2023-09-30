import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userReducer from "../features/userSlice"
import moviesReducer from "../features/moviesSlice"
import gptReducer from "../features/gptSlice"


export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gptSearch: gptReducer
  },
});

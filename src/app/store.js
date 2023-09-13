import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userReducer from "../features/userSlice"


export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

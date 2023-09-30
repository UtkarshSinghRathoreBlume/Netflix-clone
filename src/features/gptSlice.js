import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gptSlice",
    initialState: {
        gptResult : null,
        gptGptResultBtn : false,
        gptMovies : null
    },
    reducers : {
        addGptResult : (state, action) => {
            state.gptResult = action.payload
        },
        addGptResultBtn : (state, action) => {
            state.gptGptResultBtn = action.payload
        },
        addGptMovies : (state, action) => {
            state.gptMovies = action.payload
        }
    }
})
    export const {addGptResult, addGptResultBtn, addGptMovies} = gptSlice.actions

    export default gptSlice.reducer
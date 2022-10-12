// 1. configureStore 로 스토어 생성
import { createAsyncThunk, configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const mode = createSlice({
    name: 'mode change',
    initialState: false, // state 초기값 initialState
    reducers: { // setState 함수들을 모아놓기 reducers
        change: state => !state //함수 이름 : action
    }
})



const { change } = mode.actions;
export { change }


const numChange = createSlice({
    name: 'number change',
    initialState: 1,
    reducers: {
        up: (state, action) => {
            return state + action.payload
        }
    }
})

const { up } = numChange.actions;
export { up }


const arryIncreace = createSlice({
    name: 'object change',
    initialState: [],
    reducers: {
        setList: (state, action) => {
            state = state.push(action.payload)
            //return state = state.push(action.payload)
            //return [...state, action.payload]
        }
    }
});

export const { setList } = arryIncreace.actions;



// axios 사용 외부값 받아오기...
const getData = createAsyncThunk(
    'movie',
    async () => {
        const res = await axios.get('https://yts.mx/api/v2/list_movies.json?limit=5&page=1')
        return res.data
    }
)
export { getData }

const movieData = createSlice({
    name: 'movie data',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
            state = action.payload
        }
    }
})



const store = configureStore({
    reducer: {
        mode: mode.reducer,
        numChange: numChange.reducer,
        arryIncreace: arryIncreace.reducer,
        movieData: movieData.reducer
    }
});

export default store
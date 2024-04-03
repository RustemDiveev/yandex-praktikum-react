import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    urlArray: [],
    previousUrl: "",
    currentUrl: ""

}

const routeHistorySlice = createSlice({
    name: "routeHistory",
    initialState,
    reducers: {
        logUrl: {
            reducer(state, action) {
                state.urlArray.push(action.payload)
                state.previousUrl = state.currentUrl
                state.currentUrl = action.payload
            }
        }
    }
})

export const { logUrl } = routeHistorySlice.actions 

export default routeHistorySlice.reducer

export const selectPreviousUrl = state => state.routeHistory.previousUrl 
export const selectCurrentUrl = state => state.routeHistory.currentUrl
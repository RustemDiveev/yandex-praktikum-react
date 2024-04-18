import { createSlice } from "@reduxjs/toolkit"


type tOrder = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
}

type tOrderHistoryState = {
    wsConnected: boolean,
    error?: Event,
    orderHistory: {
        success: boolean,
        orders: tOrder[],
        total: number,
        totalToday: number
    }
}

const initialState: tOrderHistoryState = {
    wsConnected: false,
    orderHistory: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    }
}

export const orderHistorySlice = createSlice({
    name: "orderHistory",
    initialState, 
    reducers: {
        connectionSuccess(state) {
            state.error = undefined
            state.wsConnected = true
        },
        connectionError(state, action) {
            state.error = action.payload
            state.wsConnected = false 
        },
        connectionClosed(state) {
            state.error = undefined 
            state.wsConnected = false 
        },
        connectionGetMessage(state, action) {
            state.error = undefined
            state.orderHistory.success = action.payload.success 
            state.orderHistory.orders = [...state.orderHistory.orders, action.payload.orders]
            state.orderHistory.total = action.payload.total 
            state.orderHistory.totalToday = action.payload.totalToday
        }
    }    
})

export const {
    connectionSuccess, 
    connectionError, 
    connectionClosed, 
    connectionGetMessage
} = orderHistorySlice.actions 

export default orderHistorySlice.reducer

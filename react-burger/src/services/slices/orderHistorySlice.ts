import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"
import requestApi from "../../utils/api"
import { getOrderDetailUrl } from "../../settings/urls"


export type TOrder = {
    ingredients: string[],
    _id: string,
    name: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
}

export type TOrderDetailResponse = {
    success: boolean,
    orders: TOrder[]
}

export type TOrderHistoryState = {
    wsConnected: boolean,
    error?: Event,
    orderHistory: {
        success: boolean,
        orders: TOrder[],
        total: number,
        totalToday: number
    }
    selectedOrder: TOrder | null
}

export const initialState: TOrderHistoryState = {
    wsConnected: false,
    orderHistory: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    selectedOrder: null,
}

export const fetchSelectedOrder = createAsyncThunk(
    "orderHistory/fetchSelectedOrder",
    async (number: string) => await requestApi<TOrderDetailResponse>(getOrderDetailUrl(number))
)

export const orderHistorySlice = createSlice({
    name: "orderHistory",
    initialState, 
    reducers: {
        connectionStart(state, action: PayloadAction<string>) {},
        connectionClose() {},
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
            state.orderHistory.orders = action.payload.orders
            state.orderHistory.total = action.payload.total 
            state.orderHistory.totalToday = action.payload.totalToday
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSelectedOrder.fulfilled, (state, action) => {
            state.selectedOrder = action.payload.orders[0] ?? null
        })
    },    
})

export const {
    connectionStart,
    connectionClose,
    connectionSuccess, 
    connectionError, 
    connectionClosed, 
    connectionGetMessage
} = orderHistorySlice.actions 

export type TWsActions = {
    wsInit: typeof connectionStart
    wsClose: typeof connectionClose
    wsSuccess: typeof connectionSuccess
    wsError: typeof connectionError
    wsClosed: typeof connectionClosed
    wsGetMessage: typeof connectionGetMessage
}   

export default orderHistorySlice.reducer

export const selectOrders = (state: RootState) => state.orderHistory.orderHistory.orders 
export const selectSuccess = (state: RootState) => state.orderHistory.orderHistory.success 
export const selectTotal = (state: RootState) => state.orderHistory.orderHistory.total
export const selectTotalToday = (state: RootState) => state.orderHistory.orderHistory.totalToday
export const selectOrderByNumber = (state: RootState, number: number) => {
    return state.orderHistory.orderHistory.orders.find(order => order.number === number)
}
export const selectSelectedOrder = (state: RootState) => state.orderHistory.selectedOrder

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ORDERS_URL } from "../../settings/urls";
import requestApi from "../../utils/api";


export const postOrder = createAsyncThunk(
    "order/postOrder",
    async (ingredientsIds) => {
        const response = await requestApi(
            ORDERS_URL, 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(ingredientsIds)
            }
        )
        const responseJson = await response.json()
        const status = await responseJson.success 
        const orderNumber = responseJson.order.number 
        return {status, orderNumber}
    }
)

const initialState = {
    status: "",
    orderNumber: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postOrder.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.orderNumber = action.payload.orderNumber
                if (!action.payload.status) {
                    throw new Error('Запрос на формирование заказа вернул ошибку') 
                }
            })
    }
})

export default orderSlice.reducer

export const selectStatus = state => state.order.status 
export const selectOrderNumber = state => state.order.orderNumber
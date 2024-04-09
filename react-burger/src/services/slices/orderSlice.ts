import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ORDERS_URL } from "../../settings/urls";
import requestApi from "../../utils/api";
import { RootState } from "../store";


export const postOrder = createAsyncThunk(
    "order/postOrder",
    async (ingredientsIds: {ingredients: string[]}) => {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        headers.set("Authorization", localStorage.getItem("accessToken")!)
        const response = await requestApi(
            ORDERS_URL, 
            {
                method: "POST",
                headers,
                body: JSON.stringify(ingredientsIds)
            }
        )
        const status = response.success 
        const orderNumber = response.order.number 
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

export const selectStatus = (state: RootState) => state.order.status 
export const selectOrderNumber = (state: RootState) => state.order.orderNumber
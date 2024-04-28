import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ORDERS_URL } from "../../settings/urls";
import requestApi from "../../utils/api";
import { RootState } from "../store";
import IIngredient from "../../interfaces/Ingredient";

type TPostOrderResponse = {
    name: string,
    order: {
        createdAt: string,
        ingredients: IIngredient[],
        name: string,
        number: number,
        owner: {
            name: string,
            email: string,
            createdAt: string,
            updatedAt: string
        },
        price: number,
        status: string,
        updatedAt: string,
        _id: string
    },
    success: boolean
}

interface IOrderState {
    orderNumber: null | number
}

export const postOrder = createAsyncThunk(
    "order/postOrder",
    async (ingredientsIds: {ingredients: string[]}) => {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        headers.set("Authorization", localStorage.getItem("accessToken")!)
        const response = await requestApi<TPostOrderResponse>(
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

const initialState: IOrderState = {
    orderNumber: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.orderNumber
                if (!action.payload.status) {
                    throw new Error('Запрос на формирование заказа вернул ошибку') 
                }
            })
    }
})

export default orderSlice.reducer

export const selectOrderNumber = (state: RootState) => state.order.orderNumber
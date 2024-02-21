import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { INGREDIENTS_URL } from "../../settings/urls";


const initialState = {
    ingredients: []
}

const fetchIngredients = createAsyncThunk(
    "ingredients/fetch",
    async () => {
        const response = await fetch(INGREDIENTS_URL)
        const responseJson = await response.json()

    }
)

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {}
})
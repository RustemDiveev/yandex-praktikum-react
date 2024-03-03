import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { INGREDIENTS_URL } from "../../settings/urls";


const initialState = {
    ingredients: [],
    success: null,
    selectedIngredient: {
        id: null,
        image_large: "",
        name: "",
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0
    }
}

export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => {
        const response = await fetch(INGREDIENTS_URL)
        const responseJson = response.json()
        return responseJson
    }
)

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        ingredientSelected: {
            reducer(state, action) {
                state.selectedIngredient = state.ingredients.find(
                    ingredient => ingredient._id === action.payload.ingredientId
                )
            },
            prepare(ingredientId) {
                return {
                    payload: {
                        ingredientId
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload.data
            state.success = action.payload.success
            if (!action.payload.success) {
                throw new Error("Запрос к данным вернул ошибку")
            }
        })
    }
})

export const { ingredientSelected } = ingredientsSlice.actions

export default ingredientsSlice.reducer 

export const selectIngredients = state => state.ingredients.ingredients

export const selectStatus = state => state.ingredients.status

export const selectSelectedIngredient = state => state.ingredients.selectedIngredient
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bun: {},
    ingredients: []
}

const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        ingredientAdded: {
            reducer(state, action) {
                if (action.payload.ingredient.type === "bun") {
                    state.bun = action.payload.ingredient
                } else {
                    state.ingredients.push(action.payload.ingredient)
                }
            },
            prepare(ingredient) {
                return {
                    payload: {ingredient}
                }
            }
        },
    }
})

export const { ingredientAdded } = constructorSlice.actions

export default constructorSlice.reducer 

export const selectIngredients = state => state.constructor.ingredients
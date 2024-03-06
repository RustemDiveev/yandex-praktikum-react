import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ingredients: [],
    bun: null,
}

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        ingredientAdded: {
            reducer(state, action) {
                if (action.payload.ingredient.ingredient.type === "bun") {
                    state.bun = action.payload.ingredient.ingredient
                } else {
                    state.ingredients.push(action.payload.ingredient.ingredient)
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

export const selectIngredients = state => state.burgerConstructor.ingredients
export const selectBun = state => state.burgerConstructor.bun
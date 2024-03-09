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
        ingredientDeleted: {
            reducer(state, action) {
                state.ingredients.splice(action.payload, 1)
            },
        },
        reorderIngredients: {
            reducer(state, action) {
                const draggedIndex = action.payload.draggedIndex
                const dropIndex = action.payload.dropIndex
                const temp = state.ingredients[draggedIndex]
                state.ingredients[draggedIndex] = state.ingredients[dropIndex]
                state.ingredients[dropIndex] = temp
            },
            prepare(draggedIndex, dropIndex) {
                return {payload: {draggedIndex: draggedIndex.index, dropIndex}}
            }
        }
    }
})

export const { ingredientAdded, ingredientDeleted, reorderIngredients } = constructorSlice.actions

export default constructorSlice.reducer 

export const selectIngredients = state => state.burgerConstructor.ingredients
export const selectBun = state => state.burgerConstructor.bun
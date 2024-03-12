import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"


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
                    state.ingredients.push({
                        ...action.payload.ingredient.ingredient, 
                        uniqueId: action.payload.uniqueId
                    })
                }
            },
            prepare(ingredient) {
                return {
                    payload: {
                        ingredient,
                        uniqueId: uuidv4()
                    }
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
                const draggedId = action.payload.draggedId
                const droppedId = action.payload.droppedId
                const draggedIndex = state.ingredients.findIndex(
                    elem => elem.uniqueId === draggedId
                )
                const droppedIndex = state.ingredients.findIndex(
                    elem => elem.uniqueId === droppedId
                )
                const temp = state.ingredients[draggedIndex]
                state.ingredients[draggedIndex] = state.ingredients[droppedIndex]
                state.ingredients[droppedIndex] = temp
            },
            prepare(draggedId, droppedId) {
                return {payload: {draggedId: draggedId.uniqueId, droppedId}}
            }
        }
    }
})

export const { ingredientAdded, ingredientDeleted, reorderIngredients } = constructorSlice.actions

export default constructorSlice.reducer 

export const selectIngredients = state => state.burgerConstructor.ingredients
export const selectBun = state => state.burgerConstructor.bun
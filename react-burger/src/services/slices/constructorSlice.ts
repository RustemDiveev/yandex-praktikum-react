import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

import { IIngredient } from "../../interfaces/ingredient"

interface IState {
    ingredients: IIngredient[]
    bun: null | IIngredient
}


const initialState = {
    ingredients: [],
    bun: null,
}

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        ingredientAdded: {
            reducer(state: IState, action: {payload: {ingredient: {ingredient: IIngredient}, uniqueId: string}}) {
                if (action.payload.ingredient.ingredient.type === "bun") {
                    state.bun = action.payload.ingredient.ingredient
                } else {
                    state.ingredients.push({
                        ...action.payload.ingredient.ingredient, 
                        uniqueId: action.payload.uniqueId
                    })
                }
            },
            prepare(ingredient: {ingredient: IIngredient}): {payload: {ingredient: {ingredient: IIngredient}, uniqueId: string}} {
                return {
                    payload: {
                        ingredient,
                        uniqueId: uuidv4()
                    }
                }
            }
        },
        ingredientDeleted: {
            reducer(state: {ingredients: IIngredient[]}, action: {payload: number}) {
                state.ingredients.splice(action.payload, 1)
            },
            prepare(uniqueId: number) {
                return {payload: uniqueId}
            }
        },
        reorderIngredients: {
            reducer(state, action: {payload: {draggedId: string, droppedId: string}}) {
                const draggedId = action.payload.draggedId
                const droppedId = action.payload.droppedId
                const draggedIndex = state.ingredients.findIndex((elem: IIngredient) => elem.uniqueId === draggedId)
                const droppedIndex = state.ingredients.findIndex((elem: IIngredient) => elem.uniqueId === droppedId)
                const temp = state.ingredients[draggedIndex]
                state.ingredients[draggedIndex] = state.ingredients[droppedIndex]
                state.ingredients[droppedIndex] = temp
            },
            prepare(draggedId: {uniqueId: string}, droppedId: string): {payload: {draggedId: string, droppedId: string}} {
                return {payload: {draggedId: draggedId.uniqueId, droppedId}}
            }
        }
    }
})

export const { ingredientAdded, ingredientDeleted, reorderIngredients } = constructorSlice.actions

export default constructorSlice.reducer 

export const selectIngredients = (state: {burgerConstructor: IState}) => state.burgerConstructor.ingredients
export const selectBun = (state: {burgerConstructor: IState}) => state.burgerConstructor.bun
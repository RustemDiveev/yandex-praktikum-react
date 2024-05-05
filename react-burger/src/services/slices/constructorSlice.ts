import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

import { RootState } from "../store";
import IIngredient from "../../interfaces/Ingredient"


interface IConstructorState {
    ingredients: IIngredient[],
    bun: null | IIngredient
}


export const initialState: IConstructorState = {
    ingredients: [],
    bun: null,
}

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        ingredientAdded: {
            reducer(state, action: PayloadAction<{ingredient: IIngredient, uniqueId: string}, string>) {
                if (action.payload.ingredient.type === "bun") {
                    state.bun = action.payload.ingredient
                } else {
                    state.ingredients.push({
                        ...action.payload.ingredient, 
                        uniqueId: action.payload.uniqueId
                    })
                }
            },
            prepare(ingredient) {
                return {payload: {ingredient, uniqueId: uuidv4()}}
            }
        },
        ingredientDeleted: {
            reducer(state, action: PayloadAction<{uniqueId: string}>) {            
                state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload.uniqueId)
            },
            // Если я убираю, то не понятно как избавиться от Typescript-ошибки, подскажите, пожалуйста
            prepare(uniqueId) {
                return {payload: {uniqueId}}
            }
        },
        reorderIngredients: {
            reducer(state, action: PayloadAction<{draggedId: string, droppedId: string}>) {
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
            prepare(payload) {
                return {
                    payload: {
                        draggedId: payload.draggedId.uniqueId,
                        droppedId: payload.droppedId
                    }
                }
            }
        }
    }
})

export const { ingredientAdded, ingredientDeleted, reorderIngredients } = constructorSlice.actions


export default constructorSlice.reducer 

export const selectIngredients = (state: RootState) => state.burgerConstructor.ingredients
export const selectBun = (state: RootState) => state.burgerConstructor.bun
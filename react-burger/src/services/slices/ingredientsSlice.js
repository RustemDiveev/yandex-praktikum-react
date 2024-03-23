import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { INGREDIENTS_URL } from "../../settings/urls";

import requestApi from "../../utils/api";


// helpers 
// Возвращает массив идентификаторов всех типов булок
const getBuns = (state) => state.ingredients
    .filter(ingredient => ingredient.type === "bun")
    .map(ingredient => ingredient._id)


const initialState = {
    ingredients: [],
    success: null,
    selectedIngredient: null,
    counter: {}
}

export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => {
        const response = await requestApi(INGREDIENTS_URL)
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
                return {payload: {ingredientId}}
            }
        },
        ingredientUnselected: {
            reducer(state, action) {
                state.selectedIngredient = null
            }
        },
        counterIncreased: {
            reducer(state, action) {
                const buns = getBuns(state)
                const ingredientId = action.payload.ingredientId
                if (buns.length > 0 && buns.includes(ingredientId)) {
                    // Если уже существует другой идентификатор булки равный единице, то удаляем его
                    // и сеттим текущий в 1 
                    const anotherBuns = buns.filter(id => id !== ingredientId)
                    const anotherBunId = anotherBuns.find(bun => state.counter[bun] === 1)
                    if (anotherBunId) state.counter[anotherBunId] = 0
                    state.counter[action.payload.ingredientId] = 1
                } else {
                    if (state.counter[action.payload.ingredientId]) {
                        state.counter[action.payload.ingredientId] += 1
                    } else {
                        state.counter[action.payload.ingredientId] = 1
                    }
                }
            },
            prepare(ingredientId) {
                return {payload: {ingredientId}}                   
            }
        },
        counterDecreased: {
            reducer(state, action) {
                state.counter[action.payload] -= 1
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data
                state.success = action.payload.success
            })
    }
})

export const { 
    ingredientSelected, 
    ingredientUnselected, 
    counterIncreased,
    counterDecreased,
} = ingredientsSlice.actions

export default ingredientsSlice.reducer 

export const selectIngredients = state => state.ingredients.ingredients
export const selectStatus = state => state.ingredients.status
export const selectSelectedIngredient = state => state.ingredients.selectedIngredient
export const selectCounter = state => state.ingredients.counter
export const selectIngredient = (state, ingredientId) => {
    return state.ingredients.success ? state.ingredients.ingredients.find(ingredient => ingredient._id === ingredientId) : null
}
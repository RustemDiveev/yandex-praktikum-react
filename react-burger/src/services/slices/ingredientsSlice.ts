import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { INGREDIENTS_URL } from "../../settings/urls";

import requestApi from "../../utils/api";
import { RootState } from "../store";
import IIngredient from "../../interfaces/Ingredient"
import { TServerResponse } from "../../utils/api";


type TFetchIngredientsResponse = TServerResponse<{
    data: IIngredient[]
}>

interface IIngredientsState {
    ingredients: IIngredient[],
    success: null | boolean,
    counter: {[key: string]: number},
    ingredientsLoaded: boolean,
}   

// helpers 
// Возвращает массив идентификаторов всех типов булок
const getBuns = (state: IIngredientsState) => state.ingredients
    .filter(ingredient => ingredient.type === "bun")
    .map(ingredient => ingredient._id)


const initialState: IIngredientsState = {
    ingredients: [],
    success: null,
    counter: {},
    ingredientsLoaded: false,
}

export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => {
        return await requestApi<TFetchIngredientsResponse>(INGREDIENTS_URL)
    }
)

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        counterIncreased: {
            reducer(state, action: PayloadAction<{ingredientId: string}>) {
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
            reducer(state, action: PayloadAction<string>) {
                state.counter[action.payload] -= 1
            },
            prepare(ingredientId) {
                return {payload: ingredientId}
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data
                state.success = action.payload.success
                state.ingredientsLoaded = true
            })
    }
})

export const { 
    counterIncreased,
    counterDecreased,
} = ingredientsSlice.actions

export default ingredientsSlice.reducer 

export const selectIngredients = (state: RootState) => state.ingredients.ingredients
export const selectCounter = (state: RootState) => state.ingredients.counter
export const selectIngredient = (state: RootState, ingredientId: string) => {
    return state.ingredients.success ? state.ingredients.ingredients.find(ingredient => ingredient._id === ingredientId) : null
}
export const selectIngredientsLoaded = (state: RootState) => state.ingredients.ingredientsLoaded
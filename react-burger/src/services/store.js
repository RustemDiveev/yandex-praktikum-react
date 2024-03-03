import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./slices/ingredientsSlice";


export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer
    },
})

export default store;
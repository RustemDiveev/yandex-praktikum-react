import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";


export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
    },
})

export default store;
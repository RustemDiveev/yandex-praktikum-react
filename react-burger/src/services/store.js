import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";


export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer
    },
})

export default store;
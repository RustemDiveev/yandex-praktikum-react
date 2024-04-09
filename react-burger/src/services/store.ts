import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        ingredients:        ingredientsReducer,
        burgerConstructor:  constructorReducer,
        order:              orderReducer,
        user:               userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import routeHistoryReducer from "./slices/routeHistorySlice";


export const store = configureStore({
    reducer: {
        ingredients:        ingredientsReducer,
        burgerConstructor:  constructorReducer,
        order:              orderReducer,
        user:               userReducer,
        routeHistory:       routeHistoryReducer,
    },
})

export default store;
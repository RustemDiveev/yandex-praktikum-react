import { configureStore } from "@reduxjs/toolkit";

import { socketMiddleware } from "./middlewares/socketMiddleware";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import orderHistoryReducer from "./slices/orderHistorySlice"


export const store = configureStore({
    reducer: {
        ingredients:        ingredientsReducer,
        burgerConstructor:  constructorReducer,
        order:              orderReducer,
        user:               userReducer,
        orderHistory:       orderHistoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware("wss://norma.nomoreparties.space/orders"))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
import { configureStore } from "@reduxjs/toolkit";

import { socketMiddleware } from "./middlewares/socketMiddleware";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import orderHistoryReducer from "./slices/orderHistorySlice"
import {
    connectionStart, 
    connectionClose, 
    connectionSuccess, 
    connectionError, 
    connectionClosed, 
    connectionGetMessage,
    TWsActions
} from "../services/slices/orderHistorySlice"
import {
    ingredientAdded,
    ingredientDeleted,
    reorderIngredients
} from "../services/slices/constructorSlice"
import {
    counterIncreased,
    counterDecreased,
} from "../services/slices/ingredientsSlice"


export type TAppActions = {
    type: typeof connectionStart.type
    | typeof connectionClose.type
    | typeof connectionSuccess.type
    | typeof connectionError.type
    | typeof connectionClosed.type
    | typeof connectionGetMessage.type
    | typeof ingredientAdded.type
    | typeof ingredientDeleted.type
    | typeof reorderIngredients.type
    | typeof counterIncreased.type
    | typeof counterDecreased.type,
    payload?: any
}


export const wsActions: TWsActions = {
    wsInit: connectionStart,
    wsClose: connectionClose,
    wsSuccess: connectionSuccess,
    wsError: connectionError,
    wsClosed: connectionClosed,
    wsGetMessage: connectionGetMessage
}

export const store = configureStore({
    reducer: {
        ingredients:        ingredientsReducer,
        burgerConstructor:  constructorReducer,
        order:              orderReducer,
        user:               userReducer,
        orderHistory:       orderHistoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware(wsActions))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
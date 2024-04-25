import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../store";

import {
    connectionStart,
    connectionClose,
    connectionSuccess, 
    connectionError, 
    connectionClosed, 
    connectionGetMessage
} from "../slices/orderHistorySlice"

export type wsActions = typeof connectionStart
    | typeof connectionClosed 
    | typeof connectionError 
    | typeof connectionSuccess 
    | typeof connectionGetMessage
    | typeof connectionClose

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null 
        
        // При подстановке wsActions не дает вытащить payload - не разобрался, что именно надо сделать
        return next => (action: any) => {
            const {dispatch} = store 
            if (action.type === "orderHistory/connectionStart") {
                socket = new WebSocket(action.payload)                
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch(connectionSuccess())
                }
                socket.onerror = event => {
                    dispatch(connectionError(event))
                }
                socket.onclose = event => {
                    dispatch(connectionClosed())
                }
                socket.onmessage = event => {
                    const { data } = event 
                    const parsedData = JSON.parse(data)
                    dispatch(connectionGetMessage(parsedData))
                }

                if (action.type === "orderHistory/connectionClose") socket.close()
            }

            next(action)
        }
    }) as Middleware
}
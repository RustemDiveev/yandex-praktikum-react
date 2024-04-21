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

        return next => (action: wsActions) => {
            const {dispatch} = store 
            const { type } = action 
            if (type === "orderHistory/connectionStart") {
                socket = new WebSocket(`${wsUrl}`)
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

                if (type === "orderHistory/connectionClose") socket.close()
            }

            next(action)
        }
    }) as Middleware
}
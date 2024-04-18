import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../store";

import {
    connectionSuccess, 
    connectionError, 
    connectionClosed, 
    connectionGetMessage
} from "../slices/orderHistorySlice"

export type wsActions = typeof connectionClosed 
    | typeof connectionError 
    | typeof connectionSuccess 
    | typeof connectionGetMessage

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null 

        return next => (action: wsActions) => {
            const {dispatch, getState} = store 
            const { type } = action 
            const { user } = getState().user

            socket = new WebSocket(`${wsUrl}?token=${localStorage.getItem("accessToken")}`)

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
            }

            next(action)
        }
    }) as Middleware
}
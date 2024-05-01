import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState, TAppActions } from "../store";

import type { TWsActions } from "../slices/orderHistorySlice";


export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null 
        
        return next => (action: TAppActions) => {
            const {dispatch} = store 
            const { wsInit, wsClose, wsClosed, wsSuccess, wsError, wsGetMessage} = wsActions
            if (action.type === wsInit.type) {
                socket = new WebSocket(action.payload)                
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsSuccess())
                }
                socket.onerror = event => {
                    dispatch(wsError(event))
                }
                socket.onclose = () => {
                    dispatch(wsClosed())
                }
                socket.onmessage = event => {
                    const { data } = event 
                    const parsedData = JSON.parse(data)
                    dispatch(wsGetMessage(parsedData))
                }
                
                // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
                if (action.type === wsClose.type && socket.readyState === 1) {
                    socket.close()
                }
            }

            next(action)
        }
    }) as Middleware
}
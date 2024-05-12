import {
    initialState,
    connectionSuccess,
    connectionError,
    connectionClosed,
    connectionGetMessage,
    selectOrders,
    selectSuccess,
    selectTotal,
    selectTotalToday,
    selectOrderByNumber,
    selectSelectedOrder,
} from "./orderHistorySlice"
import reducer from "./orderHistorySlice"

import mockOrderHistoryData from "./mocks/orderHistoryData"


test("should be equal to initialState", () => {
    expect(reducer(undefined, {type: "unknown"})).toEqual(initialState)
})

test("validate store on connectionSuccess", () => {
    const newStore = reducer(initialState, connectionSuccess())
    expect(newStore.error).toBeUndefined()
    expect(newStore.wsConnected).toBeTruthy()
})

test("validate store on connectionError", () => {
    const newStore = reducer(initialState, connectionError("Some Error"))
    expect(newStore.error).toEqual("Some Error")
    expect(newStore.wsConnected).toEqual(false)
})

test("validate store on connectionClosed", () => {
    const newStore = reducer(initialState, connectionClosed())
    expect(newStore.error).toBeUndefined()
    expect(newStore.wsConnected).toEqual(false)
})

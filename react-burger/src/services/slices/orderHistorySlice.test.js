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

test("validate store on connectionGetMessage", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    expect(newStore.error).toBeUndefined()
    expect(newStore.orderHistory.success).toEqual(mockOrderHistoryData.success)
    expect(newStore.orderHistory.orders).toEqual(mockOrderHistoryData.orders)
    expect(newStore.orderHistory.total).toEqual(mockOrderHistoryData.total)
    expect(newStore.orderHistory.totalToday).toEqual(mockOrderHistoryData.totalToday)
})

test("test selectOrders", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    expect(selectOrders({ orderHistory: newStore })).toEqual(mockOrderHistoryData.orders)
})

test("test selectSuccess", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    expect(selectSuccess({ orderHistory: newStore })).toEqual(mockOrderHistoryData.success)
})

test("test selectTotal", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    expect(selectTotal({ orderHistory: newStore })).toEqual(mockOrderHistoryData.total)
})

test("test selectTotalToday", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    expect(selectTotalToday({ orderHistory: newStore })).toEqual(mockOrderHistoryData.totalToday)
})

test("test selectOrderByNumber", () => {
    const newStore = reducer(initialState, connectionGetMessage(mockOrderHistoryData))
    const order = mockOrderHistoryData.orders[0]
    const orderNumber = order.orderNumber
    expect(selectOrderByNumber({ orderHistory: newStore }, orderNumber)).toEqual(mockOrderHistoryData.orderNumber)
})

test("test selectSelectedOrder", () => {
    const order = mockOrderHistoryData.orders[0]
    const newStore = {...initialState, selectedOrder: order}
    expect(selectSelectedOrder({ orderHistory: newStore })).toEqual(order)
})
import {
  initialState,
  selectOrderNumber
} from "./orderSlice"

import reducer from "./orderSlice"


test("should be equal to initialState", () => {
  expect(reducer(undefined, {type: "unknown"})).toEqual(initialState)
})

test("test selectOrderNumber", () => {
  const newStore = {...initialState, orderNumber: 24214}
  expect(selectOrderNumber({ order: newStore })).toEqual(24214)
})
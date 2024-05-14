import reducer from "./userSlice"
import { selectUser, initialState } from "./userSlice"


test("should be equal to initialState", () => {
  expect(reducer(undefined, {type: "unknown"})).toEqual(initialState)
})

test("should select user", () => {
  const user = {email: "test@mail.ru", name: "BLABLABLA"}
  const newStore = {...initialState, user}
  expect(selectUser({ user: newStore })).toEqual(user)
})
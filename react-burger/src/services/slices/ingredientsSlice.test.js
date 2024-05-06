import {
  initialState,
  fetchIngredients,
  counterIncreased,
  counterDecreased,
  selectIngredients,
  selectStatus,
  selectSelectedIngredient,
  selectCounter,
  selectIngredient,
  selectIngredientsLoaded
} from "../slices/ingredientsSlice"
import reducer from "../slices/ingredientsSlice"


test("should be equal to initialState", () => {
  expect(reducer(undefined, {type: "unknown"})).toEqual(
    {
      ingredients: [],
      success: null,
      selectedIngredient: null,
      counter: {},
      ingredientsLoaded: false,
      status: null
    }
  )
})



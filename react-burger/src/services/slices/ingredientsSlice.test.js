import {
  initialState,
  counterIncreased,
  counterDecreased,
  selectIngredients,
  selectCounter,
  selectIngredient,
  selectIngredientsLoaded
} from "../slices/ingredientsSlice"
import reducer from "../slices/ingredientsSlice"


const ingredients = [
  {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0943",
    "name": "Соус фирменный Space Sauce",
    "type": "sauce",
    "proteins": 50,
    "fat": 22,
    "carbohydrates": 11,
    "calories": 14,
    "price": 80,
    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093f",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0940",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093d",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0944",
    "name": "Соус традиционный галактический",
    "type": "sauce",
    "proteins": 42,
    "fat": 24,
    "carbohydrates": 42,
    "calories": 99,
    "price": 15,
    "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0945",
    "name": "Соус с шипами Антарианского плоскоходца",
    "type": "sauce",
    "proteins": 101,
    "fat": 99,
    "carbohydrates": 100,
    "calories": 100,
    "price": 88,
    "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0946",
    "name": "Хрустящие минеральные кольца",
    "type": "main",
    "proteins": 808,
    "fat": 689,
    "carbohydrates": 609,
    "calories": 986,
    "price": 300,
    "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0947",
    "name": "Плоды Фалленианского дерева",
    "type": "main",
    "proteins": 20,
    "fat": 5,
    "carbohydrates": 55,
    "calories": 77,
    "price": 874,
    "image": "https://code.s3.yandex.net/react/code/sp_1.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0948",
    "name": "Кристаллы марсианских альфа-сахаридов",
    "type": "main",
    "proteins": 234,
    "fat": 432,
    "carbohydrates": 111,
    "calories": 189,
    "price": 762,
    "image": "https://code.s3.yandex.net/react/code/core.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0949",
    "name": "Мини-салат Экзо-Плантаго",
    "type": "main",
    "proteins": 1,
    "fat": 2,
    "carbohydrates": 3,
    "calories": 6,
    "price": 4400,
    "image": "https://code.s3.yandex.net/react/code/salad.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa094a",
    "name": "Сыр с астероидной плесенью",
    "type": "main",
    "proteins": 84,
    "fat": 48,
    "carbohydrates": 420,
    "calories": 3377,
    "price": 4142,
    "image": "https://code.s3.yandex.net/react/code/cheese.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
    "__v": 0
  }
]

const storeWithIngredients =     {
  ingredients: ingredients,
  success: true,
  counter: {},
  ingredientsLoaded: true,
}


test("should be equal to initialState", () => {
  expect(reducer(undefined, {type: "unknown"})).toEqual(
    {
      ingredients: [],
      success: null,
      counter: {},
      ingredientsLoaded: false,
    }
  )
})

test("should increase counter by one for bun", () => {
  const bun = ingredients.find(ingredient => ingredient.type === "bun")
  const newStore = reducer(storeWithIngredients, counterIncreased(bun._id))
  expect(newStore.counter).toEqual({
    [bun._id]: 1
  })
})

test("should replace key for counter for any new bun", () => {
  const bun1 = ingredients.find(ingredient => ingredient.name === "Краторная булка N-200i")
  const bun2 = ingredients.find(ingredient => ingredient.name === "Флюоресцентная булка R2-D3")
  let newStore = reducer(storeWithIngredients, counterIncreased(bun1._id))
  expect(newStore.counter).toEqual({[bun1._id]: 1})
  newStore = reducer(newStore, counterIncreased(bun1._id))
  expect(newStore.counter).toEqual({[bun1._id]: 1})
  newStore = reducer(newStore, counterIncreased(bun2._id))
  expect(newStore.counter).toEqual({[bun1._id]: 0, [bun2._id]: 1})
})  

test("should increase counter all the time for any ingredient except bun", () => {
  const someIngredient = ingredients.find(ingredient => ingredient.name === "Хрустящие минеральные кольца") 
  let newStore = reducer(storeWithIngredients, counterIncreased(someIngredient._id))
  expect(newStore.counter).toEqual({[someIngredient._id]: 1})
  newStore = reducer(newStore, counterIncreased(someIngredient._id))
  expect(newStore.counter).toEqual({[someIngredient._id]: 2})
  newStore = reducer(newStore, counterIncreased(someIngredient._id))
  expect(newStore.counter).toEqual({[someIngredient._id]: 3})
}) 

test("should decrease counter by 1", () => {
  let newStore = {...initialState, counter: {"aaa": 5, "bbb": 6}}
  newStore = reducer(newStore, counterDecreased("aaa"))
  expect(newStore.counter).toEqual({"aaa": 4, "bbb": 6}) 
  newStore = reducer(newStore, counterDecreased("bbb"))
  expect(newStore.counter).toEqual({"aaa": 4, "bbb": 5}) 
})

test("should select all ingredients", () => {
  expect(selectIngredients({ ingredients: storeWithIngredients })).toEqual(ingredients)
})

test("should select counter", () => {
  const counter = {"123123123": 333, "321321": 777}
  const store = {...initialState, counter}
  expect(selectCounter({ ingredients: store })).toEqual(counter)
})

test("should select ingredient", () => {
  const store = {...storeWithIngredients, success: true}
  const ingredient = ingredients.find(ingredient => ingredient._id === "643d69a5c3f7b9001cfa093c")
  expect(selectIngredient({ ingredients: store }, ingredient._id)).toEqual(ingredient)
})

test("should select loaded ingredients", () => {
  const ingredients = {...initialState, ingredientsLoaded: true}
  expect(selectIngredientsLoaded({ ingredients })).toEqual(true)
})
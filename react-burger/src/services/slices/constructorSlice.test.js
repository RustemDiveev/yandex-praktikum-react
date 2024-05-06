import { 
    ingredientAdded, 
    ingredientDeleted, 
    reorderIngredients, 
    initialState, 
    selectBun, 
    selectIngredients
} from "./constructorSlice"
import reducer from "./constructorSlice"


test("should be equal to initialState", () => {
    expect(reducer(undefined, {type: "unknown"})).toEqual(
        {ingredients: [], bun: null}
    )
})

test("should add one bun", () => {
    const bun = {
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
    }
    expect(reducer(initialState, ingredientAdded(bun))).toEqual(
        {
            bun,
            ingredients: []
        }
    )
})

test("should keep only one bun", () => {
    const bun1 = {
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
    }
    const bun2 = {
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
    }
    const previousState = {
        bun: bun1,
        ingredients: null
    }
    expect(reducer(previousState, ingredientAdded(bun2))).toEqual({
        bun: bun2,
        ingredients: null
    })
})

test("should add one ingredient", () => {
    const sauce = {
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
    }
    const store = reducer(initialState, ingredientAdded(sauce))
    expect(store.bun).toBeNull()
    expect(store.ingredients).toHaveLength(1)
})

test("should delete ingredient by uniqueId", () => {
    const sauce = {
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
    }
    let store = reducer(initialState, ingredientAdded(sauce))
    const uniqueId = store.ingredients[0].uniqueId
    store = reducer(store, ingredientDeleted(uniqueId))
    expect(store.ingredients).toHaveLength(0)
})

test("should reorder ingredients", () => {
    const ingredient1 = {
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
    }
    const ingredient2 = {
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
    }
    let store = reducer(initialState, ingredientAdded(ingredient1))
    expect(store.ingredients).toHaveLength(1)
    expect(store.ingredients[0]._id).toEqual(ingredient1._id)

    store = reducer(store, ingredientAdded(ingredient2))
    expect(store.ingredients).toHaveLength(2)
    expect(store.ingredients[0]._id).toEqual(ingredient1._id)
    expect(store.ingredients[1]._id).toEqual(ingredient2._id)

    const ingredient1Final = store.ingredients[0]
    const ingredient2Final = store.ingredients[1]
    const droppedId = ingredient2Final.uniqueId

    store = reducer(store, reorderIngredients({draggedId: ingredient1Final, droppedId}))

    expect(store.ingredients).toHaveLength(2)
    expect(store.ingredients[0]).toEqual(ingredient2Final)
    expect(store.ingredients[1]).toEqual(ingredient1Final)
})

test("should select bun", () => {
    const bun = {
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
    }
    const burgerConstructor = {
        bun, 
        ingredients: []
    }
    expect(selectBun({ burgerConstructor })).toEqual(bun)
})

test("should select ingredient", () => {
    const ingredient = {
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
    }
    const burgerConstructor = {
        bun: null,
        ingredients: [ingredient]
    }
    expect(selectIngredients({ burgerConstructor })).toEqual([ingredient])
})
import { createContext } from "react"

const IngredientsContext = createContext({
    ingredients: [],
    bun: undefined, 
    totalPrice: undefined,
    setTotalPrice: () => {}
})

export default IngredientsContext
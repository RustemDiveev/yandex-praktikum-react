import { createContext } from "react"

const IngredientsContext = createContext({
    ingredients: [],
    bun: null, 
    totalPrice: 0,
    setTotalPrice: () => {}
})

export default IngredientsContext
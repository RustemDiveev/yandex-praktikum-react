import { FC } from "react"

import useAppSelector from "../../services/hooks/useAppSelector"
import { selectIngredients } from "../../services/slices/ingredientsSlice"
import IIngredient from "../../interfaces/Ingredient"

interface IOrderDetailIngredientsProps {
  ingredientIds: string[]
}

type tIngredient = {
  name: string,
  price: number,
  count: number,
  image_mobile: string
}

const OrderDetailIngredients: FC<IOrderDetailIngredientsProps> = ({ingredientIds}) => {
  const ingredients = useAppSelector(selectIngredients)

  const preparedIngredients = ingredientIds.map(
    id => ingredients.find(ingredient => ingredient._id === id)
  ) as IIngredient[]
  
  const finalPreparedIngredients = preparedIngredients.reduce(
    (previous: {[key: string]: tIngredient}, current) => {
      const key = current._id 
      let newPrevious = {...previous}
      if (key in previous) {
        newPrevious[key].count += 1
      } else {
        newPrevious[key] = {
          name: current.name,
          price: current.price,
          count: 1,
          image_mobile: current.image_mobile
        }
      }
      return newPrevious
    }, {}
  )

  return (
    <ul>
      {Object.values(finalPreparedIngredients).map(ingredient => {
        return <li>{ingredient.name} {ingredient.count}</li>
      })}
    </ul>
  )
}

export default OrderDetailIngredients
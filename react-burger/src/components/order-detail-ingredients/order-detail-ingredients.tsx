import { FC, useMemo } from "react"

import useAppSelector from "../../services/hooks/useAppSelector"
import { selectIngredients } from "../../services/slices/ingredientsSlice"
import IIngredient from "../../interfaces/Ingredient"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./order-detail-ingredients.module.css"


interface IOrderDetailIngredientsProps {
  ingredientIds: string[]
}

type TIngredient = {
  name: string,
  price: number,
  count: number,
  image_mobile: string
}

const OrderDetailIngredients: FC<IOrderDetailIngredientsProps> = ({ingredientIds}) => {
  const ingredients = useAppSelector(selectIngredients)

  const preparedIngredients = useMemo(() => ingredientIds.map(
    id => ingredients.find(ingredient => ingredient._id === id)
  ) as IIngredient[], [ingredientIds, ingredients])
  
  const finalPreparedIngredients = useMemo(() => preparedIngredients.reduce(
    (previous: {[key: string]: TIngredient}, current) => {
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
  ), [preparedIngredients])

  return (
    <ul className={styles.ul}>
      {Object.values(finalPreparedIngredients).map(ingredient => {
        return (
          <li key={ingredient.name} className={`${styles.li} mt-4 mr-6`}>
            <div className={styles.image_container}>
              <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image}/>
            </div>
            <p className="text text_type_main-default ml-4">
              {ingredient.name}
            </p> 
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {ingredient.count} x {ingredient.price}  
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default OrderDetailIngredients
import { FC, useMemo } from "react"

import { Link } from "react-router-dom"

import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

import useAppSelector from "../../services/hooks/useAppSelector"

import type { tOrder } from "../../services/slices/orderHistorySlice"

import { selectIngredients } from "../../services/slices/ingredientsSlice"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./order-feed-card.module.css"


interface IOrderCardProps {
  order: tOrder
}

const OrderFeedCard: FC<IOrderCardProps> = ({order}) => {
  const ingredients = useAppSelector(selectIngredients)

  const ingredientsInfo = useMemo(() => order.ingredients.map(
    (ingredient_id: string) => ingredients.find(item => ingredient_id === item._id)
  ).map(
    ingredient => ({
    image: ingredient?.image_mobile!,
    name: ingredient?.name!,
    type: ingredient?.type!,
    price: ingredient?.price!
    })
  ), [ingredients, order.ingredients])

  const totalPrice = useMemo(() => ingredientsInfo.reduce(
    (previous, current) => {
      if (current.type === "bun") {
          return previous + current.price * 2 
      } else {
          return previous + current.price
      }
    }, 0)
  , [ingredientsInfo])

  return (
    <Link to={`./${order.number}`} className={styles.link}>
      <div className={`mt-6 mb-6 p-6 ${styles.card_container}`}>
        <div className={styles.meta_row}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.updatedAt)}
          />
        </div>
        <p className="text text_type_main-medium mt-6">{order.name}</p>
        <div className={styles.info}>
          <ul className={styles.ul}>
            {ingredientsInfo.splice(0, 6).map((ingredient, index) => (
              <li className={styles.image_container} style={{zIndex: 6 - index}}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                {index === 5 && order.ingredients.length > 6 &&
                  <div className={styles.ingredients_counter}>
                    <p className="text text_type_digits-default">
                        +{order.ingredients.length - 6}
                    </p>
                  </div>
                }
              </li>
            ))}
          </ul>
          <div>
            <p className={styles.price}>
              <span className="text text_type_digits-default">{totalPrice}</span>
              <CurrencyIcon type="primary"/> 
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrderFeedCard
import { FC, useMemo, memo } from "react"

import { Link, useLocation } from "react-router-dom"

import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

import type { TOrder } from "../../services/slices/orderHistorySlice"

import IIngredient from "../../interfaces/Ingredient"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./order-feed-card.module.css"


interface IOrderCardProps {
  order: TOrder,
  ingredients: IIngredient[]
}

const OrderFeedCard: FC<IOrderCardProps> = memo(({order, ingredients}) => {
  const location = useLocation()

  // Если оборачивать в useMemo, то никак не получается при повторном 
  // переходе на ленту заказов - своевременно отрендерить картинки
  const ingredientsInfo = order.ingredients.map(
    (ingredient_id: string) => ingredients.find(item => ingredient_id === item._id)
  ).map(
    ingredient => ({
      image: ingredient?.image_mobile!,
      name: ingredient?.name!,
      type: ingredient?.type!,
      price: ingredient?.price!
  }))

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
    <Link to={`./${order.number}`} state={{ background: location }} className={styles.link}>
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
            {ingredientsInfo.slice(0, 6).map((ingredient, index) => (
              <li key={index} className={styles.image_container} style={{zIndex: 6 - index}}>
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
})

export default OrderFeedCard
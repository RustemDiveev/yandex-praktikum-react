import { FC, useMemo } from "react"

import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

import useAppSelector from "../../services/hooks/useAppSelector"

import { selectOrders, selectSuccess } from "../../services/slices/orderHistorySlice"
import type { tOrder } from "../../services/slices/orderHistorySlice"
import { selectIngredients } from "../../services/slices/ingredientsSlice"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./order-feed.module.css"


interface IOrderCardProps {
  order: tOrder
}

const OrderCard: FC<IOrderCardProps> = ({order}) => {
  const ingredients = useAppSelector(selectIngredients)

  const images = useMemo(() => order.ingredients.map(
    (ingredient_id: string) => ingredients.find(item => ingredient_id === item._id)
  ).map(
    ingredient => ({
      image: ingredient?.image_mobile,
      name: ingredient?.name
    })
  ), [ingredients, order.ingredients])

  
  return (
    <div className={`mt-6 mb-6 ${styles.card_container}`}>
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
          {images.splice(0, 6).map((image, index) => (
            <li className={styles.image_container} style={{zIndex: 6 - index}}>
              <img className={styles.image} src={image.image} alt={image.name}/>
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
          <p style={{display: "flex", alignItems: "center"}}>
            <span className="text text_type_digits-default">500</span>
            <CurrencyIcon type="primary"/> 
          </p>
        </div>
      </div>
      
    </div>
  )
}


const OrderFeed = () => {
  const success = useAppSelector(selectSuccess)
  const orders = useAppSelector(selectOrders)

  if (success)
  return (
    <>
      {orders.map(order => <OrderCard order={order}/>)}
    </>
  )

  return null
}

export default OrderFeed
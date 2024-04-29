import useAppSelector from "../../services/hooks/useAppSelector"

import { selectOrders, selectSuccess } from "../../services/slices/orderHistorySlice"
import OrderFeedCard from "../order-feed-card/order-feed-card"
import { selectIngredients } from "../../services/slices/ingredientsSlice"

import styles from "./order-feed.module.css"


const OrderFeed = () => {
  const success = useAppSelector(selectSuccess)
  const orders = useAppSelector(selectOrders)
  const ingredients = useAppSelector(selectIngredients)

  if (success)
  return (
    <div className={styles.div}>
      {orders.map(order => <OrderFeedCard key={order.number} order={order} ingredients={ingredients}/>)}
    </div>
  )

  return null
}

export default OrderFeed
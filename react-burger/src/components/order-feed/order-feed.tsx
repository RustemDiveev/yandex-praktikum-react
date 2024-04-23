import useAppSelector from "../../services/hooks/useAppSelector"

import { selectOrders, selectSuccess } from "../../services/slices/orderHistorySlice"
import OrderFeedCard from "../order-feed-card/order-feed-card"

import styles from "./order-feed.module.css"


const OrderFeed = () => {
  const success = useAppSelector(selectSuccess)
  const orders = useAppSelector(selectOrders)

  if (success)
  return (
    <div className={styles.div}>
      {orders.map(order => <OrderFeedCard order={order}/>)}
    </div>
  )

  return null
}

export default OrderFeed
import { useMemo } from "react"

import useAppSelector from "../../services/hooks/useAppSelector"
import { selectOrders, selectTotal, selectTotalToday, selectSuccess } from "../../services/slices/orderHistorySlice"
import getOrderNumbers from "../../utils/getOrderNumbers"
import OrderSummaryOrdersStatus from "../order-summary-orders-status/order-summary-orders-status"
import OrderSummaryTotal from "../order-summary-total/order-summary-total"

import styles from "./order-summary.module.css"


const OrderSummary = () => {
  const success = useAppSelector(selectSuccess)
  const orders = useAppSelector(selectOrders)
  const total = useAppSelector(selectTotal)
  const totalToday = useAppSelector(selectTotalToday)

  const ordersDone = useMemo(() => getOrderNumbers(orders, ["done"]), [orders])
  const ordersPending = useMemo(() => getOrderNumbers(orders, ["created", "pending"]), [orders])
  
  if (!success) return null

  return (
    <div className={`${styles.main_container} mt-20`}>
      <div className={`${styles.orders_status}`}>
        <OrderSummaryOrdersStatus 
          title="Готовы"
          orders={ordersDone}
          color={"#00CCCC"}
        />
        <OrderSummaryOrdersStatus 
          title="В работе"
          orders={ordersPending}
        />
      </div>
      <OrderSummaryTotal
        title="Выполнено за все время"
        total={total}
      />
      <OrderSummaryTotal
        title="Выполнено за сегодня"
        total={totalToday}
      />
    </div>
  )
}

export default OrderSummary
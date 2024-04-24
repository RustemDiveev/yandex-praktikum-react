import { FC } from "react"

import type { tOrder } from "../../services/slices/orderHistorySlice"
import OrderDetailIngredients from "../order-detail-ingredients/order-detail-ingredients"
import styles from "./order-detail.module.css"


interface IOrderDetailProps {
  order: tOrder
}

const translateStatus = (status: string) => {
  return status === "done" ? "Выполнен" : status === "pending" ? "В процессе" : "Создан"
}

const OrderDetail: FC<IOrderDetailProps> = ({order}) => {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-default ${styles.center}`}>
        #{order.number}
      </p>
      <p className={"text text_type_main-medium mt-10"}>{order.name}</p>
      <p className={`text text_type_main-default mt-2 ${styles.status}`}>
        {translateStatus(order.status)}
      </p>
      <p className={"text text_type_main-medium mt-15"}>Состав:</p>
      <div className={styles.ingredients}>
        <OrderDetailIngredients ingredientIds={order.ingredients}/>
      </div>
    </div>
  )
}

export default OrderDetail
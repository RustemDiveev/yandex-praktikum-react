import { FC } from "react"

import styles from "./order-summary-orders-status.module.css"


interface IOrderSummaryOrdersProps {
  title: string,
  orders: number[],
  color?: string
}

const OrderSummaryOrdersStatus: FC<IOrderSummaryOrdersProps> = ({title, orders, color}) => {
  return (
    <div>
      <p className={`text text_type_main-medium mb-6`}>{title}:</p>
      <ul className={styles.ul}>
        {orders.splice(0, 5).map((order, index) => (
          <li 
            key={index}
            className="mt-2 mb-2 text text_type_digits-default"
            style={{color}}
          >
            {order}
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default OrderSummaryOrdersStatus
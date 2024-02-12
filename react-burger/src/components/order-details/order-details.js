import { useContext } from "react"

import styles from "./order-details.module.css"
import imageDone from "../../images/done.png"
import OrderContext from "../../services/orderContext"


const OrderDetails = () => {

  const { orderNumber } = useContext(OrderContext)

  return (
    <div className={`${styles.container} mt-20`}>
      <p className="text text_type_digits-large">
          {orderNumber}  
      </p>
      <p className="text text_type_main-medium mt-8">
          идентификатор заказа
      </p>
      <img src={imageDone} alt={"done"} className={`mt-15 ${styles.image}`}/>
      <p className="text text_type_main-default mt-15">
          Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mt-2 mb-30">
          Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails
import styles from "./order-details.module.css"
import imageDone from "../../images/done.png"


const OrderDetails = () => {
  return (
    <div className={`${styles.container} mt-30`}>
        <p className="text text_type_digits-large">
            034536  
        </p>
        <p className="text text_type_main-default mt-8">
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
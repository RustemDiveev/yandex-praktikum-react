import { FC, useMemo } from "react"

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

import useAppSelector from "../../services/hooks/useAppSelector"
import type { TOrder } from "../../services/slices/orderHistorySlice"
import OrderDetailIngredients from "../order-detail-ingredients/order-detail-ingredients"
import { selectIngredients } from "../../services/slices/ingredientsSlice"
import styles from "./order-detail.module.css"


interface IOrderDetailProps {
  order: TOrder
}

const translateStatus = (status: string) => {
  return status === "done" ? "Выполнен" : status === "pending" ? "Готовится" : "Создан"
}

const OrderDetail: FC<IOrderDetailProps> = ({order}) => {
  const ingredients = useAppSelector(selectIngredients)

  const totalPrice = useMemo(
    () => order.ingredients.map(ingredientId => { 
      return ingredients.find(ingredient => ingredientId === ingredient._id)
    }).reduce((previous, current) => {
      return previous + current!.price
    }, 0)
  , [ingredients, order.ingredients])

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
      <div className={`mt-10 ${styles.footer}`}>
        <FormattedDate date={new Date(order.updatedAt)} className="text text_type_main-default text_color_inactive"/>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
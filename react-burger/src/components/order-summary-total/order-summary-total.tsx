import { FC } from "react"


interface IOrderSummaryTotalProps {
  title: string,
  total: number
}

const OrderSummaryTotal: FC<IOrderSummaryTotalProps> = ({title, total}) => {
  return (
    <div className={"mt-15"}>
      <p className="text text_type_main-medium">{title}:</p>
      <p className="text text_type_digits-large">{total}</p>
    </div>
  )
}

export default OrderSummaryTotal
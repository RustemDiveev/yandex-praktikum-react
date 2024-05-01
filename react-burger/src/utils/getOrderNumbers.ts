import type { TOrder } from "../services/slices/orderHistorySlice"


const getOrderNumbers = (orders: TOrder[], status: string[]): number[] => {
  return orders.filter(order => status.includes(order.status)).map(order => order.number)
}

export default getOrderNumbers
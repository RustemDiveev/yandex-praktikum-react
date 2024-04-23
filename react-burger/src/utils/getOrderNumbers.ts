import type { tOrder } from "../services/slices/orderHistorySlice"


const getOrderNumbers = (orders: tOrder[], status: string[]): number[] => {
  return orders.filter(order => status.includes(order.status)).map(order => order.number)
}

export default getOrderNumbers
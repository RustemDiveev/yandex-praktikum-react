import { createContext } from "react";

const OrderContext = createContext({
    orderNumber: undefined,
    setOrderNumber: () => {}
})

export default OrderContext
import { createContext } from "react";

const OrderContext = createContext({
    orderNumber: null,
    setOrderNumber: () => {}
})

export default OrderContext
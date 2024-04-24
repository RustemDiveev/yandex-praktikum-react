import { useEffect } from "react"

import { useParams } from "react-router-dom"

import useAppSelector from "../../services/hooks/useAppSelector"
import useAppDispatch from "../../services/hooks/useAppDispatch"
import OrderDetail from "../../components/order-detail/order-detail"
import { 
  selectOrderByNumber, 
  fetchSelectedOrder, 
  selectSelectedOrder 
} from "../../services/slices/orderHistorySlice"

import styles from "./feed-detail.module.css"


const FeedDetail = () => {
  const { number } = useParams()
  const orderFromStore = useAppSelector(
    state => selectOrderByNumber(state, Number(number))
  )
  const orderFetched = useAppSelector(selectSelectedOrder)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (number && !orderFromStore && orderFetched === null) {
      dispatch(fetchSelectedOrder(number))
    }
  }, [dispatch, number, orderFromStore, orderFetched])

  if (orderFromStore || orderFetched) {
    const order = orderFromStore ?? orderFetched!
    return (
      <div className={`mt-20 ${styles.div}`}>
        <OrderDetail order={order}/>
      </div>
    )
  }
  
  return null
}

export default FeedDetail
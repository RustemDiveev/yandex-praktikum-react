import { useEffect } from "react"

import { connectionStart, connectionClose } from "../../services/slices/orderHistorySlice"
import useAppDispatch from "../../services/hooks/useAppDispatch"
import OrderFeed from "../../components/order-feed/order-feed"

import styles from "./feed.module.css"



const Feed = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connectionStart())
    return () => {
      dispatch(connectionClose())
    }
  }, [dispatch])

  return (
    <main className={`mr-20 ml-20 ${styles.main}`}>
      <section className={`mr-5 ml-5 ${styles.section}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Лента заказов
        </h1>
        <OrderFeed/>
      </section>
      <section className={`mr-5 ml-5 ${styles.section}`}>

      </section>
    </main>
  )
}

export default Feed
import { useEffect } from "react"

import ProfileMenu from "../../components/profile-menu/profile-menu";

import styles from "./profile-orders.module.css"

import useAppDispatch from "../../services/hooks/useAppDispatch";
import { connectionStart, connectionClose } from "../../services/slices/orderHistorySlice";
import { WS_ALL_ORDERS_URL } from "../../settings/urls";
import OrderFeed from "../../components/order-feed/order-feed";


const ProfileOrders = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connectionStart(`${WS_ALL_ORDERS_URL}?token=${localStorage.getItem("accessToken")?.split(" ")[1]}`))
    return () => {
      dispatch(connectionClose())
    }
  }, [dispatch])

  return (
    <div className={`${styles.main_container} mt-20`}>
      <div className={`${styles.col} pl-20`}>
        <ProfileMenu selectedEntry={"history"}/>
      </div>
      <div className={styles.col}>
        <OrderFeed/>
      </div>
      <div className={styles.col}>
      </div>
    </div>
  )
}

export default ProfileOrders
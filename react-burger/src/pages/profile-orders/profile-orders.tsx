import { useEffect } from "react"

import ProfileMenu from "../../components/profile-menu/profile-menu";

import styles from "./profile-orders.module.css"

import useAppDispatch from "../../services/hooks/useAppDispatch";
import { connectionStart } from "../../services/slices/orderHistorySlice";

const ProfileOrders = () => {
  const dispatch = useAppDispatch()


  return (
    <div className={`${styles.main_container} mt-20`}>
      <div className={`${styles.col} pl-20`}>
        <ProfileMenu selectedEntry={"history"}/>
      </div>
      <div className={styles.col}>
      </div>
      <div className={styles.col}>
      </div>
    </div>
  )
}

export default ProfileOrders
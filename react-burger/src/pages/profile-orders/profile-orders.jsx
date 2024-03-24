import AppHeader from "../../components/app-header/app-header";
import ProfileMenu from "../../components/profile-menu/profile-menu";

import styles from "./profile-orders.module.css"

const ProfileOrders = () => {
  return (
    <>
      <AppHeader />
      <div className={`${styles.main_container} mt-20`}>
        <div className={`${styles.col} pl-20`}>
          <ProfileMenu selectedEntry={"history"}/>
        </div>
        <div className={styles.col}>
        </div>
        <div className={styles.col}>
        </div>
      </div>
    </>
  )
}

export default ProfileOrders
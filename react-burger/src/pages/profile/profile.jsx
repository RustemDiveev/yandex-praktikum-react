import { Input } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import ProfileMenu from "../../components/profile-menu/profile-menu"

import styles from "./profile.module.css"


const Profile = () => {
  return (
    <>
      <AppHeader />
      <div className={`${styles.main_container} mt-20`}>
        <div className={`${styles.col} pl-20`}>
          <ProfileMenu selectedEntry={"profile"}/>
        </div>
        <div className={styles.col}>
          <Input 
            type="text"
            placeholder="Имя"
            value="Марк"
            icon="EditIcon"
            extraClass="mt-3 mb-3"
          />
          <Input 
            type="text"
            placeholder="Логин"
            value="mail@stellar.burgers"
            icon="EditIcon"
            extraClass="mt-3 mb-3"
          />
          <Input 
            type="password"
            placeholder="Пароль"
            value="123456"
            icon="EditIcon"
            extraClass="mt-3 mb-3"
          />
        </div>
        <div className={styles.col}>
        </div>
    </div>
    </>
  )
}

export default Profile
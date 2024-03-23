import { Input } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"

import styles from "./profile.module.css"


const Profile = () => {
  return (
    <>
      <AppHeader />
      <div className={`${styles.main_container} mt-20`}>
        <div className={`${styles.col} pl-20`}>
          <div>
            <p className="text text_type_main-medium mt-7 mb-7">
              Профиль
            </p>
            <p className="text text_type_main-medium mt-7 mb-7">
              История заказов
            </p>
            <p className="text text_type_main-medium mt-7 mb-7">
              Выход
            </p>
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
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
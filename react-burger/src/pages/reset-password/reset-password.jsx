import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"

import styles from "./reset-password.module.css"


const ResetPassword = () => {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} m-30`}>
        <section className={styles.section}>
          <p className="text text_type_main-medium mb-3">Восстановление пароля</p>
          <Input 
            type={"password"}
            placeholder={"Введите новый пароль"}
            icon={"ShowIcon"}
            extraClass="mt-3 mb-3"
          />
          <Input 
            type={"text"}
            placeholder={"Введите код из письма"}
            extraClass="mt-3 mb-3"
          />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
          >
            Сохранить
          </Button>
          <p className="text text_type_main-default mt-20 mb-2">
            Вспомнили пароль?&nbsp;
            <a href="#">Войти</a>
          </p>
        </section>
      </main>
    </>
  )
}

export default ResetPassword
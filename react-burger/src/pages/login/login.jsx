import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"

import styles from "./login.module.css"


const Login = () => {
  return (
    <>
      <AppHeader/>
      <main className={`${styles.main} m-30`}>
        <section className={styles.section}>
          <p className="text text_type_main-medium mb-3">Вход</p>
          <Input 
            type={"text"}
            placeholder={"E-mail"}
            extraClass="mt-3 mb-3"
          />
          <Input 
            type={"password"}
            placeholder={"Пароль"}
            icon={"ShowIcon"}
            extraClass="mt-3 mb-3"
          />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
          >
            Войти
          </Button>
          <p className="text text_type_main-default mt-20 mb-2">
            Вы - новый пользователь?&nbsp;
            <a href="#">Зарегистрироваться</a>
          </p>
          <p className="text text_type_main-default mt-2">
            Забыли пароль?&nbsp;
            <a href="#">Восстановить пароль</a>
          </p>
        </section>
      </main>
    </>
  )
}

export default Login
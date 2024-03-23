import { useNavigate } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import styles from "./register.module.css"


const Register = () => {
  const navigate = useNavigate()

  const toLogin = () => {
    navigate("/login")
  }

  return (
    <>
      <AppHeader/>
      <main className={`${styles.main} m-30`}>
        <section className={styles.section}>
          <p className="text text_type_main-medium mb-3">Регистрация</p>
          <Input 
            type={"text"}
            placeholder={"Имя"}
            extraClass="mt-3 mb-3"
          />
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
            Зарегистрироваться
          </Button>
          <p className="text text_type_main-default mt-20 mb-2">
            Уже зарегистрированы?
            <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
              Войти
            </Button>
          </p>
        </section>
      </main>
    </>
    
  )
}

export default Register
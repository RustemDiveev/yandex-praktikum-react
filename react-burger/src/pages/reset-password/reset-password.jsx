import { useRef } from "react"

import { useNavigate } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import { PASSWORD_RESET_URL } from "../../settings/urls"

import styles from "./reset-password.module.css"


const ResetPassword = () => {

  const passwordRef = useRef(null)
  const tokenRef = useRef(null)
  const navigate = useNavigate()

  const resetPassword = async () => {
    try {
      const response = await fetch(
        PASSWORD_RESET_URL,
        {
          method: "POST",
          body: {
            password: passwordRef.current.value,
            token: tokenRef.current.value
          }
        }
      )
      if (response.ok) {
        await response.json()
      }
      else {
        console.error("Password reset request finished with error")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const toLogin = () => {
    navigate("/login")
  }

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
            ref={passwordRef}
          />
          <Input 
            type={"text"}
            placeholder={"Введите код из письма"}
            extraClass="mt-3 mb-3"
            ref={tokenRef}
          />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
            onClick={resetPassword}
          >
            Сохранить
          </Button>
          <p className="text text_type_main-default mt-20 mb-2">
            Вспомнили пароль?&nbsp;
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={toLogin}
            >
              Войти
            </Button>
          </p>
        </section>
      </main>
    </>
  )
}

export default ResetPassword
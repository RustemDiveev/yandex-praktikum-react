import { useNavigate } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { PASSWORD_RESET_URL } from "../../settings/urls"
import useForm from "../../hooks/useForm"

import styles from "./reset-password.module.css"


const ResetPassword = () => {
  const { values, handleChange } = useForm()
  const navigate = useNavigate()

  const resetPassword = async () => {
    try {
      const response = await fetch(
        PASSWORD_RESET_URL,
        {
          method: "POST",
          body: JSON.stringify(values)
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
    <main className={`${styles.main} m-30`}>
      <section className={styles.section}>
        <p className="text text_type_main-medium mb-3">Восстановление пароля</p>
        <Input 
          name="password"
          type={"password"}
          placeholder={"Введите новый пароль"}
          icon={"ShowIcon"}
          extraClass="mt-3 mb-3"
          onChange={handleChange}
        />
        <Input 
          name="token"
          type={"text"}
          placeholder={"Введите код из письма"}
          extraClass="mt-3 mb-3"
          onChange={handleChange}
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
  )
}

export default ResetPassword
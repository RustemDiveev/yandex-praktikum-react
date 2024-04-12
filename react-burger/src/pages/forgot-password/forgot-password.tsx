import { SyntheticEvent, useState } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { PASSWORD_RESET_EMAIL_URL } from "../../settings/urls"
import useForm from "../../hooks/useForm"
import styles from "./forgot-password.module.css"


type FormStateType = {
  email: string
}

const initialFormState: FormStateType = {
  email: ""
}

const ForgotPassword = () => {
  const [errorBool, setErrorBool] = useState(false)
  const { values, handleChange } = useForm<FormStateType>(initialFormState)

  const navigate = useNavigate()
  const location = useLocation()

  const onClickRestore = async (e: SyntheticEvent) => {
    e.preventDefault()
    
    if (values.email) {
      try {
        const response = await fetch(
          PASSWORD_RESET_EMAIL_URL, 
          {
            method: "POST",
            body: JSON.stringify(values)
          }
        )
        if (response.ok) {
          const responseData = await response.json()
          if (responseData.success) {
            navigate("/reset-password", {state: {from: location.pathname}})
          }
        }
        else {
          console.error("Password reset request finished with error")
        }
      } catch (err) {
        console.error(err)
      } finally {
        setErrorBool(false)
      }
    }
    else {
      setErrorBool(true)
    }
  }

  const toLogin = () => {
    navigate("/login")
  }

  return (
    <>
      <main className={`${styles.main} m-30`}>
        <section className={styles.section}>
          <p className="text text_type_main-medium mb-3">Восстановление пароля</p>
          <form onSubmit={onClickRestore}>
            <Input 
              name="email"
              value={values.email}
              type={"text"}
              placeholder={"Укажите e-mail"}
              extraClass="mt-3 mb-3"
              error={errorBool}
              errorText={"E-mail должен быть заполнен"}
              onChange={handleChange}            
            />
            <Button 
              htmlType="submit" 
              type="primary" 
              size="large"
              extraClass="mt-3 ml-30 mr-30"
            >
              Восстановить
            </Button>
          </form>
          <p className="text text_type_main-default mt-20 mb-2">
            Вспомнили пароль?&nbsp;
            <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
              Войти  
            </Button>
          </p>
        </section>
      </main>
    </>
  )
}

export default ForgotPassword
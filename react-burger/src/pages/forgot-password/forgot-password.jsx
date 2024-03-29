import { useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import styles from "./forgot-password.module.css"
import { PASSWORD_RESET_EMAIL_URL } from "../../settings/urls"


const ForgotPassword = () => {
  const [errorBool, setErrorBool] = useState(false)

  const emailRef = useRef(null)
  const navigate = useNavigate()

  const onClickRestore = async () => {
    const email = emailRef.current.value ?? ""
    if (email) {
      try {
        const response = await fetch(
          PASSWORD_RESET_EMAIL_URL, 
          {
            method: "POST",
            body: JSON.stringify({email})
          }
        )
        if (response.ok) {
          const responseData = await response.json()
          if (responseData.success) {
            navigate("/reset-password")
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

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} m-30`}>
        <section className={styles.section}>
          <p className="text text_type_main-medium mb-3">Восстановление пароля</p>
          <Input 
            ref={emailRef}
            type={"text"}
            placeholder={"Укажите e-mail"}
            extraClass="mt-3 mb-3"
            error={errorBool}
            errorText={"E-mail должен быть заполнен"}            
          />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
            onClick={onClickRestore}
          >
            Восстановить
          </Button>
          <p className="text text_type_main-default mt-20 mb-2">
            Вспомнили пароль?&nbsp;
            <Button htmlType="button" type="secondary" size="medium">
              Войти  
            </Button>
          </p>
        </section>
      </main>
    </>
  )
}

export default ForgotPassword
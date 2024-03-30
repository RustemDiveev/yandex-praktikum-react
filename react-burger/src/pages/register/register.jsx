import { useRef } from "react"

import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import { registerUser } from "../../services/slices/userSlice"
import styles from "./register.module.css"


const Register = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toLogin = () => {
    navigate("/login")
  }

  const register = () => {
    dispatch(registerUser({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,  
    }))
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
            ref={nameRef}
          />
          <Input 
            type={"text"}
            placeholder={"E-mail"}            
            extraClass="mt-3 mb-3"
            ref={emailRef}
          />
          <Input 
            type={"password"}
            placeholder={"Пароль"}
            icon={"ShowIcon"}
            extraClass="mt-3 mb-3"
            ref={passwordRef}
          />
          <Button 
            htmlType="button" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
            onClick={register}
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
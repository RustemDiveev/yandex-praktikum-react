import { useNavigate } from "react-router-dom"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { loginUser } from "../../services/slices/userSlice"
import useForm from "../../hooks/useForm"
import useAppDispatch from "../../services/hooks/useAppDispatch"

import styles from "./login.module.css"
import { SyntheticEvent } from "react"


const Login = () => {
  const {values, handleChange} = useForm({email: "", password: ""})

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toRegister = () => {
    navigate("/register")
  }

  const toForgotPassword = () => {
    navigate("/forgot-password")
  }

  const login = async (e: SyntheticEvent) => {
    e.preventDefault()
    const response = await dispatch(loginUser(values as {email: string, password: string})).unwrap()
    if (response.success) navigate("/")
  }

  return (
    <main className={`${styles.main} m-30`}>
      <section className={styles.section}>
        <p className="text text_type_main-medium mb-3">Вход</p>
        <form onSubmit={login}>
          <Input 
            name="email"
            value={values.email}
            type={"text"}
            placeholder={"E-mail"}
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
          <Input 
            name="password"
            value={values.password}
            type={"password"}
            placeholder={"Пароль"}
            icon={"ShowIcon"}
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
          <Button 
            htmlType="submit" 
            type="primary" 
            size="large"
            extraClass="mt-3 ml-30 mr-30"
          >
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default mt-20">
          Вы - новый пользователь?
          <Button htmlType="button" type="secondary" size="medium" onClick={toRegister}>
            Зарегистрироваться
          </Button>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Button htmlType="button" type="secondary" size="medium" onClick={toForgotPassword}>
            Восстановить пароль
          </Button>
        </p>
      </section>
    </main>
  )
}

export default Login
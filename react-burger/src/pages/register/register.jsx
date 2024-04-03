import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { registerUser } from "../../services/slices/userSlice"
import useForm from "../../hooks/useForm"
import styles from "./register.module.css"


const Register = () => {
  const { values, handleChange } = useForm({name: "", email: "", password: ""})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toLogin = () => {
    navigate("/login")
  }

  const register = (e) => {
    e.preventDefault()
    dispatch(registerUser(values))
  }

  return (   
    <main className={`${styles.main} m-30`}>
      <section className={styles.section}>
        <p className="text text_type_main-medium mb-3">Регистрация</p>
        <form onSubmit={register}>
          <Input 
            name="name"
            value={values.name}
            type={"text"}
            placeholder={"Имя"}
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default mt-20 mb-2">
          Уже зарегистрированы?
          <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
            Войти
          </Button>
        </p>
      </section>
    </main>  
  )
}

export default Register
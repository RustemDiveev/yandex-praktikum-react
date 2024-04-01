import { useEffect, useCallback } from "react"

import { useDispatch } from "react-redux"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import ProfileMenu from "../../components/profile-menu/profile-menu"
import { userGetInfo, userPatchInfo } from "../../services/slices/userSlice"
import useForm from "../../hooks/useForm"

import styles from "./profile.module.css"


const Profile = () => {  
  const dispatch = useDispatch()
  const { values, setValues, handleChange } = useForm({name: "", email: "", password: ""})

  const getUserInfo = useCallback(async () => {
    const response = await dispatch(userGetInfo()).unwrap()
    if (response.success) {
      setValues({name: response.user.name, email: response.user.email, password: ""})
    } else {
      throw new Error("Error fetching userInfo")
    }
  }, [dispatch, setValues])

  const save = () => {
    dispatch(userPatchInfo(values))
  }

  const cancel = () => {
    setValues({name: "", email: "", password: ""})
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <>
      <div className={`${styles.main_container} mt-20`}>
        <div className={`${styles.col} pl-20`}>
          <ProfileMenu selectedEntry={"profile"}/>
        </div>
        <div className={styles.col}>
          <Input 
            name="name"
            type="text"
            placeholder="Имя"
            value={values.name}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
          <Input 
            name="email"
            type="text"
            placeholder="Логин"
            value={values.email}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
          <Input 
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={handleChange}
          />
          <div className={`${styles.button_footer} mt-5`}>
            <Button 
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={cancel}
            >
              Отмена
            </Button>
            <Button 
              htmlType="button"
              type="primary"
              size="medium"
              onClick={save}
            >
              Сохранить
            </Button>
          </div>
        </div>
        <div className={styles.col}>
        </div>
    </div>
    </>
  )
}

export default Profile
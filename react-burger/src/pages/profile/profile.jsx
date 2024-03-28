import { useState, useEffect, useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import AppHeader from "../../components/app-header/app-header"
import ProfileMenu from "../../components/profile-menu/profile-menu"
import { selectUser, userGetInfo, userPatchInfo } from "../../services/slices/userSlice"

import styles from "./profile.module.css"


const Profile = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const getUserInfo = async () => {
    const response = await dispatch(userGetInfo()).unwrap()
    if (response.success) {
      setName(response.user.name)
      setEmail(response.user.email)
    } else {
      throw new Error("Error fetching userInfo")
    }
  }

  const save = () => {
    dispatch(userPatchInfo({
      name, email, password
    }))
  }

  const cancel = () => {
    setName(user.name)
    setEmail(user.email)
    setPassword("")
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <AppHeader />
      <div className={`${styles.main_container} mt-20`}>
        <div className={`${styles.col} pl-20`}>
          <ProfileMenu selectedEntry={"profile"}/>
        </div>
        <div className={styles.col}>
          <Input 
            type="text"
            placeholder="Имя"
            value={name}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            type="text"
            placeholder="Логин"
            value={email}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="Пароль"
            value={password}
            icon="EditIcon"
            extraClass="mt-3 mb-3"
            onChange={(e) => setPassword(e.target.value)}
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
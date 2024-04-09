import { FC } from "react"

import { useNavigate } from "react-router-dom"

import { logoutUser } from "../../services/slices/userSlice"
import useAppDispatch from "../../services/hooks/useAppDispatch"

import styles from "./profile-menu.module.css"


const activeEntry = `text text_type_main-medium mt-7 mb-7 ${styles.entry}`
const inactiveEntry = `${activeEntry} text_color_inactive`

type tProfileMenu = {
  selectedEntry: "profile" | "history" | "signout"
}

const ProfileMenu: FC<tProfileMenu> = ({selectedEntry}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toProfile = () => {
    navigate("/profile")
  }

  const toHistory = () => {
    navigate("/profile/orders")
  }

  const logout = async () => {
    const response = await dispatch(logoutUser()).unwrap()
    if (response.success) navigate("/login")
  }

  return (
    <div>
      <p 
        className={selectedEntry === "profile" ? activeEntry : inactiveEntry}
        onClick={toProfile}
      >
        Профиль
      </p>
      <p 
        className={selectedEntry === "history" ? activeEntry : inactiveEntry}
        onClick={toHistory}
      >
        История заказов
      </p>
      <p 
        className={selectedEntry === "signout" ? activeEntry : inactiveEntry}
        onClick={logout}
      >
        Выход
      </p>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}

export default ProfileMenu
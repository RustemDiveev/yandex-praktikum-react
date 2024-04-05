import { NavLink } from "react-router-dom"

import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./app-header.module.css"


const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.main_container}>
          <div className={styles.additional_container}>
            <NavLink to="/" className={styles.nav_link}>
              {({ isActive }) => (
                <div 
                  className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry} ${isActive ? "" : "text_color_inactive"}`}
                >
                  <BurgerIcon type="primary"/>
                  <span className="text text_type_main-default ml-2 mr-2">Конструктор</span>
                </div>
              )}
            </NavLink>
            <div className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry} text_color_inactive`}>
              <ListIcon type="primary"/>
              <span className="text text_type_main-default ml-2 mr-2">Лента заказов</span>
            </div>
          </div>
          <div className={styles.additional_container}>
            <Logo />
          </div>
          <div className={styles.additional_container}>
            <NavLink to="/profile" className={styles.nav_link}>
              {({ isActive }) => (
                <div className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry} ${isActive ? "" : "text_color_inactive"}`}>
                  <ProfileIcon type="primary"/>
                  <span className="text text_type_main-default ml-2 mr-2">Личный кабинет</span>
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
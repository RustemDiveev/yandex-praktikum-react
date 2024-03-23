import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./app-header.module.css"


const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.main_container}>
          <div className={styles.additional_container}>
            <div className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry}`}>
              <BurgerIcon />
              <span className="text text_type_main-default ml-2 mr-2">Конструктор</span>
            </div>
            <div className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry}`}>
              <ListIcon/>
              <span className="text text_type_main-default ml-2 mr-2">Лента заказов</span>
            </div>
          </div>
          <div className={styles.additional_container}>
            <Logo />
          </div>
          <div className={styles.additional_container}>
            <div className={`mt-4 mb-4 ml-1 mb-1 pl-5 pr-5 ${styles.menu_entry}`}>
              <ProfileIcon/>
              <span className="text text_type_main-default ml-2 mr-2">Личный кабинет</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components"

const ulStyle = {
  display: "flex",
  listStyle: "none",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}

const liStyle = {
  display: "flex",
  alignItems: "center",
  lineHeight: 1,
}

const AppHeader = () => {
  return (
    <nav>
      <ul style={ulStyle}>
        <li style={liStyle} className={"mt-4 mb-4 ml-1 mb-1 pl-5 pr-5"} key={1}>
          <BurgerIcon/>
          <span className="text text_type_main-default ml-2 mr-2">Конструктор</span>
        </li>
        <li style={liStyle} className={"mt-4 mb-4 ml-1 mb-1 pl-5 pr-5"} key={2}>
          <ListIcon/>
          <span className="text text_type_main-default ml-2 mr-2">Лента заказов</span>
        </li>
        <li style={liStyle} className={"mt-4 mb-4"} key={3}>
          <Logo/>
        </li>
        <li style={liStyle} className={"mt-4 mb-4 ml-30"} key={4}>
          <ProfileIcon/>
          <span className="text text_type_main-default ml-2 mr-2">Личный кабинет</span>
        </li>
      </ul>
    </nav>
  )
}

export default AppHeader
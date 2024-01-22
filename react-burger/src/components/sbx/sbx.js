import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Sbx2 = () => {
  return (
    <li style={{
        lineHeight: 1, 
        display: "flex",
        alignItems: "center",
      }}>
      <BurgerIcon/>
      <span>Конструктор</span>
    </li>
  )
}


const Sbx = () => {
  return (
    <ul style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      listStyle: "none"
    }}>
      <Sbx2/>
    </ul>
  )
}



export default Sbx
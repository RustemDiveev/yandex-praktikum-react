import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import data from "../../utils/data"


const ulStyle = {
  display: "flex",
  listStyle: "none"
}

const BurgerIngredients = () => {
  return (
    <>
      <div style={{display: "flex"}}>
        <Tab value="puns" active={true} key={1}>
          Булки
        </Tab>
        <Tab value="sauces" key={2}>
          Соусы
        </Tab>
        <Tab value="toppings" key={3}>
          Начинки
        </Tab>
      </div>
      <div style={{display: "flex"}}>
        <h1 className="text text_type_main-default">Булки</h1>
        <ul>
          {data.filter(item => item.type === "bun").map(item => {
              return (
                <li>{item.name}</li>
              )
          })}
        </ul>
      </div>
    </>
  )
}

export default BurgerIngredients

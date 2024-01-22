import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import data from "../../utils/data"


const ulStyle = {
  display: "grid",
  listStyle: "none",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  gridTemplateColumns: "50% 50%",
}

const divStyle = {
  display: "flex", 
  flexDirection: "column",
}

const liStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
}

const pricePStyle = {
  display: "flex",
  alignItems: "center",
}

const tabContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "stretch",
  gap: "0 0",
  flexWrap: "nowrap",
}

const tabStyle = {
  flexGrow: 1
}

const BurgerIngredients = () => {
  return (
    <>
      <div style={tabContainerStyle}>
        <Tab value="puns" active={true} key={1} style={tabStyle}>
          Булки
        </Tab>
        <Tab value="sauces" key={2} style={tabStyle}>
          Соусы
        </Tab>
        <Tab value="toppings" key={3} style={tabStyle}>
          Начинки
        </Tab>
      </div>
      <div style={divStyle}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul style={ulStyle}>
          {data.filter(item => item.type === "bun").map(item => {
              return (
                <li style={liStyle}>
                  <img src={item.image}/>
                  <p style={pricePStyle}>
                    <span className="text text_type_main-default">20</span>
                    <CurrencyIcon/>
                  </p>
                  <h3 className="text text_type_main-default">{item.name}</h3>
                </li>
              )
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul style={ulStyle}>
          {data.filter(item => item.type === "sauce").map(item => {
              return (
                <li style={liStyle}>
                  <img src={item.image}/>
                  <p style={pricePStyle}>
                    <span className="text text_type_main-default">30</span>
                    <CurrencyIcon/>
                  </p>
                  <h3 className="text text_type_main-default">{item.name}</h3>
                </li>
              )
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul style={ulStyle}>
          {data.filter(item => item.type === "main").map(item => {
              return (
                <li style={liStyle}>
                  <img src={item.image}/>
                  <p style={pricePStyle}>
                    <span className="text text_type_main-default">40</span>
                    <CurrencyIcon/>
                  </p>
                  <h3 className="text text_type_main-default">{item.name}</h3>
                </li>
              )
          })}
        </ul>
      </div>
    </>
  )
}

export default BurgerIngredients

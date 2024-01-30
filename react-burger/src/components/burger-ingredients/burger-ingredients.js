import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-ingredients.module.css"


const BurgerIngredients = ({buns, sauces, toppings}) => {
  return (
    <>
      <div className={styles.tab_container}>
        <Tab value="buns" active={true} key={1} className={styles.tab}>
          Булки
        </Tab>
        <Tab value="sauces" key={2} className={styles.tab}>
          Соусы
        </Tab>
        <Tab value="toppings" key={3} className={styles.tab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.div}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles.ul}>
          {buns.map(item => {
              return (
                <li className={styles.li} key={item._id}>
                  <img src={item.image} alt={item.name}/>
                  <p className={styles.price_p}>
                    <span className="text text_type_main-default">20</span>
                    <CurrencyIcon/>
                  </p>
                  <h3 className="text text_type_main-default">{item.name}</h3>
                </li>
              )
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles.ul}>
          {sauces.map(item => {
              return (
                <li className={styles.li} key={item._id}>
                  <img src={item.image} alt={item.name}/>
                  <p className={styles.price_p}>
                    <span className="text text_type_main-default">30</span>
                    <CurrencyIcon/>
                  </p>
                  <h3 className="text text_type_main-default">{item.name}</h3>
                </li>
              )
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles.ul}>
          {toppings.map(item => {
              return (
                <li className={styles.li} key={item._id}>
                  <img src={item.image} alt={item.name}/>
                  <p className={styles.price_p}>
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

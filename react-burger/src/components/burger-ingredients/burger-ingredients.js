import PropTypes from "prop-types"

import { useRef, useState } from "react"

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-ingredients.module.css"


const BurgerIngredients = ({buns, sauces, toppings, setModalOpen, setSelectedIngredientId}) => {

  const [currentTab, setCurrentTab] = useState("buns")
  const bunsRef = useRef(null)
  const saucesRef = useRef(null)
  const toppingsRef = useRef(null)

  const handleTabClick = (e) => {
    setCurrentTab(e)
    switch (e) {
      case "buns": 
        bunsRef.current.scrollIntoView()
        break
      case "sauces": 
        saucesRef.current.scrollIntoView()
        break
      case "toppings": 
        toppingsRef.current.scrollIntoView()
        break
      default: break
    }
  }

  const handleIngredientClick = (e) => {
    setModalOpen(true)
    setSelectedIngredientId(e.currentTarget.id)
  }

  return (
    <>
      <div className={styles.tab_container}>
        <Tab 
          value="buns" 
          active={currentTab === "buns" ? true : false} 
          key={1} 
          className={styles.tab} 
          onClick={handleTabClick}
        >
          Булки
        </Tab>
        <Tab 
          value="sauces" 
          active={currentTab === "sauces" ? true : false} 
          key={2} 
          className={styles.tab} 
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab 
          value="toppings" 
          active={currentTab === "toppings" ? true : false} 
          key={3} 
          className={styles.tab}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.div}>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>Булки</h2>
        <ul className={styles.ul}>
          {buns.map(item => {
              return (
                <li id={item._id} className={styles.li} key={item._id} onClick={handleIngredientClick}>
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
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>Соусы</h2>
        <ul className={styles.ul}>
          {sauces.map(item => {
              return (
                <li id={item._id} className={styles.li} key={item._id} onClick={handleIngredientClick}>
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
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={toppingsRef}>Начинки</h2>
        <ul className={styles.ul}>
          {toppings.map(item => {
              return (
                <li id={item._id} className={styles.li} key={item._id} onClick={handleIngredientClick}>
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

BurgerIngredients.propTypes = {
  buns: PropTypes.array, 
  sauces: PropTypes.array, 
  toppings: PropTypes.array, 
  setModalOpen: PropTypes.func, 
  setSelectedIngredientId: PropTypes.func
}

export default BurgerIngredients

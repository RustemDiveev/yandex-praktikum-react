import PropTypes from "prop-types"

import { useRef, useState, useMemo, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { useDrag } from "react-dnd"

import { Tab, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import { selectIngredients, ingredientSelected, selectCounter } from "../../services/slices/ingredientsSlice"

import styles from "./burger-ingredients.module.css"


const BurgerIngredient = ({ingredient, handleIngredientClick, count}) => {
  const [ , drag] = useDrag({
    type: "burgerIngredient",
    item: {ingredient}
  })

  return (
    <li 
      ref={drag}
      id={ingredient._id}
      className={styles.li}
      key={ingredient._id}
      onClick={handleIngredientClick}
      draggable
    >
      {Boolean(count) && <Counter count={count} size="default"/>}
      <img src={ingredient.image} alt={ingredient.name} draggable={false}/>
      <p className={styles.price_p}>
        <span className="text text_type_main-default">{ingredient.price}</span>
        <CurrencyIcon/>
      </p>
      <h3 className="text text_type_main-default">{ingredient.name}</h3>
    </li>
  )
}


const BurgerIngredients = ({setModalOpen}) => {

  const [currentTab, setCurrentTab] = useState("buns")
  const bunsRef = useRef(null)
  const saucesRef = useRef(null)
  const toppingsRef = useRef(null)
  const ingredientRef = useRef(null)

  const ingredients = useSelector(selectIngredients)
  const counter = useSelector(selectCounter)

  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === "sauce"), [ingredients])
  const toppings = useMemo(() => ingredients.filter(ingredient => ingredient.type === "main"), [ingredients])

  const dispatch = useDispatch()

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
    setModalOpen()
    dispatch(ingredientSelected(e.currentTarget.id))
  }

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop 
    const headerOffsets = Array.from(e.target.children).filter(element => element.localName === "h2").map(element => {return element.offsetTop})
    if (currentScrollTop < headerOffsets[0]) setCurrentTab("buns")
    if (currentScrollTop > headerOffsets[0] && currentScrollTop < headerOffsets[1]) setCurrentTab("sauces")
    if (currentScrollTop > headerOffsets[1]) setCurrentTab("toppings")
  }

  useEffect(() => {
    const ingredientDomNode = ingredientRef.current
    ingredientDomNode.addEventListener("scroll", handleScroll)
    return () => ingredientDomNode.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className={styles.div} onScroll={handleScroll} ref={ingredientRef}>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
          Булки
        </h2>
        <ul className={styles.ul}>
          {buns.map(item => <BurgerIngredient 
            key={item._id}
            ingredient={item} 
            handleIngredientClick={handleIngredientClick}
            count={counter[item._id]}
          />)}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          Соусы
        </h2>
        <ul className={styles.ul}>
          {sauces.map(item => <BurgerIngredient 
            key={item._id}
            ingredient={item} 
            handleIngredientClick={handleIngredientClick}
            count={counter[item._id]}
          />)}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={toppingsRef} key={6}>
          Начинки
        </h2>
        <ul className={styles.ul}>
          {toppings.map(item => <BurgerIngredient 
            key={item._id} 
            ingredient={item} 
            handleIngredientClick={handleIngredientClick}
            count={counter[item._id]}
          />)}
        </ul>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  setModalOpen: PropTypes.func, 
}

export default BurgerIngredients

import { useRef, useState, useMemo, FC, UIEvent } from "react"

import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { useDrag } from "react-dnd"

import { Tab, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import { selectIngredients, selectCounter } from "../../services/slices/ingredientsSlice"
import IIngredient from "../../interfaces/Ingredient"

import styles from "./burger-ingredients.module.css"


type TBurgerIngredient = {
  ingredient: IIngredient,
  count: number
}

const BurgerIngredient: FC<TBurgerIngredient> = ({ingredient, count}) => {
  const [ , drag] = useDrag({
    type: "burgerIngredient",
    item: ingredient
  })

  return (
    <li 
      ref={drag}
      id={ingredient._id}
      className={styles.li}
      key={ingredient._id}
      draggable
    >
      {Boolean(count) && <Counter count={count} size="default"/>}
      <img src={ingredient.image} alt={ingredient.name} draggable={false}/>
      <p className={styles.price_p}>
        <span className="text text_type_main-default">{ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </p>
      <h3 className="text text_type_main-default">{ingredient.name}</h3>
    </li>
  )
}


const BurgerIngredients = () => {

  const [currentTab, setCurrentTab] = useState("buns")
  const bunsRef = useRef<HTMLHeadingElement>(null)
  const saucesRef = useRef<HTMLHeadingElement>(null)
  const toppingsRef = useRef<HTMLHeadingElement>(null)
  const ingredientRef = useRef<HTMLHeadingElement>(null)

  const ingredients = useSelector(selectIngredients)
  const counter = useSelector(selectCounter)

  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === "sauce"), [ingredients])
  const toppings = useMemo(() => ingredients.filter(ingredient => ingredient.type === "main"), [ingredients])

  const location = useLocation()

  const handleTabClick = (tabName: string) => {
    setCurrentTab(tabName)
    switch (tabName) {
      case "buns": 
        bunsRef.current!.scrollIntoView()
        break
      case "sauces": 
        saucesRef.current!.scrollIntoView()
        break
      case "toppings": 
        toppingsRef.current!.scrollIntoView()
        break
      default: break
    }
  }


  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const currentScrollTop = target.scrollTop 
    const headerOffsets = Array
      .from(target.children)
      .filter(element => element.localName === "h2")
      .map(element => {return (element as HTMLElement).offsetTop})
    if (currentScrollTop < headerOffsets[0]) setCurrentTab("buns")
    if (currentScrollTop > headerOffsets[0] && currentScrollTop < headerOffsets[1]) setCurrentTab("sauces")
    if (currentScrollTop > headerOffsets[1]) setCurrentTab("toppings")
  }

  return (
    <>
      <div className={styles.tab_container}>
        <Tab 
          value="buns" 
          active={currentTab === "buns" ? true : false} 
          key={1} 
          onClick={handleTabClick}
        >
          Булки
        </Tab>
        <Tab 
          value="sauces" 
          active={currentTab === "sauces" ? true : false} 
          key={2} 
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab 
          value="toppings" 
          active={currentTab === "toppings" ? true : false} 
          key={3} 
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
          {buns.map(item => 
          <Link 
            to={`/ingredients/${item._id}`}
            state={{ background: location }}
            className={styles.link}
            key={item._id}
          >
            <BurgerIngredient 
              key={item._id}
              ingredient={item} 
              count={counter[item._id]}
            />
          </Link>
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          Соусы
        </h2>
        <ul className={styles.ul}>
          {sauces.map(item => 
            <Link 
              to={`/ingredients/${item._id}`}
              state={{ background: location }}
              className={styles.link}
              key={item._id}
            >
              <BurgerIngredient 
                key={item._id}
                ingredient={item} 
                count={counter[item._id]}
              />
            </Link>
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={toppingsRef} key={6}>
          Начинки
        </h2>
        <ul className={styles.ul}>
          {toppings.map(item => 
            <Link 
              to={`/ingredients/${item._id}`}
              state={{ background: location }}
              className={styles.link}
              key={item._id}
            >
              <BurgerIngredient 
                key={item._id}
                ingredient={item} 
                count={counter[item._id]}
              />
            </Link>
          )}
        </ul>
      </div>
    </>
  )
}

export default BurgerIngredients

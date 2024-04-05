import { useMemo, useEffect, useState, useRef, FC } from "react"

import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { useDrop, useDrag } from "react-dnd"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { 
  selectIngredients, 
  selectBun, 
  ingredientAdded, 
  ingredientDeleted,
  reorderIngredients
} from "../../services/slices/constructorSlice"
import { postOrder } from "../../services/slices/orderSlice"
import { counterIncreased, counterDecreased } from "../../services/slices/ingredientsSlice"
import { IIngredient } from "../../interfaces/ingredient"

import styles from "./burger-constructor.module.css"

const Ingredient: FC<{ingredient: IIngredient}> = ({ ingredient }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    drop(uniqueId: {uniqueId: string}) {
      dispatch(reorderIngredients(uniqueId, ingredient.uniqueId!))
    }
  })

  const [, drag] = useDrag({
    type: "constructorIngredient",
    item: { uniqueId: ingredient.uniqueId }
  })

  const handleClose = (elem: IIngredient) => {
    return () => {
      dispatch(ingredientDeleted(elem.uniqueId))
      dispatch(counterDecreased(elem._id))
    }
  }

  drag(drop(ref))

  return (
    <li ref={ref}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image_mobile}
        price={ingredient.price}
        handleClose={handleClose(ingredient)}
      />
    </li>
  )
}


const BurgerConstructor = ({setModalOpen}) => { 
  const [totalPrice, setTotalPrice] = useState(0)
  const ingredients = useSelector(selectIngredients)
  const bun = useSelector(selectBun)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [, dropTarget] = useDrop({
    accept: "burgerIngredient",
    drop(ingredient) {
      dispatch(ingredientAdded(ingredient))
      dispatch(counterIncreased(ingredient.ingredient._id))
    }
  })

  const calculatedTotalPrice = useMemo(() => {
    if (!bun) return 0
    let result = bun.price * 2
    result = ingredients.reduce((prev, current) => prev + current.price, result)
    return result
  }, [ingredients, bun])

  const onOrderClick = async () => {
    if (localStorage.getItem("accessToken")) {
      if (bun !== null && ingredients.length > 0) {
        const ingredientsIds: {ingredients: string[]} = {ingredients: [bun._id, ...ingredients.map((elem: IIngredient) => elem._id), bun._id]}
        dispatch(postOrder(ingredientsIds))
        setModalOpen()
      }
    } else {
      navigate("/login")
    }

  }

  useEffect(() => {
      setTotalPrice(calculatedTotalPrice)
  }, [ingredients, bun, calculatedTotalPrice, setTotalPrice])

  return (
    <div ref={dropTarget}>
      <div className={"ml-10"}>
        {bun && <ConstructorElement
          type="top"
          text={`${bun.name} (верх)`}
          thumbnail={bun.image_mobile}
          price={bun.price}
          isLocked
        />}
      </div>
      <ul className={`${styles.ul} pl-4`}>
        {ingredients && ingredients.map((elem: IIngredient) => (
          <Ingredient ingredient={elem} key={elem.uniqueId}/>
        ))}
      </ul>
      <div className={"ml-10"}>
        {bun && <ConstructorElement
          extraClass={"ml-10"}
          type="bottom"
          text={`${bun.name} (низ)`}
          thumbnail={bun.image_mobile}
          price={bun.price}
          isLocked
        />}
      </div>
      <div className={`${styles.footer} mt-4`}>
        <p></p>
        <p className="text text_type_main-large">{totalPrice}<CurrencyIcon type="primary"/></p>
        <Button 
          htmlType="button" 
          type="primary" 
          size="medium" 
          children="Оформить заказ"
          onClick={onOrderClick}
        />
      </div>    
    </div>
  )
}

export default BurgerConstructor
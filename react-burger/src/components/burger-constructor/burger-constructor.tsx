import { useMemo, useEffect, useState, useRef, FC } from "react"

import { useNavigate } from "react-router-dom"

import { useDrop, useDrag } from "react-dnd"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

import useAppDispatch from "../../services/hooks/useAppDispatch"
import useAppSelector from "../../services/hooks/useAppSelector"

import { 
  selectIngredients, 
  selectBun, 
  ingredientAdded, 
  ingredientDeleted,
  reorderIngredients
} from "../../services/slices/constructorSlice"
import { postOrder } from "../../services/slices/orderSlice"
import { counterIncreased, counterDecreased } from "../../services/slices/ingredientsSlice"
import IIngredient from "../../interfaces/Ingredient"

import styles from "./burger-constructor.module.css"

interface IIngredientProps {
  ingredient: IIngredient
}

const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
  const ref = useRef(null)
  const dispatch = useAppDispatch()

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    drop(uniqueId) {
      dispatch(reorderIngredients({draggedId: uniqueId, droppedId: ingredient.uniqueId}))
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

interface IBurgerConstructorProps {
  setModalOpen: () => void
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({setModalOpen}) => { 
  const [totalPrice, setTotalPrice] = useState(0)
  const ingredients = useAppSelector(selectIngredients)
  const bun = useAppSelector(selectBun)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const [, dropTarget] = useDrop({
    accept: "burgerIngredient",
    drop(ingredient: IIngredient) {
      dispatch(ingredientAdded(ingredient))
      dispatch(counterIncreased(ingredient._id))
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
        const ingredientsIds = {ingredients: [bun._id, ...ingredients.map(elem => elem._id), bun._id]}
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
    <div ref={dropTarget} id={"BURGER_CONSTRUCTOR"}>
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
        {ingredients && ingredients.map((elem) => (
          <Ingredient ingredient={elem} key={elem.uniqueId}/>
        ))}
      </ul>
      <div className={"ml-10"}>
        {bun && <ConstructorElement
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
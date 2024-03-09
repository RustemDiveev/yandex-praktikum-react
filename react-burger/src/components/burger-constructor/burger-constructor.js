import PropTypes from "prop-types"

import { useMemo, useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"

import { useDrop } from "react-dnd"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

import { 
  selectIngredients, 
  selectBun, 
  ingredientAdded, 
  ingredientDeleted 
} from "../../services/slices/constructorSlice"
import { postOrder } from "../../services/slices/orderSlice"
import { counterIncreased, counterDecreased } from "../../services/slices/ingredientsSlice"

import styles from "./burger-constructor.module.css"


const BurgerConstructor = ({setModalOpen}) => { 
  const [totalPrice, setTotalPrice] = useState(0)
  const ingredients = useSelector(selectIngredients)
  const bun = useSelector(selectBun)
  const dispatch = useDispatch()

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
    const ingredientsIds = {ingredients: [bun._id, ...ingredients.map(elem => elem._id), bun._id]}
    dispatch(postOrder(ingredientsIds))
    setModalOpen(true)
  }

  const handleClose = (elem, index) => {
    return () => {
      dispatch(ingredientDeleted(index))
      dispatch(counterDecreased(elem._id))
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
        {ingredients && ingredients.map((elem, index) => (
          <li key={index}>
            <DragIcon/>
            <ConstructorElement
              text={elem.name}
              thumbnail={elem.image_mobile}
              price={elem.price}
              handleClose={handleClose(elem, index)}
            />
          </li>
        ))}
      </ul>
      <div className={"ml-10"}>
        {bun && <ConstructorElement
          className={"ml-10"}
          type="bottom"
          text={`${bun.name} (низ)`}
          thumbnail={bun.image_mobile}
          price={bun.price}
          isLocked
        />}
      </div>
      <div className={`${styles.footer} mt-4`}>
        <p></p>
        <p className="text text_type_main-large">{totalPrice}<CurrencyIcon/></p>
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

BurgerConstructor.propTypes = {
  setModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor
import PropTypes from "prop-types"

import { useContext, useMemo, useEffect } from "react"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

import IngredientsContext from "../../services/ingredientsContext"
import OrderContext from "../../services/orderContext"

import { ORDERS_URL } from "../../settings/urls"

import styles from "./burger-constructor.module.css"


const BurgerConstructor = ({setModalOpen}) => { 
  const {bun, ingredients, totalPrice, setTotalPrice} = useContext(IngredientsContext)
  const { setOrderNumber } = useContext(OrderContext)

  const calculatedTotalPrice = useMemo(() => {
    let result = bun.price * 2
    result = ingredients.reduce((prev, current) => prev + current.price, result)
    return result
  }, [ingredients, bun])

  const onOrderClick = async () => {
    const ingredientsIds = {ingredients: [bun._id, ...ingredients.map(elem => elem._id), bun._id]}
    
    try {
      const response = await fetch(
        ORDERS_URL, 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(ingredientsIds)
        }
      )
      const responseJson = await response.json()
      const responseStatus = await responseJson.success
      if (!responseStatus) {
        throw new Error ("Запрос при оформлении заказа вернул ошибку")
      } 
      setOrderNumber(responseJson.order.number)
      setModalOpen(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
      setTotalPrice(calculatedTotalPrice)
  }, [ingredients, bun, calculatedTotalPrice, setTotalPrice])

  return (
    <>
      <div className={"ml-10"}>
        <ConstructorElement
          type="top"
          text={`${bun.name} (верх)`}
          thumbnail={bun.image_mobile}
          price={bun.price}
          isLocked
        />
      </div>
      <ul className={`${styles.ul} pl-4`}>
        {ingredients.map((elem) => (
          <li key={elem._id}>
            <DragIcon/>
            <ConstructorElement
              text={elem.name}
              thumbnail={elem.image_mobile}
              price={elem.price}
            />
          </li>
        ))}
      </ul>
      <div className={"ml-10"}>
        <ConstructorElement
          className={"ml-10"}
          type="bottom"
          text={`${bun.name} (низ)`}
          thumbnail={bun.image_mobile}
          price={bun.price}
          isLocked
        />
      </div>
      <div className={styles.footer}>
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
    </>
  )
}

BurgerConstructor.propTypes = {
  setModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor
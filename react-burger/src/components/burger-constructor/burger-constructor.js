import PropTypes from "prop-types"

import { useContext, useMemo, useEffect } from "react"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
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
        let ingredientsIds = ingredients.map(elem => elem._id)
        ingredientsIds.push(bun._id)
        ingredientsIds.push(bun._id)
        
        try {
            const response = await fetch(
                ORDERS_URL, 
                {
                    method: "POST",
                    body: ingredientsIds
                }
            )
            const responseJson = await response.json()
            const responseStatus = await responseJson.success
            if (!responseStatus) throw ("Запрос при оформлении заказа вернул ошибку")
            setOrderNumber(responseJson.order.number)
            setModalOpen(true)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setTotalPrice(calculatedTotalPrice)
    }, [ingredients, bun])

    return (
        <>
            <ul className={styles.ul}>
                <ConstructorElement
                    key={`${bun._id}top`}
                    type="top"
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    isLocked
                />
                {ingredients.map((elem) => (
                    <li key={elem._id}>
                        <ConstructorElement
                            text={elem.name}
                            thumbnail={elem.image_mobile}
                            price={elem.price}
                        />
                    </li>
                ))}
                <ConstructorElement
                    key={`${bun._id}bottom`}
                    type="bottom"
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    isLocked
                />
                <li className={styles.footer} key={-1}>
                    <p></p>
                    <p className="text text_type_main-large">{totalPrice}<CurrencyIcon/></p>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="medium" 
                        children="Оформить заказ"
                        onClick={onOrderClick}
                    />
                </li>
            </ul>            
        </>
    )
}

BurgerConstructor.propTypes = {
    setModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor
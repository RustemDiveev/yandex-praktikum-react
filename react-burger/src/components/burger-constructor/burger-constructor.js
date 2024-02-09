import PropTypes from "prop-types"

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./burger-constructor.module.css"

const BurgerConstructor = ({bun, ingredients, setModalOpen}) => {
    return (
        <>
            <ul className={styles.ul}>
                <ConstructorElement
                    key={bun._id}
                    type="top"
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image_mobile}
                    price={20}
                    isLocked
                />
                {ingredients.map((elem) => (
                    <li key={elem._id}>
                        <ConstructorElement
                            text={elem.name}
                            thumbnail={elem.image_mobile}
                            price={20}
                        />
                    </li>
                ))}
                <ConstructorElement
                    key={bun._id}
                    type="bottom"
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image_mobile}
                    price={20}
                    isLocked
                />
                <li className={styles.footer} key={-1}>
                    <p></p>
                    <p className="text text_type_main-large">610 <CurrencyIcon/></p>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="medium" 
                        children="Оформить заказ"
                        onClick={() => setModalOpen(true)}
                    />
                </li>
            </ul>            
        </>
    )
}

BurgerConstructor.propTypes = {
    bun: PropTypes.object.isRequired,
    ingredients: PropTypes.array.isRequired,
    setModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor
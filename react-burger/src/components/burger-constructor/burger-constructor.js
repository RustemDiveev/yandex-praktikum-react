import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./burger-constructor.module.css"


const BurgerConstructor = ({ingredients, setModalOpen}) => {
    return (
        <>
            <ul className={styles.ul}>
                {ingredients.map((elem, key) => (
                    <li key={key}>
                        <ConstructorElement
                            text={elem.name}
                            thumbnail={elem.image_mobile}
                            price={20}
                        />
                    </li>
                ))}
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

export default BurgerConstructor
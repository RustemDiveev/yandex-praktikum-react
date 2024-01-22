import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import data from "../../utils/data"

const ulStyle = {
    display: "flex",
    listStyle: "none",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    height: "80vh",
}

const footerLiStyle = {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    alignItems: "center",
}

const BurgerConstructor = () => {
    return (
        <>
            <ul style={ulStyle}>
                {data.map((elem, key) => (
                    <li key={key}>
                        <ConstructorElement
                            text={elem.name}
                            thumbnail={elem.image_mobile}
                            price={20}
                        />
                    </li>
                ))}
                <li style={footerLiStyle} key={-1}>
                    <p></p>
                    <p className="text text_type_main-large">610 <CurrencyIcon/></p>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="medium" 
                        children="Оформить заказ"
                    />
                </li>
            </ul>            
        </>
    )
}

export default BurgerConstructor
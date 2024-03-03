import { useState, useEffect } from "react"

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import IngredientsContext from "../../services/ingredientsContext";
import OrderContext from "../../services/orderContext";

import { INGREDIENTS_URL } from "../../settings/urls";

import styles from "./app.module.css"


const App = () => {
  const [initialized, setInitialized] = useState(false)

  const [saucesToppingsData, setSaucesToppingsData] = useState()

  const [ingredientDetailsOpen, setIngredientDetailsOpen] = useState(false)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
   
  const [bun, setBun] = useState();

  const [totalPrice, setTotalPrice] = useState()

  const [orderNumber, setOrderNumber] = useState()

  const fetchData = async () => {
    try {
      const response = await fetch(INGREDIENTS_URL)
      const responseJson = await response.json()
      const responseStatus = await responseJson.success

      if (!responseStatus) throw new Error ("Запрос к данным вернул ошибку")

      const result = await responseJson.data
      setSaucesToppingsData(result.filter(item => ["sauce", "main"].includes(item.type)))
      setBun(result.find(item => item.name === "Краторная булка N-200i"))
      setInitialized(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => fetchData, [])

  return (
    <>
      <header className={styles.header}>
        <AppHeader/>
      </header>
      {initialized && 
      <main className={`mr-20 ml-20 ${styles.main}`}>
        <section className={`mr-5 ml-5 ${styles.section}`}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <BurgerIngredients setModalOpen={setIngredientDetailsOpen}/>
          {
            ingredientDetailsOpen && <Modal setOpen={setIngredientDetailsOpen} header="Детали ингредиента">
              <IngredientDetails/>
            </Modal>
          }
        </section>
        <section className={`mr-5 ml-5 mt-30 ${styles.section}`}>
          <IngredientsContext.Provider value={{ingredients: saucesToppingsData, bun, totalPrice, setTotalPrice}}>
            <OrderContext.Provider value={{orderNumber, setOrderNumber}}>
              <BurgerConstructor 
                setModalOpen={setOrderDetailsOpen}
              />
              {
                orderDetailsOpen && 
                <Modal setOpen={setOrderDetailsOpen}>
                  <OrderDetails/>
                </Modal>
              }
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </section>
      </main>}
    </>
  );
}

export default App;

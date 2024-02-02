import { useState, useEffect, useMemo } from "react"

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import styles from "./app.module.css"


const App = () => {
  const [allData, setAllData] = useState()
  const [initialized, setInitialized] = useState(false)
  const [bunsData, setBunsData] = useState()
  const [saucesData, setSaucesData] = useState()
  const [toppingsData, setToppingsData] = useState()
  const [ingredientDetailsOpen, setIngredientDetailsOpen] = useState(false)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
  const [selectedIngredientId, setSelectedIngredientId] = useState()

  const selectedIngredientData = useMemo(() => {
    if (initialized && selectedIngredientId) {
      const {image_large, name, calories, 
        proteins, fat, carbohydrates} = allData.find(item => item._id === selectedIngredientId)
      return {image_large, name, calories, proteins, fat, carbohydrates}
    }
  }, [selectedIngredientId, allData ,initialized])

  const fetchData = async () => {
    try {
      const url = "https://norma.nomoreparties.space/api/ingredients"
      const response = await fetch(url)
      const responseJson = await response.json()
      const responseStatus = await responseJson.success

      if (!responseStatus) throw ("Запрос к данным вернул ошибку")

      const result = await responseJson.data
      setAllData(result)
      setBunsData(result.filter(item => item.type === "bun"))
      setSaucesData(result.filter(item => item.type === "sauce"))
      setToppingsData(result.filter(item => item.type === "main"))
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
          <BurgerIngredients 
            buns={bunsData} 
            sauces={saucesData} 
            toppings={toppingsData}
            setModalOpen={setIngredientDetailsOpen}
            setSelectedIngredientId={setSelectedIngredientId}
          />
          {
            ingredientDetailsOpen && <Modal setOpen={setIngredientDetailsOpen} header="Детали ингредиента">
              <IngredientDetails selectedIngredientData={selectedIngredientData}/>
            </Modal>
          }
        </section>
        <section className={`mr-5 ml-5 mt-30 ${styles.section}`}>
          <BurgerConstructor ingredients={allData} setModalOpen={setOrderDetailsOpen}/>
          {
            orderDetailsOpen && <Modal setOpen={setOrderDetailsOpen}>
              <OrderDetails/>
            </Modal>
          }
        </section>
      </main>}
    </>
  );
}

export default App;

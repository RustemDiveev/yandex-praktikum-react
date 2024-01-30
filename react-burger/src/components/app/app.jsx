import { useState, useEffect } from "react"

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";

import styles from "./app.module.css"


const App = () => {
  const [loading, setLoading] = useState(false)
  const [allData, setAllData] = useState()
  const [bunsData, setBunsData] = useState()
  const [saucesData, setSaucesData] = useState()
  const [toppingsData, setToppingsData] = useState()
  const [ingredientDetailsOpen, setIngredientDetailsOpen] = useState(false)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const url = "https://norma.nomoreparties.space/api/ingredients"
      const response = await fetch(url)
      const responseJson = await response.json()
      const result = await responseJson.data
      setAllData(result)
      setBunsData(result.filter(item => item.type === "bun"))
      setSaucesData(result.filter(item => item.type === "sauce"))
      setToppingsData(result.filter(item => item.type === "main"))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => fetchData, [])

  return (
    <>
      <header className={styles.header}>
        <AppHeader/>
      </header>
      {!loading && allData && 
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
          />
          <IngredientDetails 
            open={ingredientDetailsOpen} 
            setOpen={setIngredientDetailsOpen}
          />
        </section>
        <section className={`mr-5 ml-5 mt-30 ${styles.section}`}>
          <BurgerConstructor ingredients={allData}/>
        </section>
      </main>}
    </>
  );
}

export default App;

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"


function App() {
  return (
    <>
      <header className={styles.header}>
        <AppHeader/>
      </header>
      <main className={`mr-20 ml-20 ${styles.main}`}>
        <section className={`mr-5 ml-5 ${styles.section}`}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <BurgerIngredients/>
        </section>
        <section className={`mr-5 ml-5 mt-30 ${styles.section}`}>
          <BurgerConstructor/>
        </section>
      </main>
    </>
  );
}

export default App;

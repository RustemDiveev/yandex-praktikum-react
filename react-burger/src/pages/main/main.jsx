import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch } from "react-redux";

import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";
import { ingredientUnselected } from "../../services/slices/ingredientsSlice";
import useModal from "../../hooks/useModal";

import styles from "./main.module.css"


const Main = () => {
  const ingredientModal = useModal()
  const orderModal = useModal()
  const dispatch = useDispatch()

  const handleIngredientDetailsClose = () => {
    dispatch(ingredientUnselected())
    ingredientModal.closeModal()
  }
  
  return (
    <>
      <AppHeader/>
      <main className={`mr-20 ml-20 ${styles.main}`}>
        <DndProvider backend={HTML5Backend}>
          <section className={`mr-5 ml-5 ${styles.section}`}>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients setModalOpen={ingredientModal.openModal}/>
            {
              ingredientModal.modalOpen && <Modal closeModal={handleIngredientDetailsClose} header="Детали ингредиента">
                <IngredientDetails/>
              </Modal>
            }
          </section>
          <section className={`mr-5 ml-5 mt-30 ${styles.section}`}>
            <BurgerConstructor 
              setModalOpen={orderModal.openModal}
            />
            {
              orderModal.modalOpen && 
              <Modal closeModal={orderModal.closeModal}>
                <OrderDetails/>
              </Modal>
            }
          </section>
        </DndProvider>
      </main>
    </>
  );
}

export default Main;

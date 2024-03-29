import { useParams } from "react-router-dom"

import { useSelector } from "react-redux"

import AppHeader from "../../components/app-header/app-header"
import { selectIngredient, selectIngredientsLoaded } from "../../services/slices/ingredientsSlice"
import styles from "./ingredient.module.css"


const Ingredient = () => {
  const { id } = useParams()
  const ingredient = useSelector(state => selectIngredient(state, id))
  const ingredientsLoaded = useSelector(selectIngredientsLoaded)

  if (!ingredientsLoaded) {
    return null
  }

  return (
    <>
      <AppHeader />
      <div className={`${styles.main_container} mt-30`}>
        <p className="text text_type_main-large">
          Детали ингредиента
        </p>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <p className="text text_type_main-medium">
          {ingredient.name}
        </p>
        <div className={`mt-10 mb-15 ${styles.container_nutrition}`}>
          <div className={styles.nutrition}>
            <p className={"text text_type_main-default text_color_inactive"}>
              Калории,ккал
            </p>
            <p className={"text text_type_digits-default text_color_inactive"}>
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className={"text text_type_main-default text_color_inactive"}>
              Белки, г
            </p>
            <p className={"text text_type_digits-default text_color_inactive"}>
              {ingredient.proteins}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className={"text text_type_main-default text_color_inactive"}>
              Жиры, г
            </p>
            <p className={"text text_type_digits-default text_color_inactive"}>
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className={"text text_type_main-default text_color_inactive"}>
              Углеводы, г
            </p>
            <p className={"text text_type_digits-default text_color_inactive"}>
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ingredient
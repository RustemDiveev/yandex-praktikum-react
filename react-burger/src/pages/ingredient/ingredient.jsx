import { useParams } from "react-router-dom"

import { useSelector } from "react-redux"

import { selectIngredient, selectIngredientsLoaded } from "../../services/slices/ingredientsSlice"
import IngredientNutrition from "../../components/ingredient-nutrition/ingredient-nutrition"
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
      <div className={`${styles.main_container} mt-30`}>
        <p className="text text_type_main-large">
          Детали ингредиента
        </p>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <p className="text text_type_main-medium">
          {ingredient.name}
        </p>
        <div className={`mt-10 mb-15 ${styles.container_nutrition}`}>
          <IngredientNutrition
            calories={ingredient.calories}
            proteins={ingredient.proteins}
            fat={ingredient.fat}
            carbohydrates={ingredient.carbohydrates}
          />
        </div>
      </div>
    </>
  )
}

export default Ingredient
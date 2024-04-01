import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import IngredientNutrition from "../ingredient-nutrition/ingredient-nutrition"
import { selectIngredient, selectIngredientsLoaded } from "../../services/slices/ingredientsSlice"
import styles from "./ingredient-details.module.css"


const IngredientDetails = () => {
  const { id } = useParams()
  const selectedIngredientData = useSelector(state => selectIngredient(state, id))
  const ingredientsLoaded = useSelector(selectIngredientsLoaded)

  if (!ingredientsLoaded) return null

  return (
    <div className={`ml-10 mr-10 mb-10 ${styles.container}`}>
      <img 
        src={selectedIngredientData.image_large} 
        alt={selectedIngredientData.name}
        className={"mb-2"}
      />
      <p className={"mt-2 mb-4 text text_type_main-medium"}>
        {selectedIngredientData.name}
      </p>
      <div className={`mt-4 mb-15 ${styles.container_nutrition}`}>
        <IngredientNutrition
          calories={selectedIngredientData.calories}
          proteins={selectedIngredientData.proteins}
          fat={selectedIngredientData.fat}
          carbohydrates={selectedIngredientData.carbohydrates}
        />
      </div>
    </div>
  )
}

export default IngredientDetails;
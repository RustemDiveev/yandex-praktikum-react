import { useParams } from "react-router-dom"

import IngredientNutrition from "../ingredient-nutrition/ingredient-nutrition"
import { selectIngredient, selectIngredientsLoaded } from "../../services/slices/ingredientsSlice"
import useAppSelector from "../../services/hooks/useAppSelector"
import styles from "./ingredient-details.module.css"


const IngredientDetails = () => {
  const { id } = useParams()
  const selectedIngredientData = useAppSelector(state => selectIngredient(state, id!))!
  const ingredientsLoaded = useAppSelector(selectIngredientsLoaded)

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
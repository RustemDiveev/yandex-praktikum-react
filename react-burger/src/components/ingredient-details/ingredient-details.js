import PropTypes from "prop-types"

import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./ingredient-details.module.css"


const IngredientDetails = ({open, setOpen, selectedIngredientData}) => {
  return (
    <ModalOverlay 
      open={open} 
      setOpen={setOpen}
      header="Детали ингредиента"
    >
      <div className={`ml-10 mr-10 mb-10 ${styles.container}`}>
        {
        selectedIngredientData && 
        <>
          <img 
            src={selectedIngredientData.image} 
            alt={selectedIngredientData.name}
            className={"mb-2"}
          />
          <p className={"mt-2 mb-4 text text_type_main-medium"}>
            {selectedIngredientData.name}
          </p>
          <div className={`mt-4 mb-15 ${styles.container_nutrition}`}>
            <div className={styles.nutrition}>
              <p className={"text text_type_main-default"}>
                Калории,ккал
              </p>
              <p className={"text text_type_digits-default"}>
                {selectedIngredientData.calories}
              </p>
            </div>
            <div className={styles.nutrition}>
              <p className={"text text_type_main-default"}>
                Белки, г
              </p>
              <p className={"text text_type_digits-default"}>
                {selectedIngredientData.proteins}
              </p>
            </div>
            <div className={styles.nutrition}>
              <p className={"text text_type_main-default"}>
                Жиры, г
              </p>
              <p className={"text text_type_digits-default"}>
                {selectedIngredientData.fat}
              </p>
            </div>
            <div className={styles.nutrition}>
              <p className={"text text_type_main-default"}>
                Углеводы, г
              </p>
              <p className={"text text_type_digits-default"}>
                {selectedIngredientData.carbohydrates}
              </p>
            </div>
          </div>
        </>
        }
      </div>
    </ModalOverlay>
  )
}

IngredientDetails.propTypes = {
  open: PropTypes.bool, 
  setOpen: PropTypes.func, 
  selectedIngredientData: PropTypes.exact({
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
  })
}

export default IngredientDetails;
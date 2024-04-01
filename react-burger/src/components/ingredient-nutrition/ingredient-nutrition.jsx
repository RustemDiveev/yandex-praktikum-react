import styles from "./ingredient-nutrition.module.css"

const IngredientNutrition = ({calories, proteins, fat, carbohydrates}) => (
  <>
    <div className={styles.nutrition}>
      <p className={"text text_type_main-default text_color_inactive"}>
        Калории,ккал
      </p>
      <p className={"text text_type_digits-default text_color_inactive"}>
        {calories}
      </p>
    </div>
    <div className={styles.nutrition}>
      <p className={"text text_type_main-default text_color_inactive"}>
        Белки, г
      </p>
      <p className={"text text_type_digits-default text_color_inactive"}>
        {proteins}
      </p>
    </div>
    <div className={styles.nutrition}>
      <p className={"text text_type_main-default text_color_inactive"}>
        Жиры, г
      </p>
      <p className={"text text_type_digits-default text_color_inactive"}>
        {fat}
      </p>
    </div>
    <div className={styles.nutrition}>
      <p className={"text text_type_main-default text_color_inactive"}>
        Углеводы, г
      </p>
      <p className={"text text_type_digits-default text_color_inactive"}>
        {carbohydrates}
      </p>
    </div>
  </>
)

export default IngredientNutrition
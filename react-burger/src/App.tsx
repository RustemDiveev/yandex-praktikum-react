import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import Sbx from "./components/sbx/sbx";


const headerStyle = {
}

const mainStyle = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}

// Если убрать React.CSSProperties - то ругается на неправильное значение flexDirection
const sectionStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
  scrollY: "auto"
} as React.CSSProperties

function App() {
  return (
    <>
      <header style={headerStyle}>
        <AppHeader/>
      </header>
      <main style={mainStyle} className="mr-20 ml-20">
        <section style={sectionStyle} className="mr-5 ml-5">
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <BurgerIngredients/>
        </section>
        <section style={sectionStyle} className="mr-5 ml-5">
          <BurgerIngredients/>
        </section>
      </main>
    </>
  );
}

export default App;

import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import Sbx from "./components/sbx/sbx";


const headerStyle = {
  height: 60
}

const mainStyle = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}

// Если убрать React.CSSProperties - то ругается на неправильное значение flexDirection
const sectionStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
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
        <section style={sectionStyle} className="mr-5 ml-5 mt-25">
          <BurgerConstructor/>
        </section>
      </main>
    </>
  );
}

export default App;

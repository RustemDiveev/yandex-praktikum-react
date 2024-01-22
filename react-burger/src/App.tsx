import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import Sbx from "./components/sbx/sbx";


const mainStyle = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center"
}

// Если убрать React.CSSProperties - то ругается на неправильное значение flexDirection
const sectionStyle = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  flexDirection: "column",
} as React.CSSProperties

function App() {
  return (
    <>
      <header>
        <AppHeader/>
      </header>
      <main style={mainStyle}>
        <section style={sectionStyle}>
          <BurgerIngredients/>
        </section>
        <section style={sectionStyle}>
          <BurgerIngredients/>
        </section>
      </main>
    </>
  );
}

export default App;

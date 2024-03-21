import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/main/main"
import Login from "./pages/login/login"


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
)

export default App
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/main/main"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import ForgotPassword from "./pages/forgot-password/forgot-password"
import ResetPassword from "./pages/reset-password/reset-password"


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
    </Routes>
  </BrowserRouter>
)

export default App
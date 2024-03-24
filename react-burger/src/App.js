import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/main/main"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import ForgotPassword from "./pages/forgot-password/forgot-password"
import ResetPassword from "./pages/reset-password/reset-password"
import Profile from "./pages/profile/profile"
import Ingredient from "./pages/ingredient/ingredient"
import ProfileOrders from "./pages/profile-orders/profile-orders"


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/profile/orders" element={<ProfileOrders/>}/>
      <Route path="/ingredients/:id" element={<Ingredient />}/>
      <Route path="*" element={<h1>Страница не найдена!</h1>}/>
    </Routes>
  </BrowserRouter>
)

export default App
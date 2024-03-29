import { Routes, Route, useLocation } from "react-router-dom"

import ProtectedRouteElement from "./routing/protected-route-element/protected-route-element"

import Main from "./pages/main/main"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import ForgotPassword from "./pages/forgot-password/forgot-password"
import ResetPassword from "./pages/reset-password/reset-password"
import Profile from "./pages/profile/profile"
import Ingredient from "./pages/ingredient/ingredient"
import ProfileOrders from "./pages/profile-orders/profile-orders"

import Modal from "./components/modal/modal"


const App = () => {

  const location = useLocation()
  const previousLocation = (location.state && location.state.previousLocation) ? location.state.previousLocation : null

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<ProtectedRouteElement element={<Login />}/>}/>
        <Route path="/register" element={<ProtectedRouteElement element={<Register />}/>}/>
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />}/>}/>
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />}/>}/>
        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>}/>
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrders />}/>}/>
        <Route path="/ingredients/:id" element={<Ingredient />}/>
        <Route path="*" element={<h1>Страница не найдена!</h1>}/>
      </Routes>
      {
        previousLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<Modal><h1>Diveev Test</h1></Modal>}/>
          </Routes>
        )
      }
    </>
  )
}

export default App
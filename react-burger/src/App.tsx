import { Routes, Route, useLocation, useNavigate } from "react-router-dom"

import ProtectedRoute from "./routing/protected-route/protected-route"

import IngredientDetails from "./components/ingredient-details/ingredient-details"
import Modal from "./components/modal/modal"
import AppHeader from "./components/app-header/app-header"

import Main from "./pages/main/main"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import ForgotPassword from "./pages/forgot-password/forgot-password"
import ResetPassword from "./pages/reset-password/reset-password"
import Profile from "./pages/profile/profile"
import ProfileOrders from "./pages/profile-orders/profile-orders"
import Feed from "./pages/feed/feed"
import FeedDetail from "./pages/feed-detail/feed-detail"


const App = () => {

  const location = useLocation()
  const background = location.state && location.state.background;
  const navigate = useNavigate()

  const closeModal = () => {
    navigate(-1)
  }

  return (
    <>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path="/" element={<Main />}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/feed/:number" element={<FeedDetail/>}/>
        <Route 
          path="/login" 
          element={
            <ProtectedRoute anonymous={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute anonymous={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/forgot-password" 
          element={
            <ProtectedRoute anonymous={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/reset-password" 
          element={
            <ProtectedRoute anonymous={true} essentialPreviousRoute="/forgot-password">
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute> 
          }
        />
        <Route 
          path="/profile/orders" 
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute> 
          }
        />
        <Route path="/ingredients/:id" element={<IngredientDetails />}/>
        <Route path="*" element={<h1>Страница не найдена!</h1>}/>
      </Routes>
      {
        background && (
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal closeModal={closeModal} header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }/>
          </Routes>
        )
      }
    </>
  )
}

export default App
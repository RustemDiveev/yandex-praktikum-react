import { useLocation, Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, anonymous = false, essentialPreviousRoute = "" }) => {
  const isLoggedIn = localStorage.getItem("accessToken")
  const location = useLocation()
  const fromLocation = location.state?.from || '/'

  if (essentialPreviousRoute && !isLoggedIn && essentialPreviousRoute !== fromLocation) {
    return <Navigate to={ fromLocation } />
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={ fromLocation } />
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
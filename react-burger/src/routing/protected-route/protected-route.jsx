import { useLocation, Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, anonymous = false, essentialPreviousRoute = "" }) => {
  const isLoggedIn = localStorage.getItem("accessToken")
  const location = useLocation()
  const fromPathname = location.state?.from || '/'

  if (essentialPreviousRoute && !isLoggedIn && essentialPreviousRoute !== fromPathname) {
    return <Navigate to={ fromPathname } />
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={ fromPathname } />
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
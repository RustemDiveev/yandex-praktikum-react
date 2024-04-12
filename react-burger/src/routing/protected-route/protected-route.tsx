import { FC, ReactElement } from "react"
import { useLocation, Navigate } from "react-router-dom"

interface IProtectedRoute {
  anonymous?: boolean,
  essentialPreviousRoute?: string,
  children: ReactElement
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, anonymous = false, essentialPreviousRoute = "" }) => {
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
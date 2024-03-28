import { Navigate, useLocation } from "react-router-dom"


const ProtectedRouteElement = ({element}) => {
    const { pathname } = useLocation()
    const isAuthentificated = (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) ? true : false;

    if (["/profile", "/profile/orders"].includes(pathname) && !isAuthentificated) {
        return <Navigate to="/login" replace/>
    }

    if (["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname) && isAuthentificated) {
        return <Navigate to="/" replace/>
    }

    return element
}

export default ProtectedRouteElement
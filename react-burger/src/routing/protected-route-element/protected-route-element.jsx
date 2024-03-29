import { useEffect } from "react"

import { Navigate, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import {logUrl, selectPreviousUrl} from "../../services/slices/routeHistorySlice"


const ProtectedRouteElement = ({element}) => {
    const { pathname } = useLocation()

    const dispatch = useDispatch()
    const previousUrl = useSelector(selectPreviousUrl)

    const isAuthentificated = (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) ? true : false;

    useEffect(() => {
        dispatch(logUrl(pathname))
    }, [dispatch, pathname])

    if (["/profile", "/profile/orders"].includes(pathname) && !isAuthentificated) {
        return <Navigate to="/login" replace />
    }

    if (["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname) && isAuthentificated) {
        return <Navigate to="/" replace />
    }

    if (pathname === "/reset-password" && !isAuthentificated && previousUrl !== "/forgot-password") {
        return <Navigate to="/forgot-password" replace />
    }

    return element
}

export default ProtectedRouteElement
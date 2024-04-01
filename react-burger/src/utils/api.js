import { REFRESH_TOKEN_URL } from "../settings/urls"


const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(response.json().then((err => Promise.reject(err))))
}

const requestApi = async (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export const refreshToken = async () => {
    const response = await requestApi(
        REFRESH_TOKEN_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken")
            })
        }
    )
    if (!response.success) {
        return Promise.reject(response)
    }
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("accessToken", response.accessToken)
    return response
}

export const requestApiWithTokenRefresh = async (url, options) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const responseJson = await response.json()
            throw new Error(responseJson.message)
        } else {
            return await response.json()    
        }
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshTokenData = await refreshToken()
            options.headers.authorization = refreshTokenData.accessToken
            const response = await requestApi(url, options)
            return response
        } else {
            return Promise.reject(err)
        }
    }
}

export default requestApi
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
    const responseJson = await response.json()
    if (!responseJson.success) {
        return Promise.reject(responseJson)
    }
    localStorage.setItem("refreshToken", responseJson.refreshToken)
    localStorage.setItem("accessToken", responseJson.accessToken)
    return responseJson
}

export const requestApiWithTokenRefresh = async (url, options) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const responseJson = await response.json()
            throw new Error(responseJson.message)
        } else {
            return response.json()    
        }
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshTokenData = await refreshToken()
            options.headers.authorization = refreshTokenData.accessToken
            const response = await requestApi(url, options)
            return response.json()
        } else {
            return Promise.reject(err)
        }
    }
}

export default requestApi
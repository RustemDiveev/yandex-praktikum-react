import { REFRESH_TOKEN_URL } from "../settings/urls"


const checkResponse = (response: Response) => {
    return response.ok ? response.json() : Promise.reject(response.json().then((err => Promise.reject(err))))
}

const requestApi = async (url: string, options?: RequestInit) => {
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

export const requestApiWithTokenRefresh = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const responseJson = await response.json()
            throw new Error(responseJson.message)
        } else {
            return await response.json()    
        }
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshTokenData = await refreshToken()
            const newHeaders = new Headers(options.headers)
            newHeaders.set("Authorization", refreshTokenData.accessToken)
            options.headers = newHeaders
            const response = await requestApi(url, options)
            return response
        } else {
            return Promise.reject(err)
        }
    }
}

export default requestApi
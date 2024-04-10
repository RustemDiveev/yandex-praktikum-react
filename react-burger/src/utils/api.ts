import { REFRESH_TOKEN_URL } from "../settings/urls"


export type TServerResponse<T> = {
    success: boolean;
} & T;

const checkResponse = <T>(response: Response): Promise<T> => {
    return response.ok ? response.json() : Promise.reject(response.json().then((err => Promise.reject(err))))
}

const requestApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
    return fetch(url, options).then(res => checkResponse<T>(res))
}

type TRefreshTokenResponse = TServerResponse<{refreshToken: string, accessToken: string}>

export const refreshToken = async (): Promise<TRefreshTokenResponse> => {
    const response = await requestApi<TRefreshTokenResponse>(
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

export const requestApiWithTokenRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const response = await requestApi<T>(url, options)
        return response
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshTokenData = await refreshToken()
            const newHeaders = new Headers(options.headers)
            newHeaders.set("Authorization", refreshTokenData.accessToken)
            options.headers = newHeaders
            const response = await requestApi<T>(url, options)
            return response
        } else {
            return Promise.reject(err)
        }
    }
}

export default requestApi
export const API_URL = "https://norma.nomoreparties.space/api"
export const API_AUTH_URL = `${API_URL}/auth`

export const ORDERS_URL = `${API_URL}/orders/`

export const INGREDIENTS_URL = `${API_URL}/ingredients`

export const PASSWORD_RESET_EMAIL_URL = `${API_URL}/password-reset`

export const PASSWORD_RESET_URL = `${PASSWORD_RESET_EMAIL_URL}/reset`

export const LOGIN_URL = `${API_AUTH_URL}/login`

export const REGISTER_URL = `${API_AUTH_URL}/register`

export const LOGOUT_URL = `${API_AUTH_URL}/logout`

export const REFRESH_TOKEN_URL = `${API_AUTH_URL}/token`

export const USER_URL = `${API_AUTH_URL}/user`

export const getOrderDetailUrl = (number: string) => `${ORDERS_URL}/${number}`
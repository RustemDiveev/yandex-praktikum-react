import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { REGISTER_URL, LOGIN_URL, LOGOUT_URL } from "../../settings/urls"

import requestApi from "../../utils/api"


const initialState = {
  success: null,
  user: {
    email: "",
    name: ""
  },
  accessToken: "",
  refreshToken: "",
}

export const registerUser = createAsyncThunk(
  "user/register",
  async ({email, password, name}) => {
    const payload = {email, password, name}
    console.log("payload: ", payload)
    const response = await requestApi(
      REGISTER_URL, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(payload)
      }
    )
    const responseJson = response.json()
    return responseJson
  }
)

export const loginUser = createAsyncThunk(
  "user/login",
  async ({email, password}) => {
    const response = await requestApi(
      LOGIN_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({email, password})
      }
    )
    const responseJson = response.json()
    return responseJson
  }
)

export const logoutUser = createAsyncThunk(
  "user/logout",
  async () => {
    const response = await requestApi(
      LOGOUT_URL,
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
    const responseJson = response.json()
    return responseJson
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.user = action.payload.user 
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.user = action.payload.user 
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.success = action.payload.success 
        state.user = {}
        state.accessToken = ""
        state.refreshToken = ""
        localStorage.removeItem("refreshToken")
      })
  }
})

export default userSlice.reducer

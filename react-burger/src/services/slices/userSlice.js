import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { REGISTER_URL, LOGIN_URL } from "../../settings/urls"

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
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.user = action.payload.user 
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
  }
})

export default userSlice.reducer

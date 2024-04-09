import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { REGISTER_URL, LOGIN_URL, LOGOUT_URL, USER_URL } from "../../settings/urls"

import requestApi, {requestApiWithTokenRefresh} from "../../utils/api"
import { RootState } from "../store"

interface IUserState {
  user: {
    email: string,
    name: string
  }
}

const initialState: IUserState = {
  user: {
    email: "",
    name: ""
  }
}

export const registerUser = createAsyncThunk(
  "user/register",
  async ({email, password, name}: {email: string, password: string, name: string}) => {
    const payload = {email, password, name}
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
    return response
  }
)

export const loginUser = createAsyncThunk(
  "user/login",
  async ({email, password}: {email: string, password: string}) => {
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
    return response
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
    return response
  }
)

export const userGetInfo = createAsyncThunk(
  "user/getInfo",
  async () => {
    const response = await requestApiWithTokenRefresh(
      USER_URL,
      {
        method: "GET",
        headers: {
          "Authorization": `${localStorage.getItem("accessToken")}`
        }
      }
    )
    return response
  }
)

export const userPatchInfo = createAsyncThunk(
  "user/patchInfo",
  async ({ email, name, password }: {email: string, name: string, password: string}) => {
    const response = await requestApiWithTokenRefresh(
      USER_URL,
      {
        method: "PATCH",
        headers: {
          "Authorization": `${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({email, name, password})
      }
    )
    return response
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user 
        localStorage.setItem("accessToken", action.payload.accessToken)
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user 
        localStorage.setItem("accessToken", action.payload.accessToken)
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = initialState.user
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      })
      .addCase(userGetInfo.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
      .addCase(userPatchInfo.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
  }
})

export default userSlice.reducer

export const selectUser = (state: RootState) => state.user.user
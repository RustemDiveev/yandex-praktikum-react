import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { REGISTER_URL } from "../../settings/urls"

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
    const response = await requestApi(
      REGISTER_URL, 
      {
        method: "POST",
        body: {email, password, name}
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
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.success = action.payload.success
      state.user = action.payload.user 
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    })
  }
})

export default userSlice.reducer

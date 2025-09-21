import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from "./authApi"


export const registration = createAsyncThunk('auth/registration', async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.registration(data)
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const login = createAsyncThunk('auth/login', async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.login(data)
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data || "Refresh failed")
  }
})

export const refresh = createAsyncThunk('auth/refresh', async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.refresh()
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const forgetPass = createAsyncThunk('auth/forget-password' , async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.forgetPass(data)
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const resetPass = createAsyncThunk('auth/reset-password', async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.resetPass(data)
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const emailVerify = createAsyncThunk('auth/emailVerify', async (data , { rejectWithValue })=>{
  try {
     const res =  await authApi.emailVerify(data)
     return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    message: null
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
    }
  },
  extraReducers(builder) {
    builder

    // login 
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.message = null
      })
    
      // registration
      .addCase(registration.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.message = action.payload.message
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.message = null
      })
    
      // refresh
      .addCase(refresh.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.message = action.payload.message
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.message = null
      })
    
    // forget password
      .addCase(forgetPass.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(forgetPass.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message
      })
      .addCase(forgetPass.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.message = null
      })
    
    // reset password
      .addCase(resetPass.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.message = null
      })
    
    // email verify
      .addCase(emailVerify.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(emailVerify.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message
      })
      .addCase(emailVerify.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.message = null
      })
  }



})

// Action creators are generated for each case reducer function
export const { logout  } = authSlice.actions

export default authSlice.reducer
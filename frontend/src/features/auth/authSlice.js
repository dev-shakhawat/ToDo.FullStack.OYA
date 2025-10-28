import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

// -----------------------
// 🔹 Thunks
// -----------------------

export const registerUser = createAsyncThunk(
  "auth/registration",
  async (data, { rejectWithValue }) => {
    try {
      console.log("thunk");
      const res = await authApi.registration(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (error) {
      console.log(data);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.refresh();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const forgetPass = createAsyncThunk(
  "auth/forget-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.forgetPass(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resetPass = createAsyncThunk(
  "auth/reset-password",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPass(token, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const emailVerify = createAsyncThunk(
  "auth/emailVerify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.emailVerify(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// -----------------------
// 🔹 Slice
// -----------------------

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    message: null,
    notification: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    clearStatus: (state) => {
      state.error = null;
      state.message = null;
    },
    notify: (state , action) => {
      state.notification = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // -----------------------
      // 🔸 Login
      // -----------------------
      .addCase(loginUser.pending, (state) => { state.loading = true })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = true
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
 
        state.notification = true
        state.loading = false;
        state.error = action.payload.message;
        state.message = null;
      })

      // -----------------------
      // 🔸 Registration
      // -----------------------
      .addCase(registerUser.pending, (state) => { state.loading = true })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.notification = true
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message;
        state.error = action.payload.error || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.notification = true
        state.loading = false;
        state.error = action.payload?.error;
        state.message = action.payload?.message || null;
      })

      // -----------------------
      // 🔸 Refresh Token
      // -----------------------
      .addCase(refresh.pending, (state) => { state.loading = true })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
        state.message = null;
      })

      // -----------------------
      // 🔸 Forget Password
      // -----------------------
      .addCase(forgetPass.pending, (state) => { state.loading = true })
      .addCase(forgetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(forgetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
        state.message = action.payload?.message;
      })

      // -----------------------
      // 🔸 Reset Password
      // -----------------------
      .addCase(resetPass.pending, (state) => { state.loading = true })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // -----------------------
      // 🔸 Email Verify
      // -----------------------
      .addCase(emailVerify.pending, (state) => { state.loading = true })
      .addCase(emailVerify.fulfilled, (state, action) => {
        state.notification = true
        state.loading = false;
        state.error = action.payload.error || null;
        state.message = action.payload.message || null;
      })
      .addCase(emailVerify.rejected, (state, action) => {
        state.notification = true
        state.loading = false;
        state.error = action.payload?.error;
        state.message = action.payload?.message;
      });
  },
});

export const { logout, clearStatus , notify } = authSlice.actions;
export default authSlice.reducer;

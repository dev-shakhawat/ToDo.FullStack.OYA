import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

export const registration = createAsyncThunk(
  "auth/registration",
  async (data, { rejectWithValue }) => {
    try {
      console.log("thunk");
      
      const res = await authApi.registration(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (error) {
      console.log(data);
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.refresh();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPass = createAsyncThunk(
  "auth/reset-password",
  async (token, data, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPass(token, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);
 

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    message: null,
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
 
  },
  extraReducers(builder) {
    builder

      // login
      .addCase(login.pending, (state) => (state.loading = true))

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message; 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null; 
      })

      // registration
      .addCase(registration.pending, (state) => state.loading = true)

      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message;
        state.error = action.payload.error; 
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
        state.message = state.message = action.payload?.message; 
      })

      // refresh
      .addCase(refresh.pending, (state) => state.loading = true)
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message; 
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.message = null; 
      })

      // forget password
      .addCase(forgetPass.pending, (state) => state.loading = true )
      .addCase(forgetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; 
      })
      .addCase(forgetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.message = action.payload.message; 
      })

      // reset password
      .addCase(resetPass.pending, (state) => state.loading = true )
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; 
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload; 
      })

      // email verify
      .addCase(emailVerify.pending, (state) =>  state.loading = true)
      .addCase(emailVerify.fulfilled, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message; 
      })
      .addCase(emailVerify.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message; 
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout , clearStatus } = authSlice.actions;

export default authSlice.reducer;

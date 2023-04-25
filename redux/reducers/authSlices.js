import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userServices from '@/services/userServices';

export const initialState = {
  token: null,
  user: null,

  dataAsyncRegister: null,
  loadingAsyncRegister: false,
  errorAsyncRegister: null,

  dataAsyncLogin: null,
  loadingAsyncLogin: false,
  errorAsyncLogin: null,

  dataAsyncForgot: null,
  loadingAsyncForgot: false,
  errorAsyncForgot: null,
};

export const asyncRegister = createAsyncThunk(
  'auth/asyncRegister',
  async ({
    avatar, email, name, username, password,
  }) => {
    const user = await userServices.register({
      avatar, email, name, username, password,
    });
    return user;
  },
);

export const asyncLogin = createAsyncThunk(
  'auth/asyncLogin',
  async ({ email, password }) => {
    const token = await userServices.login({ email, password });
    return token;
  },
);

export const asyncForgot = createAsyncThunk(
  'auth/asyncForgot',
  async ({ email }) => {
    const forgot = await userServices.sendEmail({ email });
    return forgot;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    resetLogin: (state) => {
      state.dataAsyncLogin = null;
      state.loadingAsyncLogin = false;
      state.errorAsyncLogin = null;
    },
    resetRegister: (state) => {
      state.dataAsyncRegister = null;
      state.loadingAsyncRegister = false;
      state.errorAsyncRegister = null;
    },
  },
  extraReducers: ({ addCase }) => {
    // register
    addCase(asyncRegister.pending, (state) => {
      state.loadingAsyncRegister = true;
      state.errorAsyncRegister = null;
    });
    addCase(asyncRegister.fulfilled, (state, action) => {
      state.loadingAsyncRegister = false;
      state.dataAsyncRegister = action.payload;
    });
    addCase(asyncRegister.rejected, (state, action) => {
      state.loadingAsyncRegister = false;
      state.errorAsyncRegister = action.error;
    });

    // login
    addCase(asyncLogin.pending, (state) => {
      state.loadingAsyncLogin = true;
    });
    addCase(asyncLogin.fulfilled, (state, action) => {
      state.loadingAsyncLogin = false;
      state.token = action.payload;
      state.dataAsyncLogin = action.payload;
    });
    addCase(asyncLogin.rejected, (state, action) => {
      state.loadingAsyncLogin = false;
      state.errorAsyncLogin = action.error;
    });

    // forgot password
    addCase(asyncForgot.pending, (state) => {
      state.loadingAsyncForgot = true;
    });
    addCase(asyncForgot.fulfilled, (state, action) => {
      state.loadingAsyncForgot = false;
      state.dataAsyncForgot = action.payload;
    });
    addCase(asyncForgot.rejected, (state, action) => {
      state.loadingAsyncForgot = false;
      state.errorAsyncForgot = action.error;
    });
  },
});

export const {
  setToken,
  setUser,
  logout,
  resetLogin,
  resetRegister,
} = authSlice.actions;

export const authState = (state) => state.auth;

export const getCurrentUser = (state) => state.auth.user || null;

export const checkAuth = (state) => !!state.auth.token;

const authReducer = authSlice.reducer;

export default authReducer;

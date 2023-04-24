import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  authenticationError: null,
};

const errorSlice = createSlice(
  {
    name: 'error',
    initialState,
    reducers: {
      setAuthenticationError: (state, action) => {
        state.authenticationError = action.payload;
      },
      removeAuthenticationError: (state) => {
        state.authenticationError = null;
      },
    },
  },
);

export const errorState = (state) => state.error;

const errorReducer = errorSlice.reducer;

export const { setAuthenticationError, removeAuthenticationError } = errorSlice.actions;

export default errorReducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  errorMsg: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = false;
      state.loading = true;
      state.errorMsg = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = null;
      state.errorMsg = null;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.loading = null;
      state.error = true;
      state.errorMsg = action.payload;
    },
    updateStart: (state) => {
      state.error = false;
      state.loading = true;
      state.errorMsg = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = null;
      state.errorMsg = null;
      state.error = false;
    },
    updateFailure: (state, action) => {
      state.loading = null;
      state.error = true;
      state.errorMsg = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = null;
      state.errorMsg = null;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;

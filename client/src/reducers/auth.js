import { createAction, createReducer } from "@reduxjs/toolkit";

import { AUTH, LOGOUT } from "../constants/actionTypes";

const auth = createAction(AUTH);
const logout = createAction(LOGOUT);

const initialState = { authData: null };

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(auth, (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      state.authData = action?.data;
    })
    .addCase(logout, (state, action) => {
      localStorage.clear();
      state.authData = null;
    })
    .addDefaultCase((state, action) => {});
});

export default authReducer;

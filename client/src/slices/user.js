import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import * as api from "../api/index.js";

export const signinThunk = createAsyncThunk(
  "users/signin",
  async (formData, thunkAPI) => {
    try {
      const response = await api.signIn(formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (formData, thunkAPI) => {
    try {
      const response = await api.signUp(formData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const profile = localStorage["profile"];

const initialState = { authData: profile ? JSON.parse(profile) : null };

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      localStorage.clear();
      state.authData = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(signinThunk.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        state.authData = action?.payload;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        state.authData = action?.payload;
      });
  },
});

export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getUsernameThunk = createAsyncThunk(
  "users/getusername",
  async (userid, thunkAPI) => {
    try {
      const response = await api.getuser(userid);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const profile = localStorage["profile"];

const initialState = { authData: profile ? profile : null, users: {} };

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
        localStorage.setItem("profile", action?.payload);
        state.authData = action?.payload;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        localStorage.setItem("profile", action?.payload);
        state.authData = action?.payload;
      })
      .addCase(getUsernameThunk.fulfilled, (state, action) => {
        state.users[action?.payload.uid] = action?.payload.username;
      });
  },
});

export default usersSlice.reducer;

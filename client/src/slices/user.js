import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const signin = createAsyncThunk("users/signin", async (formData, thunkAPI) => {
  try {
    const response = await api.signIn(formData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const signup = createAsyncThunk("users/signup", async (formData, thunkAPI) => {
  try {
    const response = await api.signUp(formData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const initialState = { authData: null };

const usersSlice = createSlice({
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
      .addCase(signin.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        state.authData = action?.data;
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        state.authData = action?.data;
      });
  },
});

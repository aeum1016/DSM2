import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const create = createAsyncThunk(
  "attempts/create",
  async (attemptData, thunkAPI) => {
    try {
      const response = await api.createAttempt(attemptData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getuser = createAsyncThunk(
  "attempts/getuser",
  async (userId, thunkAPI) => {
    try {
      const response = await api.fetchUserAttempts(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = { attempts: [] };

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.attempts.push(action?.data);
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.attempts = action?.data;
      });
  },
});

export default attemptsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";
import { GameModes } from "./game.js";

export const create = createAsyncThunk(
  "attempts/create",
  async (attemptData, thunkAPI) => {
    try {
      const response = await api.createAttempt(attemptData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const getbysetting = createAsyncThunk(
  "attempts/getbysetting",
  async (settings, thunkAPI) => {
    try {
      var response;
      if (settings.sort === GameModes.COMPLETIONS) {
        response = await api.fetchAttemptsByCompleted(settings.setting);
      } else if (settings.sort === GameModes.DURATION) {
        response = await api.fetchAttemptsByTime(settings.setting);
      }
      return { setting: settings.setting, data: response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
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
  },
);

const initialState = {
  leaderboardAttempts: {},
  userAttempts: [],
  prevAttempt: {},
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.prevAttempt = action?.data;
      })
      .addCase(getbysetting.fulfilled, (state, action) => {
        state.leaderboardAttempts[action?.payload.setting] =
          action?.payload.data;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.userAttempts = action?.data;
      });
  },
});

export default attemptsSlice.reducer;

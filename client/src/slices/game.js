import { createSlice } from "@reduxjs/toolkit";
import { generateQuestion } from "../util/QuestionUtil";

export const GameModes = Object.freeze({
  COMPLETIONS: "c",
  DURATION: "d",
});

const createQuestion = (state) => {
  const operator = Math.floor(Math.random() * 4);
  state.questions.push(
    generateQuestion(operator, getMin(state, operator), getMax(state, operator))
  );
};

const getMin = (state, operator) => {
  switch (operator) {
    case 0:
      return state.settings.min.add;
    case 1:
      return state.settings.min.sub;
    case 2:
      return state.settings.min.mult;
    case 3:
      return state.settings.min.div;
    default:
      return state.settings.min.add;
  }
};

const getMax = (state, operator) => {
  switch (operator) {
    case 0:
      return state.settings.max.add;
    case 1:
      return state.settings.max.sub;
    case 2:
      return state.settings.max.mult;
    case 3:
      return state.settings.max.div;
    default:
      return state.settings.max.add;
  }
};

const initialState = {
  settings: {
    mode: GameModes.COMPLETIONS,
    endAt: 60,
    min: { add: 2, sub: 2, mult: 1, div: 1 },
    max: { add: 100, sub: 100, mult: 12, div: 12 },
  },
  questions: [],
  status: 0,
  answers: [],
  startTime: 0,
  endTime: 0,
  currentLine: 0,
  currentIndex: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 0;
      state.questions = [];
      state.answers = [];
      state.currentLine = 0;
      state.currentIndex = 0;
      state.startTime = 0;
      state.endTime = 0;
    },
    setSettings: (state, newSettings) => {
      state.settings = newSettings.payload;
    },
    createLine: (state) => {
      console.log("Creating 1 line of questions");
      for (let i = 0; i < 4; i++) {
        createQuestion(state);
      }
    },
    startGame: (state) => {
      state.status = 1;
      state.startTime = new Date().getTime();
    },
    checkAnswer: (state, answer) => {
      if (state.currentIndex >= state.questions.length) return;
      if (
        parseInt(answer.payload) === state.questions[state.currentIndex].answer
      ) {
        state.answers.push(answer.payload);
        ++state.currentIndex;
        state.currentLine = Math.floor(state.currentIndex / 4);
        if (
          state.settings.mode === "c" &&
          state.currentIndex === state.settings.endAt
        ) {
          state.endTime = new Date().getTime();
          state.status = 2;
        }
      }
    },
    endGame: (state) => {
      state.endTime = new Date().getTime();
      state.status = 2;
    },
  },
});

export const {
  reset,
  setSettings,
  createLine,
  startGame,
  checkAnswer,
  endGame,
} = gameSlice.actions;

export default gameSlice.reducer;

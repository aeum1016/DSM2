import { createSlice } from "@reduxjs/toolkit";

const determineAnswer = (operand1, operand2, operator) => {
  switch (operator) {
    default:
    case 0:
      return operand1 + operand2;
    case 1:
      return operand1 - operand2;
    case 2:
      return operand1 * operand2;
    case 3:
      return operand1 / operand2;
  }
};

const pushQuestion = (state, operand1, operand2, operator) => {
  switch (operator) {
    case 3:
      state.questions.push({
        operand1: operand1 * operand2,
        operand2: operand2,
        operator: ["+", "-", "*", "/"][operator],
        answer: determineAnswer(operand1 * operand2, operand2, operator),
      });
      break;
    default:
      state.questions.push({
        operand1: Math.max(operand1, operand2),
        operand2: Math.min(operand1, operand2),
        operator: ["+", "-", "*", "/"][operator],
        answer: determineAnswer(
          Math.max(operand1, operand2),
          Math.min(operand1, operand2),
          operator
        ),
      });
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
    mode: "c",
    endAt: 4,
    max: { add: 20, sub: 20, mult: 20, div: 20 },
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
    create: (state) => {
      state.questions = [];
      for (let i = 0; i < state.settings.endAt; i++) {
        const operator = Math.floor(Math.random() * 4);
        const operand1 =
          Math.floor(Math.random() * getMax(state, operator)) + 1;
        const operand2 =
          Math.floor(Math.random() * getMax(state, operator)) + 1;
        pushQuestion(state, operand1, operand2, operator);
      }
    },
    setSettings: (state, newSettings) => {
      state.settings = newSettings.payload;
    },
    reset: (state) => {
      state.status = 0;
      state.questions = [];
      state.answers = [];
      state.currentLine = 0;
      state.currentIndex = 0;
      state.startTime = 0;
      state.endTime = 0;
    },
    startGame: (state) => {
      state.status = 1;
      state.startTime = new Date().getTime();
    },
    checkAnswer: (state, answer) => {
      if (
        state.currentIndex < state.questions.length &&
        parseInt(answer.payload) === state.questions[state.currentIndex].answer
      ) {
        state.answers.push(answer.payload);
        ++state.currentIndex;
        state.currentLine = Math.floor(state.currentIndex / 4);
        if (state.currentIndex === state.questions.length) {
          state.endTime = new Date().getTime();
          state.status = 2;
        }
      }
    },
    nextGame: (state) => {
      state.status = 0;
    },
  },
});

export const { create, setSettings, reset, startGame, checkAnswer, nextGame } =
  gameSlice.actions;

export default gameSlice.reducer;

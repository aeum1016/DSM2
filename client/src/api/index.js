import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : "http://localhost:8080",
});

const CURAPI = API;

// CURAPI.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

export const fetchAttempts = () => CURAPI.get("/attempt");
export const fetchAttemptsByTime = (settings) =>
  CURAPI.get(`/attempt/get/time/${settings}`);
export const fetchAttemptsByCompleted = (settings) =>
  CURAPI.get(`/attempt/get/completed/${settings}`);
export const createAttempt = (newAttempt) =>
  CURAPI.post("/attempt/create", newAttempt);
export const fetchUserAttempts = (userId) =>
  CURAPI.get(`/attempt/user/${userId}`);

export const signIn = (formData) => CURAPI.post("/user/login", formData);
export const signUp = (formData) => CURAPI.post("/user/register", formData);
export const getuser = (userid) => CURAPI.get(`/user/get/${userid}`);

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
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
export const createAttempt = (newAttempt) =>
  CURAPI.post("/attempt", newAttempt);
export const fetchUserAttempts = (userId) =>
  CURAPI.get(`/attempt/user/${userId}`);

export const signIn = (formData) => CURAPI.post("/user/signin", formData);
export const signUp = (formData) => CURAPI.post("/user/signup", formData);
export const getuser = (userId) => CURAPI.get(`/user/profile/${userId}`);

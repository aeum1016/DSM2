import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const CURAPI = API;

CURAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchAttempts = () => CURAPI.get("/attempts");
export const createAttempt = (newAttempt) =>
  CURAPI.post("/attempts", newAttempt);
export const fetchUserAttempts = (email) => CURAPI.get(`/attempts/${email}`);

export const signIn = (formData) => CURAPI.post("/user/signin", formData);
export const signUp = (formData) => CURAPI.post("/user/signup", formData);
export const getuser = (email) => CURAPI.get(`/user/${email}`);

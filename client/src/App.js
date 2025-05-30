import React, { useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar/Navbar";

import { usersSlice } from "./slices/user";
import SignupCard from "./components/Auth/SignUpCard";
import SigninCard from "./components/Auth/SignInCard";
import Game from "./components/Game/GamePage";
import Landing from "./components/Auth/Landing";
import Leaderboard from "./components/Leaderboard/LeaderboardPage";
import User from "./components/Auth/User/UserPage";

const App = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.user.authData);
  const { logout } = usersSlice.actions;

  const checkExpired = useCallback(() => {
    if (authData) {
      const decodedToken = jwtDecode(authData);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [authData, dispatch, logout]);

  setInterval(checkExpired, 1000 * 60 * 10);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/signin" element={<SigninCard />} />
        <Route path="/signup" element={<SignupCard />} />
      </Route>
    )
  );

  return (
    <Flex minH="100vh" minW="100vw" color="brandLight.100">
      <RouterProvider router={router} />
    </Flex>
  );
};

export default App;

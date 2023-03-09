import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import decode from "jwt-decode";

import Navbar from "./components/Navbar/Navbar";

import { usersSlice } from "./slices/user";
import Landing from "./components/Auth/Landing";
import SignupCard from "./components/Auth/SignUpCard";

const App = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.user.authData);
  const { logout } = usersSlice.actions;

  useEffect(() => {
    const token = authData?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [authData, dispatch, logout]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="home" element={<Landing />} />
        <Route path="signup" element={<SignupCard />} />
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

import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import decode from "jwt-decode";

import { signinThunk } from "./slices/user";
import Navbar from "./components/Navbar/Navbar";

import { usersSlice } from "./slices/user";

const App = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.user.authData);
  const { logout } = usersSlice.actions;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = authData?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        setUser(null);
      }
    }

    setUser(authData);
  }, [authData]);

  const userId = "63a7442254c752317e051bea";

  const userData = {
    username: "aeum",
    email: "aeum@gmail.com",
    password: "7",
    confirmPassword: "7",
  };

  const userLogin = {
    username: "aeum",
    password: "7",
  };

  const onClick = () => {
    dispatch(signinThunk(userLogin));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Navbar />}></Route>)
  );

  return (
    <Flex bg="#171B27" minW="100vw" minH="100vh">
      <RouterProvider router={router} />
    </Flex>
  );
};

export default App;

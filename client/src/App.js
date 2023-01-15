import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { signinThunk } from "./slices/user";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const dispatch = useDispatch();

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

  const authData = useSelector((state) => state.user.authData);

  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Navbar />}></Route>)
  );

  return (
    <Box bg="purple" w="100vw" h="100vh">
      <Text color="black">{authData?.token}</Text>
      <Button onClick={onClick}>Button</Button>
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;

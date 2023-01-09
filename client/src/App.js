import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "./slices/attempts";
import { signinThunk } from "./slices/user";

const App = () => {
  const dispatch = useDispatch();

  const userId = "63a7442254c752317e051bea";

  const user = {
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
  console.log(authData);

  return (
    <Box bg="purple">
      <Text color="black">{authData?.token}</Text>
      <Button onClick={onClick}>Button</Button>
    </Box>
  );
};

export default App;

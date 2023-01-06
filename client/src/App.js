import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getuser } from "./slices/attempts";

const App = () => {
  const dispatch = useDispatch();

  const userId = "63a7442254c752317e051bea";

  const onClick = async () => {
    const result = await dispatch(getuser(userId));
    console.log(result.payload);
  };

  return (
    <Box bg="purple">
      <Text color="black">Hello</Text>
      <Button onClick={onClick}>Button</Button>
    </Box>
  );
};

export default App;

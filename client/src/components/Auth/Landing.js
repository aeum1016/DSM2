import React from "react";
import { Flex } from "@chakra-ui/react";
import SigninCard from "./SignInCard";
import Game from "../Game/Game";

const Landing = () => {
  const user = localStorage["profile"];

  return (
    <Flex minW={"100%"} minH={"100%"} justify={"center"}>
      {user ? <Game /> : <SigninCard />}
    </Flex>
  );
};

export default Landing;

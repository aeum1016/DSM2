import React from "react";
import { Flex } from "@chakra-ui/react";
import SignupCard from "./SignUpCard";

const Landing = () => {
  const user = localStorage["profile"];

  return <Flex>{user ? <></> : <SignupCard />}</Flex>;
};

export default Landing;

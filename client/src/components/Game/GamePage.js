import { useCallback, useEffect, useState } from "react";
import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GameSummary from "./GameSummary/GameSummary";
import Game from "./Game/Game";

export default function GamePage() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.game.status);
  const user = useSelector((state) => state.user.authData);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  const renderCurrentStatus = useCallback(() => {
    switch (status) {
      case 0:
      case 1:
        return <Game />;
      case 2:
        return <GameSummary />;
    }
  }, [status]);

  return (
    <Flex
      direction={"column"}
      minH={"100%"}
      minW={"100%"}
      align={"center"}
      justify={"center"}
    >
      {renderCurrentStatus()}
      <Spacer />
      <Box my={"1rem"}>
        <Button variant={"unstyled"} _hover={{ color: "brandDark.300" }}>
          <Text fontWeight={"medium"}>Settings</Text>
        </Button>
      </Box>
    </Flex>
  );
}

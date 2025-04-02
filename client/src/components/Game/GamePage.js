import { useCallback, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GameSummary from "./GameSummary/GameSummary";
import Game from "./Game/Game";
import Settings from "../Util/Settings/Settings";

export default function GamePage() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.game.status);
  const user = useSelector((state) => state.user.authData);

  useEffect(() => {
    // if (!user) {
    //   navigate("/signin");
    // }
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
      justify={"space-between"}
    >
      {renderCurrentStatus()}
      <Settings />
    </Flex>
  );
}

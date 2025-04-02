import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./Leaderboard/Leaderboard";
import { GameModes, reset } from "../../slices/game";
import { useDispatch, useSelector } from "react-redux";
import Settings from "../Util/Settings/Settings";

export default function LeaderboardPage() {
  const dispatch = useDispatch();

  const mainSettings = {
    mode: GameModes.COMPLETIONS,
    endAt: 60,
    min: { add: 2, sub: 2, mult: 1, div: 1 },
    max: { add: 100, sub: 100, mult: 12, div: 12 },
  };

  const currentSettings = useSelector((state) => state.game.settings);

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <Flex
      direction={"column"}
      minH={"100%"}
      minW={"100%"}
      align={"center"}
      justify={"space-between"}
    >
      <Flex
        flexWrap={"wrap"}
        flex={1}
        minW={"100%"}
        align={"center"}
        justify={"space-around"}
      >
        <Flex direction={"column"} align={"center"} gap={4}>
          <Text>Featured Settings</Text>
          <Leaderboard setting={mainSettings} />
        </Flex>
        <Flex direction={"column"} align={"center"} gap={4}>
          <Text>Current Settings</Text>
          <Leaderboard setting={currentSettings} />
        </Flex>
      </Flex>
      <Settings />
    </Flex>
  );
}

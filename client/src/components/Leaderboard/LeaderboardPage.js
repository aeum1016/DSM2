import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./Leaderboard/Leaderboard";
import { GameModes, reset } from "../../slices/game";
import { useDispatch } from "react-redux";

export default function LeaderboardPage() {
  const dispatch = useDispatch();

  const mainSettings = {
    mode: GameModes.COMPLETIONS,
    endAt: 60,
    min: { add: 2, sub: 2, mult: 1, div: 1 },
    max: { add: 100, sub: 100, mult: 12, div: 12 },
  };

  const [secondarySettings, setSecondarySettings] = useState({
    mode: GameModes.DURATION,
    endAt: 60,
    min: { add: 2, sub: 2, mult: 1, div: 1 },
    max: { add: 100, sub: 100, mult: 12, div: 12 },
  });

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
        minW={"100%"}
        align={"center"}
        justify={"space-around"}
      >
        <Leaderboard setting={mainSettings} />
        <Leaderboard setting={secondarySettings} />
      </Flex>
    </Flex>
  );
}

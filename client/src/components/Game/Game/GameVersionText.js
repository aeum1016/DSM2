import { useSelector } from "react-redux";
import { GameModes } from "../../../slices/game";
import { Box, Text } from "@chakra-ui/react";

const GameVersionText = () => {
  const settings = useSelector((state) => state.game.settings);

  return (
    <Box alignSelf={"flex-start"}>
      <Text fontSize={"larger"}>
        {"GAME MODE: "}
        {settings.mode === GameModes.COMPLETIONS ? "Completions" : "Timed"}
        {" - "}
        {settings.endAt}{" "}
        {settings.mode === GameModes.COMPLETIONS ? "Questions" : "Seconds"}
      </Text>
    </Box>
  );
};

export default GameVersionText;

import { useSelector } from "react-redux";
import { GameModes } from "../../../slices/game";
import { Box, Text } from "@chakra-ui/react";
import { GetGameModeString } from "../../../util/SettingUtil";

const GameVersionText = () => {
  const settings = useSelector((state) => state.game.settings);

  return (
    <Box alignSelf={"flex-start"}>
      <Text fontSize={"larger"}>
        {"GAME MODE: "}
        {GetGameModeString(settings)}
      </Text>
    </Box>
  );
};

export default GameVersionText;

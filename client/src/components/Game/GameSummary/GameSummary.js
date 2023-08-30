import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { create, nextGame, reset } from "../../../slices/game";
import { create as createAttempt } from "../../../slices/attempts";
import { useEffect } from "react";

const GameSummary = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.authData);
  const settings = useSelector((state) => state.game.settings);
  const currentIndex = useSelector((state) => state.game.currentIndex);
  const startTime = useSelector((state) => state.game.startTime);
  const endTime = useSelector((state) => state.game.endTime);

  useEffect(() => {
    let settingsString = "";
    for (const [key, value] of Object.entries(settings)) {
      settingsString += key + ": " + value + ", ";
    }
    dispatch(
      createAttempt({
        score: currentIndex,
        time: endTime - startTime,
        userId: user.user._id,
        setting: settingsString,
      })
    );
  }, []);

  const onClose = () => {
    dispatch(reset());
    dispatch(create());
    dispatch(nextGame());
  };

  return (
    <Box direction={"column"} justify={"center"} my={"8rem"} width={"80%"}>
      <Text fontSize={40}>Questions Per Minute: </Text>
      <Text fontSize={32}>
        <Tooltip
          label={
            ((currentIndex * 60) / ((endTime - startTime) / 1000)).toFixed(2) +
            " QPM"
          }
          placement={"right"}
          fontSize={28}
          borderRadius={4}
        >
          {((currentIndex * 60) / ((endTime - startTime) / 1000)).toFixed(0)}
        </Tooltip>
      </Text>
      <Button
        my={"3rem"}
        size={"xs"}
        variant={"ghost"}
        _hover={{ bgColor: "brandDark.800" }}
        _active={{ bgColor: "brandDark.800" }}
        onClick={() => onClose()}
      >
        <Text fontSize={18}>New Game</Text>
      </Button>
    </Box>
  );
};

export default GameSummary;

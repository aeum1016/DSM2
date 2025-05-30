import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Lines from "../Line/Lines";
import {
  checkAnswer,
  endGame,
  GameModes,
  startGame,
} from "../../../slices/game";
import GameVersionText from "./GameVersionText";

const Game = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.game.status);
  const currentIndex = useSelector((state) => state.game.currentIndex);
  const start = useSelector((state) => state.game.startTime);
  const settings = useSelector((state) => state.game.settings);
  const [answer, setAnswer] = useState("");

  const [endTimer, setEndTimer] = useState();

  useEffect(() => {
    if (status === 0 && answer !== "") {
      dispatch(startGame());
      if (settings.mode === GameModes.DURATION) {
        setEndTimer(
          setTimeout(() => dispatch(endGame()), settings.endAt * 1000)
        );
      }
    }
    dispatch(checkAnswer(answer));
  }, [answer]);

  useEffect(() => {
    if (settings.mode !== GameModes.DURATION) {
      clearInterval(endTimer);
    }
  }, [settings]);

  useEffect(() => {
    setAnswer("");
  }, [currentIndex]);

  return (
    <Box direction={"column"} align={"center"} justify={"center"}>
      <Stack spacing="48px" my={"8rem"}>
        <GameVersionText />
        <Lines />
      </Stack>
      <Box w={"30%"} align={"center"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={"3rem"}>
            <ChevronRightIcon color="brandDark.200" />
          </InputLeftElement>
          <Input
            fontSize={"2.5rem"}
            autoFocus
            borderColor={"brandDark.800"}
            _hover={{ borderColor: "brandDark.800" }}
            focusBorderColor={"brandDark.800"}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            value={answer}
          />
        </InputGroup>
        <Text fontSize={"1.1rem"}>
          {start
            ? "QPM:" +
              (
                (currentIndex * 60) /
                ((new Date().getTime() - start) / 1000)
              ).toFixed(2)
            : ""}
        </Text>
      </Box>
    </Box>
  );
};

export default Game;

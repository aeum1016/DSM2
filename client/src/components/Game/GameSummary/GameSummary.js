import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { create, nextGame, reset } from "../../../slices/game";
import { create as createAttempt } from "../../../slices/attempts";
import { Fragment, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const GameSummary = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.authData);
  const settings = useSelector((state) => state.game.settings);
  const currentIndex = useSelector((state) => state.game.currentIndex);
  const startTime = useSelector((state) => state.game.startTime);
  const endTime = useSelector((state) => state.game.endTime);

  useEffect(() => {
    if (user) {
      dispatch(
        createAttempt({
          completed: currentIndex,
          time: endTime - startTime,
          userId: jwtDecode(user)._id,
          setting: JSON.stringify(settings),
        })
      );
    }
  }, [user]);

  const onClose = () => {
    dispatch(reset());
    dispatch(create());
    dispatch(nextGame());
  };

  return (
    <Box direction={"column"} my={"8rem"} width={"80%"}>
      <Flex direction={"column"} justify={"space-between"} height={"100%"}>
        <Box>
          <Text fontSize={40}>Questions Per Minute: </Text>
          <Text fontSize={32}>
            <Tooltip
              label={
                ((currentIndex * 60) / ((endTime - startTime) / 1000)).toFixed(
                  2
                ) + " QPM"
              }
              placement={"right"}
              fontSize={14}
            >
              {((currentIndex * 60) / ((endTime - startTime) / 1000)).toFixed(
                0
              )}
            </Tooltip>
          </Text>
        </Box>
        <Flex direction={"column"} align={"center"}>
          <Button
            marginTop={"3rem"}
            variant={"ghost"}
            color={"brandDark.100"}
            _hover={{
              color: "brandDark.200",
            }}
            _active={{
              color: "brandDark.200",
              transform: "scale(0.95)",
            }}
            onClick={() => onClose()}
          >
            <Text fontSize={24} textDecoration={"underline"}>
              Try Again
            </Text>
          </Button>
          {user ? (
            <Fragment></Fragment>
          ) : (
            <Text paddingTop={24} fontSize={40}>
              Sign in to save your results!
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameSummary;

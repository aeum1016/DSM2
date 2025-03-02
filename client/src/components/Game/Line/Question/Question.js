import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Question({ index }) {
  const questions = useSelector((state) => state.game.questions);
  const currentIndex = useSelector((state) => state.game.currentIndex);
  const [styles, setStyles] = useState({
    fontSize: "2rem",
    opacity: "0.5",
  });
  useEffect(() => {
    if (currentIndex === index) {
      setStyles({
        fontSize: "2.5rem",
        opacity: "1",
      });
    } else {
      setStyles({
        fontSize: "2rem",
        opacity: "0.5",
      });
    }
  }, [currentIndex]);

  return (
    <Flex
      minH={"100%"}
      align={"flex-end"}
      justify={"center"}
      direction={"column"}
      opacity={styles.opacity}
    >
      {questions.length > index ? (
        <Fragment>
          <Box width={"4rem"} textAlign={"right"}>
            <Text fontSize={styles.fontSize} fontWeight={"medium"}>
              {questions[index].operand1}
            </Text>
          </Box>
          <HStack spacing={"0.5rem"}>
            <Box width={"1.3rem"} textAlign={"right"}>
              <Text fontSize={styles.fontSize} fontWeight={"medium"}>
                {questions[index].operator}
              </Text>
            </Box>
            <Box width={"2.6rem"} textAlign={"right"}>
              <Text fontSize={styles.fontSize} fontWeight={"medium"}>
                {questions[index].operand2}
              </Text>
            </Box>
          </HStack>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Flex>
  );
}

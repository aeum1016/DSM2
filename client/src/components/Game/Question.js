import { Flex, Text } from "@chakra-ui/react";

export default function Question({ operand1, operator, operand2, current }) {
  return (
    <Flex
      minH={"100%"}
      align={"flex-end"}
      justify={"center"}
      direction={"column"}
      opacity={current ? "1" : "0.5"}
    >
      <Text fontSize={"2.5em"} fontWeight={"medium"}>
        {operand1}
      </Text>
      <Text fontSize={"2.5em"} fontWeight={"medium"}>
        {operator} {operand2}
      </Text>
    </Flex>
  );
}

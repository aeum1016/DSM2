import {
  Box,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import Question from "./Question";

export default function Game() {
  return (
    <Flex
      direction={"column"}
      minH={"100%"}
      align={"center"}
      justify={"center"}
    >
      <Box direction={"column"} align={"center"} justify={"center"}>
        <Stack spacing="48px" my={"8rem"}>
          <HStack spacing="8em">
            <Question operand1={12} operator={"x"} operand2={22} current={1} />
            <Question operand1={12} operator={"/"} operand2={22} current={0} />
            <Question operand1={12} operator={"+"} operand2={22} current={0} />
            <Question operand1={12} operator={"-"} operand2={22} current={0} />
          </HStack>
          <HStack spacing="8em">
            <Question operand1={12} operator={"x"} operand2={22} current={0} />
            <Question operand1={12} operator={"/"} operand2={22} current={0} />
            <Question operand1={12} operator={"+"} operand2={22} current={0} />
            <Question operand1={12} operator={"-"} operand2={22} current={0} />
          </HStack>
        </Stack>
        <Box w={"25%"} align={"center"}>
          <Input
            fontSize={"2rem"}
            placeholder={">"}
            borderColor={"brandDark.800"}
            _hover={{ borderColor: "brandDark.800" }}
            focusBorderColor={"brandDark.800"}
          />
          <Text fontSize={"1.1rem"}>QPM: </Text>
        </Box>
      </Box>
      <Spacer />
      <Box my={"1rem"}>
        <Text fontSize={"1.1rem"}>Settings</Text>
      </Box>
    </Flex>
  );
}

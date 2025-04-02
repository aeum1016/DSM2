import {
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GameModes } from "../../../slices/game";

const ModeSetting = ({ mode, setMode, endAt, setEndAt }) => {
  return (
    <Stack>
      <RadioGroup onChange={setMode} value={mode}>
        <Stack direction={"row"} justify={"space-around"}>
          <Radio value={GameModes.COMPLETIONS}>
            <Text color={"brandDark.800"}>COMPLETIONS</Text>
          </Radio>
          <Radio value={GameModes.DURATION}>
            <Text color={"brandDark.800"}>DURATION</Text>
          </Radio>
        </Stack>
      </RadioGroup>
      <Stack direction={"row"} align={"center"}>
        <Text color={"brandDark.800"}>
          {mode === GameModes.COMPLETIONS ? "QUESTIONS" : "SECONDS"}
        </Text>
        <Spacer />
        <NumberInput
          variant={"flushed"}
          color={"brandDark.800"}
          defaultValue={endAt}
          onChange={setEndAt}
          width={"16"}
        >
          <NumberInputField />
        </NumberInput>
      </Stack>
    </Stack>
  );
};

export default ModeSetting;

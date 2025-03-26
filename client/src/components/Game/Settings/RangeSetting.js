import {
  NumberInput,
  NumberInputField,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const RangeSetting = ({ label, low, high, onChangeLow, onChangeHigh }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Text color={"brandDark.800"}>{String(label).toUpperCase()}</Text>
      <Spacer />
      <NumberInput
        variant={"flushed"}
        color={"brandDark.800"}
        defaultValue={low}
        onChange={onChangeLow}
        width={"16"}
      >
        <NumberInputField />
      </NumberInput>
      <Text as={"i"} color={"brandDark.800"}>
        to
      </Text>
      <NumberInput
        variant={"flushed"}
        color={"brandDark.800"}
        defaultValue={high}
        onChange={onChangeHigh}
        width={"16"}
      >
        <NumberInputField />
      </NumberInput>
    </Stack>
  );
};

export default RangeSetting;

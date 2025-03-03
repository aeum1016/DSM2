import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { create, nextGame, reset, setSettings } from "../../../slices/game";
import { useState } from "react";

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.game.settings);

  const [settingsFormData, setSettingsFormData] = useState(settings);

  const onClose = () => {
    dispatch(reset());
    dispatch(setSettings(settingsFormData));
    dispatch(create());
    dispatch(nextGame());
  };

  return (
    <Flex justify={"center"} marginBottom={"1rem"} width={"100%"}>
      <Popover placement={"top"} onClose={onClose}>
        <PopoverTrigger>
          <Button variant={"unstyled"} _hover={{ color: "brandDark.300" }}>
            <Text fontWeight={"medium"}>Settings</Text>
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Stack direction={"row"}>
                <FormControl>
                  <FormLabel color={"brandDark.800"}>Add</FormLabel>
                  <NumberInput
                    min={1}
                    value={settingsFormData.max.add}
                    onChange={(e) => {
                      if (e)
                        setSettingsFormData((data) => {
                          return {
                            ...data,
                            max: { ...data.max, add: parseInt(e) },
                          };
                        });
                    }}
                  >
                    <NumberInputField color={"brandDark.800"} />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel color={"brandDark.800"}>Sub</FormLabel>
                  <NumberInput
                    min={1}
                    value={settingsFormData.max.sub}
                    onChange={(e) => {
                      setSettingsFormData((data) => {
                        return {
                          ...data,
                          max: { ...data.max, sub: parseInt(e) },
                        };
                      });
                    }}
                  >
                    <NumberInputField color={"brandDark.800"} />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel color={"brandDark.800"}>Mult</FormLabel>
                  <NumberInput
                    min={1}
                    value={settingsFormData.max.mult}
                    onChange={(e) => {
                      setSettingsFormData((data) => {
                        return {
                          ...data,
                          max: { ...data.max, mult: parseInt(e) },
                        };
                      });
                    }}
                  >
                    <NumberInputField color={"brandDark.800"} />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel color={"brandDark.800"}>Div</FormLabel>
                  <NumberInput
                    min={1}
                    value={settingsFormData.max.div}
                    onChange={(e) => {
                      setSettingsFormData((data) => {
                        return {
                          ...data,
                          max: { ...data.max, div: parseInt(e) },
                        };
                      });
                    }}
                  >
                    <NumberInputField color={"brandDark.800"} />
                  </NumberInput>
                </FormControl>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Flex>
  );
};

export default Settings;

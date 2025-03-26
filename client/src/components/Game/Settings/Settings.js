import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createQuestions, reset, setSettings } from "../../../slices/game";
import RangeSetting from "./RangeSetting";
import ModeSetting from "./ModeSetting";

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.game.settings);

  const [settingsFormData, setSettingsFormData] = useState(settings);

  const onClose = () => {
    if (JSON.stringify(settings) !== JSON.stringify(settingsFormData)) {
      dispatch(reset());
      dispatch(setSettings(settingsFormData));
    }
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
              <Stack>
                <ModeSetting
                  mode={settingsFormData.mode}
                  setMode={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        mode: e,
                      };
                    });
                  }}
                  endAt={settingsFormData.endAt}
                  setEndAt={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        endAt: parseInt(e),
                      };
                    });
                  }}
                />
                <RangeSetting
                  label={"Addition"}
                  low={settingsFormData.min.add}
                  high={settingsFormData.max.add}
                  onChangeLow={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        min: { ...data.min, add: parseInt(e) },
                      };
                    });
                  }}
                  onChangeHigh={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        max: { ...data.max, add: parseInt(e) },
                      };
                    });
                  }}
                />
                <RangeSetting
                  label={"Subtraction"}
                  low={settingsFormData.min.sub}
                  high={settingsFormData.max.sub}
                  onChangeLow={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        min: { ...data.min, sub: parseInt(e) },
                      };
                    });
                  }}
                  onChangeHigh={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        max: { ...data.max, sub: parseInt(e) },
                      };
                    });
                  }}
                />
                <RangeSetting
                  label={"Multiplication"}
                  low={settingsFormData.min.mult}
                  high={settingsFormData.max.mult}
                  onChangeLow={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        min: { ...data.min, mult: parseInt(e) },
                      };
                    });
                  }}
                  onChangeHigh={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        max: { ...data.max, mult: parseInt(e) },
                      };
                    });
                  }}
                />
                <RangeSetting
                  label={"Division"}
                  low={settingsFormData.min.div}
                  high={settingsFormData.max.div}
                  onChangeLow={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        min: { ...data.min, div: parseInt(e) },
                      };
                    });
                  }}
                  onChangeHigh={(e) => {
                    setSettingsFormData((data) => {
                      return {
                        ...data,
                        max: { ...data.max, div: parseInt(e) },
                      };
                    });
                  }}
                />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Flex>
  );
};

export default Settings;

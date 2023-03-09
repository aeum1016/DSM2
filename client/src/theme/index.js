import { extendTheme } from "@chakra-ui/react";

import styles from "./styles/styles";
import colors from "./styles/colors";
import fonts from "./styles/fonts";

const overrides = {
  styles,
  colors,
  fonts,
};

export default extendTheme(overrides);

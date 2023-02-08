import { extendTheme } from "@chakra-ui/react";

import styles from "./styles/styles";
import colors from "./styles/colors";

const overrides = {
  styles,
  colors,
};

export default extendTheme(overrides);

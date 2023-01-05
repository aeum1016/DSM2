import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ChakraProvider, Text } from "@chakra-ui/react";

import App from "./App";
import reducer from "./reducers/combined";

const store = configureStore({ reducer });

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);

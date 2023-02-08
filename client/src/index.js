import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import reducer from "./slices/reducers";
import theme from "./theme";

const store = configureStore({
  reducer,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      {console.log(theme)}
      <App />
    </ChakraProvider>
  </Provider>
);

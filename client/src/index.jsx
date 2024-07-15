import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Web3ReactProvider } from "@web3-react/core";
import {hooks, metaMask} from "./util/connectors/metaMask";

const connectors = [[metaMask, hooks]];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider connectors={connectors}>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </Web3ReactProvider>
);

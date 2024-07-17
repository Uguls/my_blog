import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// web3
import {WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {config, RainbowKitConfig} from "./wagmi/config";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiProvider config={RainbowKitConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </BrowserRouter>
        </Provider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

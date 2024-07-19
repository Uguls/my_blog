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
  // WagmiProvider로 감싸줘야 하위 컴포넌트들에서 web3가 이용이 가능하다
  // ./wagmi/config의 RainbowKitConfig로 정의한 함수로 config를 넣어줘야 RainbowKit을 이용이 가능
  // RainbowKit을 이요하지 않을 경우 그냥 config 사용
  <WagmiProvider config={RainbowKitConfig}>
    <QueryClientProvider client={queryClient}>
      {/*RainbowKit을 사용하기 위해 RainbowKitProvider로 감싸기*/}
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

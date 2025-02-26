import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import {Sepolia} from "@thirdweb-dev/chains"
import "./index.css";

const metamaskConfig = metamaskWallet({
  recommended: true
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider  activeChain={Sepolia}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);

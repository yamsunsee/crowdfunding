import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Store from "./store";
import App from "./App";
import { NETWORK } from "./constants";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={NETWORK}>
      <Store>
        <BrowserRouter basename="/crowdfunding">
          <App />
        </BrowserRouter>
      </Store>
    </ThirdwebProvider>
  </React.StrictMode>
);

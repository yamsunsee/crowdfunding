import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Store from "./store";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Store>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Store>
    </ThirdwebProvider>
  </React.StrictMode>
);
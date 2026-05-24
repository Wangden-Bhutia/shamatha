import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { StageProgressionProvider } from "./context/StageProgressionContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Shamatha failed to initialize: root container missing."
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StageProgressionProvider>
      <App />
    </StageProgressionProvider>
  </React.StrictMode>
);
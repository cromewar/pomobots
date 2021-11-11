import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider
    appId={process.env.REACT_APP_MORALIS_APP_ID}
    serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
  >
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import env from "react-dotenv";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log(env.MOVIES_ENDPOINT);
  root.render(
    <React.StrictMode>
      <App moviesEndpoint={env.MOVIES_ENDPOINT}/>
    </React.StrictMode>
  );
}

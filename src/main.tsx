import "@/assets/styles/index.css";
import "@/assets/styles/theme.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

document.title = `Cheese O Tea`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

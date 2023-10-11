import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { MemoryRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MemoryRouter>
);

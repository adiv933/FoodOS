import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.VITE_MODE === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
<<<<<<< HEAD
=======
  </React.StrictMode>,
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
);

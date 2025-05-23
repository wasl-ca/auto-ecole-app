import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </AppProvider>
  </React.StrictMode>
);

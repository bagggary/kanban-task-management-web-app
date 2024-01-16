import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./UI/ThemeContext";
import { DataProvider } from "./context/DataContext";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </ThemeProvider>
);

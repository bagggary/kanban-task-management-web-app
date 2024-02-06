import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { SideProvider } from "./context/SideToggle";
import { IdProvider } from "./context/IdContext";
import { ThemeProvider } from "./context/ThemeContext";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <ThemeProvider>
      <IdProvider>
        <SideProvider>
          <App />
        </SideProvider>
      </IdProvider>
    </ThemeProvider>
  </DataProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { SideProvider } from "./context/SideToggle.js";
import { IdProvider } from "./context/IdContext.js";
import { ThemeProvider } from "./context/ThemeContext.js";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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

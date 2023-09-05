import React from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App.tsx";
import { CardProvider } from "./hooks/useCards.tsx";
import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CardProvider>
        <CssBaseline />
        <App />
      </CardProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

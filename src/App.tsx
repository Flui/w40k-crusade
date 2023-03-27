import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import Agendas from "./routes/agendas";
import ErrorPage from "./routes/error-page";
import Forces from "./routes/forces";
import Force from "./routes/force";
import Unit from "./routes/unit";
import routes from "./routes";
import theme from "./theme";
import "./i18n";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
            path={routes.root}
            element={<Forces />}
            errorElement={<ErrorPage />}
          />
          <Route
            path={routes.force}
            element={<Force />}
            errorElement={<ErrorPage />}
          />
          <Route
            path={routes.agendas}
            element={<Agendas />}
            errorElement={<ErrorPage />}
          />
          <Route
            path={routes.unit}
            element={<Unit />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

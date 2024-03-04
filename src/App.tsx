// React Elements
import { FC, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeContext } from "./helper/Context";

// Components
import { WeatherForecast } from "./components/WeatherForecast";
import { DetailedWeather } from "./components/DetailedWeather";
import Header from "./components/Header";
import AlertMessage from "./components/Alert";
import Skeletons from "./components/Skeletons";

// Hooks
import { useGeolocationQuery } from "./helper/hooks";

// MUI Elements
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useWeatherTheme } from "./helper/weatherTheme";
import { WeatherApp } from "./index.style";

// Constants
import { DARK, GEOLOCATION_ERROR, LIGHT } from "./constants/common";

// Types
import { ColorModeContextType } from "./types";

const App: FC = () => {
  const { isLoading, error } = useGeolocationQuery();

  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode: ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT));
      },
    }),
    []
  );

  const theme = useWeatherTheme(mode);

  return (
    <WeatherApp>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {error ? (
            <AlertMessage
              alert={`${GEOLOCATION_ERROR} ${(error as Error).message}`}
              type="error"
            />
          ) : isLoading ? (
            <Skeletons flag={1} width={250} height={120} number={1} />
          ) : (
            <>
              <CssBaseline />
              <Header />
              <Router>
                <Routes>
                  <Route path="/" element={<WeatherForecast />} />
                  <Route path="/details/:date" element={<DetailedWeather />} />
                </Routes>
              </Router>
            </>
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </WeatherApp>
  );
};

export default App;

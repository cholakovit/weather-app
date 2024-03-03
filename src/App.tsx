import { FC, Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherForecast } from './components/WeatherForecast';
import { DetailedWeather } from './components/DetailedWeather';

import { useGeolocationQuery } from './helper/hooks';
import Header from './components/Header';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { DARK, LIGHT } from './constants/common';
import { ColorModeContext } from './helper/Context';
import { ColorModeContextType } from './types';
import { useWeatherTheme } from './helper/weatherTheme';
import AlertMessage from './components/Alert';
import Skeletons from './components/Skeletons';
import { WeatherApp } from './index.style';

const App: FC = () => {

  const { isLoading, error } = useGeolocationQuery();

  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode:ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT))
      }
  }),[])
  
  const theme = useWeatherTheme(mode)
  
  return (
    <WeatherApp>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {error ? (
            <AlertMessage alert={`Geolocation Error: ${(error as Error).message}`} type="error" />
          ) : isLoading ? (<Skeletons flag={1} width={250} height={120} number={1} />) : (
            <>
              <CssBaseline />

              <Header />
              <Suspense fallback={<div>Loading Geolocation...</div>}>
                <Router>
                  <Routes>
                    <Route path="/" element={<WeatherForecast />} />
                    <Route path="/details/:date" element={<DetailedWeather />} />
                  </Routes>
                </Router>
              </Suspense>
            </>
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </WeatherApp>
  );
}

export default App;
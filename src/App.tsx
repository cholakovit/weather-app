import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherForecast } from './components/WeatherForecast';
import { DetailedWeather } from './components/DetailedWeather';
import './App.css';

import { useGeolocationQuery } from './helper/hooks';
import Header from './components/Header';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { DARK, LIGHT } from './constants/common';
import { ColorModeContext } from './helper/Context';
import { ColorModeContextType } from './types';
import { useWeatherTheme } from './helper/weatherTheme';

const App: React.FC = () => {

  const { isLoading, error } = useGeolocationQuery();

  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode:ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT))
      }
  }),[])
  
  const theme = useWeatherTheme(mode)

  if (isLoading) return <div>Loading Geolocation...</div>;

  if (error) return <p>Geolocation Error: {error.message}</p>;



  return (
    
      <div className="App">
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />
            <Suspense fallback={<div>Loading location...</div>}>
              <Router>
                <Routes>
                  <Route path="/" element={<WeatherForecast />} />
                  <Route path="/details/:date" element={<DetailedWeather />} />
                </Routes>
              </Router>
            </Suspense>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </div>
  );
}

export default App;

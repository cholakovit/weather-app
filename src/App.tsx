import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherForecast } from './components/WeatherForecast';
import { DetailedWeather } from './components/DetailedWeather';
import './App.css';




const App: React.FC = () => {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WeatherForecast />} />
          <Route path="/details/:date" element={<DetailedWeather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

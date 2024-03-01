import { Link } from "react-router-dom";
import { useGeolocation, useWeatherForecast } from "../../helper/hooks";

export const WeatherForecast = () => {
  const { location, error: geoError } = useGeolocation();

  const { forecast, isLoading, error: forecastError } = useWeatherForecast(location.lat, location.lon);

  if (isLoading) return <div>Loading forecast...</div>; 

  if (forecastError) return <p>Error: {forecastError}</p>;
  if (geoError) return <p>Geolocation Error: {geoError}</p>;

  if (!forecast) return <div>Forecast data is unavailable.</div>;

  const dailyForecasts = forecast.list.filter(f => f.dt_txt.includes("12:00:00"));

  return (
    <>
      <div>
        <p>Latitude: {location.lat}, Longitude: {location.lon}</p>
      </div>
      <div>
        <h2>5 Day Weather Forecast in {forecast.city.name}</h2>
        {dailyForecasts.map((day, index) => (
          <Link to={`/details/${encodeURIComponent(day.dt_txt)}`} key={index}>
            <div>
              <p>Date: {day.dt_txt}</p>
              <p>Temperature: {day.main.temp}°C</p>
              <p>Condition: {day.weather[0].main}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

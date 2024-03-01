import { useParams, Link } from 'react-router-dom';
import { useDetailedWeather } from '../../helper/hooks';

export const DetailedWeather = () => {
  const { weather, isLoading, error } = useDetailedWeather();
  const { date } = useParams<{ date: string }>();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>No weather data available</div>;

  return (
    <div>
      <h2>Detailed Weather for {date}</h2>
      <p><strong>Temperature:</strong> Day: {weather.temp.day}°C, Night: {weather.temp.night}°C</p>
      <p><strong>Feels Like:</strong> Day: {weather.feels_like.day}°C, Night: {weather.feels_like.night}°C</p>
      <p><strong>Humidity:</strong> {weather.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weather.wind_speed} m/s</p>
      <p><strong>Weather Conditions:</strong> {weather.weather[0].main} - {weather.weather[0].description}</p>
      <p><strong>Cloudiness:</strong> {weather.clouds}%</p>
      <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
      <p><strong>UV Index:</strong> {weather.uvi}</p>
      <p><strong>Sunrise:</strong> {new Date(weather.sunrise * 1000).toLocaleTimeString('en-US')}</p>
      <p><strong>Sunset:</strong> {new Date(weather.sunset * 1000).toLocaleTimeString('en-US')}</p>
      {weather.rain && <p><strong>Rain Volume:</strong> {weather.rain} mm</p>}
      {weather.snow && <p><strong>Snow Volume:</strong> {weather.snow} mm</p>}

      <Link to="/">Back to Forecast</Link>
    </div>
  );
};
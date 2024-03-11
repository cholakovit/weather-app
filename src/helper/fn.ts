// Constants
import { F, FAILED_FETCH_FORCAST_DATA, GEOLOCATION_NOT_SUPPORTED_BROWSER, HTTP_ERROR_STATUS, UNABLE_RETRIEVE_LOCATION } from "@/constants/common";

// Types
import { DailyWeather, ForecastData, HourlyWeather, LocationState, WeatherData } from "@/types";

export const displayTemperature = (tempCelsius: number, metricSystem: string): string => {
  return metricSystem === F
    ? `${Math.round((tempCelsius * 9 / 5) + 32)}°F` // Convert to Fahrenheit and round the result
    : `${Math.round(tempCelsius)}°C`; // Round Celsius for consistency
};

export async function fetchWeatherData(date: string, lat: number | null | undefined, lon: number | null | undefined): Promise<WeatherData> {
  const decodedDate = decodeURIComponent(date);
  const url = `${process.env.REACT_APP_ONECALL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&exclude=minutely,alerts&units=metric`;

  const targetDayStart = new Date(decodedDate).setHours(0, 0, 0, 0);
  const targetDayEnd = new Date(decodedDate).setHours(23, 59, 59, 999);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${HTTP_ERROR_STATUS} ${response.status}`);
  }
  
  const data = await response.json();

  const filteredHourlyData = data.hourly?.filter((hourlyWeather: HourlyWeather) => {
    const hourlyTimestamp = hourlyWeather.dt * 1000; // Convert to milliseconds
    const isSameDay = hourlyTimestamp >= targetDayStart && hourlyTimestamp <= targetDayEnd;
    return isSameDay;
  }) ?? [];

  const dailyDataForDate = data.daily?.find((daily: DailyWeather) => {
    const dailyDate = new Date(daily.dt * 1000);
    return dailyDate >= new Date(targetDayStart) && dailyDate <= new Date(targetDayEnd);
  });

  return {
    daily: dailyDataForDate ? [dailyDataForDate] : [], 
    hourly: filteredHourlyData,
  };
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWeatherForecast(lat: number | null | undefined, lon: number | null | undefined): Promise<ForecastData> {
  const url = `${process.env.REACT_APP_FORCAST_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  const [response] = await Promise.all([
    fetch(url),
    delay(2000) 
  ]);

  if (!response.ok) {
    throw new Error(FAILED_FETCH_FORCAST_DATA);
  }
  return response.json();
}

export async function fetchCurrentLocation(): Promise<LocationState> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(GEOLOCATION_NOT_SUPPORTED_BROWSER));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(UNABLE_RETRIEVE_LOCATION));
        }
      );
    }
  });
}

export async function fetchCoordinatesForCity(cityName: string): Promise<LocationState | null> {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates for city");
  }
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }
  return null;
}
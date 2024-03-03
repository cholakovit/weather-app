import { ForecastData, LocationState, WeatherData } from "../types";


export const displayTemperature = (tempCelsius: number, metricSystem: string): string => {
  return metricSystem === 'F'
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
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();

  const filteredHourlyData = data.hourly?.filter((hourlyWeather: any) => {
    const hourlyTimestamp = hourlyWeather.dt * 1000; // Convert to milliseconds
    const isSameDay = hourlyTimestamp >= targetDayStart && hourlyTimestamp <= targetDayEnd;
    return isSameDay;
  }) ?? [];

  const dailyDataForDate = data.daily?.find((daily: any) => {
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
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
}

export async function fetchCurrentLocation(): Promise<LocationState> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error('Unable to retrieve your location.'));
        }
      );
    }
  });
}
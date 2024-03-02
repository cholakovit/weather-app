import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DailyWeather, ForecastData, LocationState, WeatherData } from "../types";
import { ColorModeContext } from "./Context";

async function fetchCurrentLocation(): Promise<LocationState> {
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

export const useGeolocationQuery = () => {
  return useQuery<LocationState, Error>({
    queryKey: ['geolocation'],
    queryFn: fetchCurrentLocation, 
    staleTime: Infinity,
  });
};

async function fetchWeatherForecast(lat: number | null | undefined, lon: number | null | undefined): Promise<ForecastData> {
  const url = `${process.env.REACT_APP_FORCAST_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
}

export const useWeatherForecast = () => {

  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>(['geolocation']);

  const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
    queryKey: ['weatherForecast', cachedLocation?.lat, cachedLocation?.lon],
    queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
    enabled: cachedLocation?.lat !== undefined && cachedLocation?.lon !== undefined, // Only run if lat and lon are available
    staleTime: Infinity,
  });

  return { forecast, isLoading, error: error?.message };
};

async function fetchWeatherData(date: string, lat: number | null | undefined, lon: number | null | undefined): Promise<DailyWeather | undefined> {

  const decodedDate = decodeURIComponent(date);

  const url = `${process.env.REACT_APP_ONECALL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&exclude=minutely,hourly,alerts&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: WeatherData = await response.json();

  return data.daily.find((d) => {
    const dayDateString = new Date(d.dt * 1000).toLocaleDateString('en-US');
    const queryDate = new Date(decodedDate).toLocaleDateString('en-US');
    return dayDateString === queryDate;
  });
}

const convertCelsiusToFahrenheit = (celsius: number | undefined) => {
  if (celsius === undefined) return undefined; // Or return a special value indicating the input was undefined
  return (celsius * 9/5) + 32;
};

const displayTemperature = (tempCelsius: any, metricSystem: any) => metricSystem === 'F' ? `${(tempCelsius * 9 / 5) + 32}°F` : `${tempCelsius}°C`;

const convertWindSpeed = (speed: any, system: any) => {
  if(system === 'F') {
    return (speed * 2.23694).toFixed(2) + " mph";
  } else {
    return speed + " m/s";
  }
};

export const useDetailedWeather = () => {
  const { date } = useParams<{ date: string }>();

  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>(['geolocation']);

  const { data: metricSystem } = useQuery({
    queryKey: ['metricSystem'],
    initialData: localStorage.getItem('metricSystem') || 'C'
  });

  const queryInfo = useQuery<DailyWeather | undefined, Error>({
    queryKey: ['detailedWeather', date],
    queryFn: () => date ? fetchWeatherData(date, cachedLocation?.lat, cachedLocation?.lon) : Promise.reject(new Error("Date is undefined")),
    enabled: !!date, // Ensures the query only runs when date is not null or undefined
  });

  // Destructure after calling useQuery
  const { data: weather, isLoading, error } = queryInfo;

  const displayDayTemp = metricSystem === 'C' ? weather?.temp.day : convertCelsiusToFahrenheit(weather?.temp.day);
  const displayNightTemp = metricSystem === 'C' ? weather?.temp.night : convertCelsiusToFahrenheit(weather?.temp.night);

  const temperatureDay = displayTemperature(weather?.feels_like.day, metricSystem);
  const temperatureNight = displayTemperature(weather?.feels_like.night, metricSystem);
  const windSpeedDisplay = convertWindSpeed(weather?.wind_speed, metricSystem);

  return { 
    weather, 
    isLoading, 
    error: error ? error.message : null, 
    displayDayTemp,
    displayNightTemp,
    temperatureDay,
    temperatureNight,
    metricSystem,
    windSpeedDisplay
  };
};

export const useMetricSystem = () => {
  const colorMode = useContext(ColorModeContext) || {};

  const queryClient = useQueryClient();

  const [metricSystem, setMetricSystem] = useState<'C' | 'F'>(() => {
    // Initialize the metric system state from localStorage or default to 'C'
    // Type assertion added here
    const storedValue = localStorage.getItem('metricSystem');
    return (storedValue === 'C' || storedValue === 'F' ? storedValue : 'C') as 'C' | 'F';
  });

  useEffect(() => {
    // Update localStorage whenever the metric system state changes
    localStorage.setItem('metricSystem', metricSystem);
    queryClient.setQueryData(['metricSystem'], metricSystem);
  }, [metricSystem, queryClient]);

  const toggleMetricSystem = () => {
    // Toggle the metric system between 'C' and 'F'
    setMetricSystem(prevSystem => prevSystem === 'C' ? 'F' : 'C');
  };

  return { metricSystem, toggleMetricSystem, colorMode };
};
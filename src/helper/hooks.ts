import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DailyWeather, ErrorState, ForecastData, LocationState, WeatherData } from "../types";

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

export const useGeolocation2 = () => {
  const [location, setLocation] = useState<LocationState>({ lat: null, lon: null });
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    // Update state with the new location
    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    // Update state in case of an error
    const handleError = (error: GeolocationPositionError) => {
      setError('Unable to retrieve your location.');
    };

    // Start watching the position
    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  return { location, error };
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
  console.log('cachedLocation: ', cachedLocation)

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

export const useDetailedWeather = () => {
  const { date } = useParams<{ date: string }>();

  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>(['geolocation']);
  console.log('cachedLocation: ', cachedLocation)

  const queryInfo = useQuery<DailyWeather | undefined, Error>({
    queryKey: ['detailedWeather', date],
    queryFn: () => date ? fetchWeatherData(date, cachedLocation?.lat, cachedLocation?.lon) : Promise.reject(new Error("Date is undefined")),
    enabled: !!date, // Ensures the query only runs when date is not null or undefined
  });

  // Destructure after calling useQuery
  const { data: weather, isLoading, error } = queryInfo;

  return { 
    weather, 
    isLoading, 
    error: error ? error.message : null, // Ensuring error is formatted as a string or null
  };
};
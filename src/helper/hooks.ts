// React Elements
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorModeContext } from "./Context";

// Tanstack Query Elements
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types
import { AlertWithTimeoutHookProps, ForecastData, LocationState, WeatherData } from "../types";

// Hooks
import { fetchCurrentLocation, fetchWeatherData, fetchWeatherForecast } from "./fn";

// Constants
import { C, DATE_UNDEFINED, DETAILED_WEATHER, F, GEOLOCATION, METRIC_SYSTEM, WEATHER_FORCAST } from "../constants/common";


export const useGeolocationQuery = () => {
  return useQuery<LocationState, Error>({
    queryKey: [GEOLOCATION],
    queryFn: fetchCurrentLocation, 
    staleTime: Infinity,
  });
};

export const useWeatherForecast = () => {

  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);

  const { data: metricSystem } = useQuery({
    queryKey: [METRIC_SYSTEM],
    initialData: localStorage.getItem(METRIC_SYSTEM) || C
  });

  const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
    queryKey: [WEATHER_FORCAST, cachedLocation?.lat, cachedLocation?.lon],
    queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
    enabled: cachedLocation?.lat !== undefined && cachedLocation?.lon !== undefined, // Only run if lat and lon are available
    staleTime: Infinity,
  });

  return { forecast, isLoading, error: error?.message, metricSystem };
};

export const useDetailedWeather = () => {
  const { date } = useParams<{ date: string }>();
  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);

  const { data: metricSystem } = useQuery({
    queryKey: [METRIC_SYSTEM],
    initialData: localStorage.getItem(METRIC_SYSTEM) || C
  });

  console.log('date: ', date)

  const { data: weatherData, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: [DETAILED_WEATHER, date],
    queryFn: () => date ? fetchWeatherData(date, cachedLocation?.lat, cachedLocation?.lon) : Promise.reject(new Error(DATE_UNDEFINED)),
    enabled: !!date,
  });

  return { hourlyData: weatherData?.hourly, isLoading, error, metricSystem };
};

export const useMetricSystem = () => {
  const colorMode = useContext(ColorModeContext) || {};

  const queryClient = useQueryClient();

  const [metricSystem, setMetricSystem] = useState<'C' | 'F'>(() => {
    const storedValue = localStorage.getItem(METRIC_SYSTEM);
    return (storedValue === C || storedValue === F ? storedValue : C) as 'C' | 'F';
  });

  useEffect(() => {
    localStorage.setItem(METRIC_SYSTEM, metricSystem);
    queryClient.setQueryData([METRIC_SYSTEM], metricSystem);
  }, [metricSystem, queryClient]);

  const toggleMetricSystem = () => {
    setMetricSystem(prevSystem => prevSystem === C ? F : C);
  };

  return { metricSystem, toggleMetricSystem, colorMode };
};

export const useAlertWithTimeout = ({ initialAlert, timeout }: AlertWithTimeoutHookProps): string | null => {
  const [alert, setAlert] = useState<string | null>(initialAlert);

  useEffect(() => {
    setAlert(initialAlert);

    // Clear the alert after the specified timeout
    const timer = setTimeout(() => {
      setAlert(null);
    }, timeout);

    // Clean up the timeout when the component unmounts or when the alert changes
    return () => clearTimeout(timer);
  }, [initialAlert, timeout]);

  return alert;
};

export const usePrefetchWeatherData = () => {
  const queryClient = useQueryClient();

  const prefetchWeatherData = (date: string) => {
    const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);

    if (cachedLocation) {
      queryClient.prefetchQuery({
        queryKey: ['detailedWeather', date],
        queryFn: () => fetchWeatherData(date, cachedLocation.lat, cachedLocation.lon),
      });
    }
  };

  return prefetchWeatherData;
};
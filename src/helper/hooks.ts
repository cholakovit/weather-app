import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertWithTimeoutHookProps, ForecastData, LocationState, WeatherData } from "../types";
import { ColorModeContext } from "./Context";
import { fetchCurrentLocation, fetchWeatherData, fetchWeatherForecast } from "./fn";
import { C, DETAILED_WEATHER, F, GEOLOCATION, METRIC_SYSTEM, WEATHER_FORCAST } from "../constants/common";

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
    initialData: localStorage.getItem('metricSystem') || C
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

  const { data: weatherData, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: [DETAILED_WEATHER, date],
    queryFn: () => date ? fetchWeatherData(date, cachedLocation?.lat, cachedLocation?.lon) : Promise.reject(new Error("Date is undefined")),
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
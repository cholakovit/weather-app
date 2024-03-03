import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ForecastData, LocationState, WeatherData } from "../types";
import { ColorModeContext } from "./Context";
import { fetchCurrentLocation, fetchWeatherData, fetchWeatherForecast } from "./fn";

export const useGeolocationQuery = () => {
  return useQuery<LocationState, Error>({
    queryKey: ['geolocation'],
    queryFn: fetchCurrentLocation, 
    staleTime: Infinity,
  });
};

export const useWeatherForecast = () => {

  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>(['geolocation']);

  const { data: metricSystem } = useQuery({
    queryKey: ['metricSystem'],
    initialData: localStorage.getItem('metricSystem') || 'C'
  });

  const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
    queryKey: ['weatherForecast', cachedLocation?.lat, cachedLocation?.lon],
    queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
    enabled: cachedLocation?.lat !== undefined && cachedLocation?.lon !== undefined, // Only run if lat and lon are available
    staleTime: Infinity,
  });

  return { forecast, isLoading, error: error?.message, metricSystem };
};

export const useDetailedWeather = () => {
  const { date } = useParams<{ date: string }>();
  const queryClient = useQueryClient();
  const cachedLocation = queryClient.getQueryData<LocationState>(['geolocation']);

  const { data: metricSystem } = useQuery({
    queryKey: ['metricSystem'],
    initialData: localStorage.getItem('metricSystem') || 'C'
  });

  const { data: weatherData, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: ['detailedWeather', date],
    queryFn: () => date ? fetchWeatherData(date, cachedLocation?.lat, cachedLocation?.lon) : Promise.reject(new Error("Date is undefined")),
    enabled: !!date,
  });

  return { hourlyData: weatherData?.hourly, isLoading, error, metricSystem };
};

export const useMetricSystem = () => {
  const colorMode = useContext(ColorModeContext) || {};

  const queryClient = useQueryClient();

  const [metricSystem, setMetricSystem] = useState<'C' | 'F'>(() => {
    const storedValue = localStorage.getItem('metricSystem');
    return (storedValue === 'C' || storedValue === 'F' ? storedValue : 'C') as 'C' | 'F';
  });

  useEffect(() => {
    localStorage.setItem('metricSystem', metricSystem);
    queryClient.setQueryData(['metricSystem'], metricSystem);
  }, [metricSystem, queryClient]);

  const toggleMetricSystem = () => {
    setMetricSystem(prevSystem => prevSystem === 'C' ? 'F' : 'C');
  };

  return { metricSystem, toggleMetricSystem, colorMode };
};
// React Elements
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorModeContext } from "./Context";

// Tanstack Query Elements
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types
import { AlertWithTimeoutHookProps, ForecastData, LocationState, WeatherData } from "@/types";

// Hooks
import { fetchCoordinatesForCity, fetchCurrentLocation, fetchWeatherData, fetchWeatherForecast } from "./fn";

// Constants
import { C, DATE_UNDEFINED, DETAILED_WEATHER, F, GEOLOCATION, METRIC_SYSTEM, WEATHER_FORCAST } from "@/constants/common";


// Async fetch and cache the user's geolocation data with no expiration time
export const useGeolocationQuery = () => {
  return useQuery<LocationState, Error>({
    queryKey: [GEOLOCATION],
    queryFn: fetchCurrentLocation, 
    staleTime: Infinity,
  });
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
        queryKey: [DETAILED_WEATHER, date],
        queryFn: () => fetchWeatherData(date, cachedLocation.lat, cachedLocation.lon),
      });
    }
  };

  return prefetchWeatherData;
};

// export const useWeatherForecast = () => {

//   const queryClient = useQueryClient();
//   const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);

//   console.log('cachedLocation: ', cachedLocation)

//   // Initializing the metricSystem query with a value from localStorage (if it exists) or defaulting to Celsius (C)
//   // This value is then cached by React Query under the provided queryKey, allowing other parts of the application to access
//   const { data: metricSystem } = useQuery({
//     queryKey: [METRIC_SYSTEM],
//     initialData: localStorage.getItem(METRIC_SYSTEM) || C
//   });

//   const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
//     queryKey: [WEATHER_FORCAST, cachedLocation?.lat, cachedLocation?.lon],
//     queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
//     enabled: cachedLocation?.lat !== undefined && cachedLocation?.lon !== undefined, // Only run if lat and lon are available
//     staleTime: Infinity,
//   });

//   return { forecast, isLoading, error: error?.message, metricSystem };
// };


export const useWeatherForecast = (cachedLocation: any) => {
  const { data: metricSystem } = useQuery({
    queryKey: [METRIC_SYSTEM],
    initialData: () => localStorage.getItem(METRIC_SYSTEM) || 'C',
  });

  const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
    queryKey: [WEATHER_FORCAST, cachedLocation?.lat, cachedLocation?.lon],
    queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
    enabled: !!cachedLocation?.lat && !!cachedLocation?.lon, // Only run if lat and lon are available
    staleTime: Infinity,
  });

  return { forecast, isLoading, error: error?.message, metricSystem };
};



// export const useWeatherForecast = (cachedLocation: any) => {
//   //const queryClient = useQueryClient();
//   //const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);


//   console.log('useWeatherForecast coordinates: ', cachedLocation)

//   // Define the query using a single options object.
//   const { data: forecast, isLoading, error } = useQuery<ForecastData, Error>({
//     queryKey: [WEATHER_FORCAST, cachedLocation?.lat, cachedLocation?.lon],
//     queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
//     enabled: !!cachedLocation?.lat && !!cachedLocation?.lon, // Only run if lat and lon are available
//     staleTime: Infinity,
//   });

//   const { data: metricSystem } = useQuery({
//     queryKey: [METRIC_SYSTEM],
//     initialData: () => localStorage.getItem(METRIC_SYSTEM) || 'C',
//   });

//   return { forecast, isLoading, error: error?.message, metricSystem };
// };


export const useHandleSearchCityForm = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  // When cityName changes, fetch new coordinates and update query data
  useEffect(() => {
    const fetchAndSetCoordinates = async () => {
      if (!cityName) return;

      try {
        const coordinates = await fetchCoordinatesForCity(cityName);
        if (coordinates) {
          // Set the new geolocation data
          queryClient.setQueryData([GEOLOCATION], coordinates);

          // Invalidate queries related to the weather forecast to trigger a refetch
          queryClient.invalidateQueries({ queryKey: [WEATHER_FORCAST] });
        } else {
          console.error("Failed to fetch coordinates for the city");
        }
      } catch (err) {
        console.error("Error fetching coordinates: ", err);
      }
    };

    fetchAndSetCoordinates();
  }, [cityName, queryClient]);

  const handleSearch = () => {
    const cityNameValue: any = inputRef.current?.value;
    setCityName(cityNameValue);
  };

  return { inputRef, handleSearch };
};





// export const useHandleSearchCityForm = () => {
//   const queryClient = useQueryClient()
//   const inputRef = useRef<HTMLInputElement>(null)

//   const handleSearch = async () => {
//     const cityName = inputRef.current?.value
//     if(!cityName) return
    
//     try {
//       const coordinates = await fetchCoordinatesForCity(cityName)
//       if(coordinates) {
//         queryClient.invalidateQueries({ queryKey: [WEATHER_FORCAST] });
//         queryClient.setQueryData([GEOLOCATION], coordinates);
//         console.log('useHandleSearchCityForm cityName: ', cityName)
//         console.log('useHandleSearchCityForm coordinates: ', coordinates)
//       } else {
//         console.error("Failed to fetch coordinates for the city");
//       }
//     } catch(err) {  
//       console.error("Error fetching coordinates: ", err)
//     }
//   }

//   return { inputRef, handleSearch }
// }
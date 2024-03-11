// React Elements
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ColorModeContext } from "./Context";

// Tanstack Query Elements
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types
import { AlertWithTimeoutHookProps, ForecastData, LocationState, WeatherData, CustomPalette } from "@/types";

// Hooks
import { fetchCoordinatesForCity, fetchCurrentLocation, fetchWeatherData, fetchWeatherForecast } from "./fn";

// Constants
import { C, DATE_UNDEFINED, DETAILED_WEATHER, F, GEOLOCATION, METRIC_SYSTEM, WEATHER_FORCAST } from "@/helper/constants";

// MUI Elements
import { createTheme } from "@mui/material/styles";
import { PaletteMode, colors } from "@mui/material";


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

export const useWeatherForecast = () => {
  const { data: cachedLocation } = useQuery({
    queryKey: [GEOLOCATION],
    initialData: JSON.parse(localStorage.getItem(GEOLOCATION) || '{}')
  });

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

export const useSearchCity = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const cityName = inputRef.current?.value.trim();
    if (cityName) {
      try {
        const fetchedCoordinates = await fetchCoordinatesForCity(cityName);
        if (fetchedCoordinates) {
          // Update localStorage
          localStorage.setItem(GEOLOCATION, JSON.stringify(fetchedCoordinates));

          // Update React Query's cache
          queryClient.setQueryData<LocationState>([GEOLOCATION], fetchedCoordinates);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  };

  return { inputRef, handleSearch };
};

export const useWeatherTheme = (mode: PaletteMode) => {
  // memoizing the result so it won't calculate every time
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                margin: 0,
                mode,
                ...(mode === "light"
                  ? {
                      backgroundColor: colors.grey[100],
                      color: colors.grey[900],
                    }
                  : {
                      backgroundColor: colors.orange[900],
                      color: colors.grey[100],
                    }),
              },
            },
          },
        },
        palette: {
          primary: {
            main: mode === "light" ? colors.grey[600] : colors.orange[900],
            black: mode === "light" ? colors.grey[400] : colors.grey[900],
            white: mode === "light" ? colors.grey[800] : colors.grey[600],
            lighter: mode === "light" ? colors.grey[800] : colors.grey[400],
            iconColor: mode === "light" ? colors.grey[900] : colors.grey[100],
          },
          mode, 
        } as CustomPalette, 
      }),
    [mode]
  );

  return theme;
};



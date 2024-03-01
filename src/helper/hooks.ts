import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGeolocation = () => {
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

export const useWeatherForecast = (lat: number | null, lon: number | null) => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure lat and lon are available before fetching
    if (lat !== null && lon !== null) {
      setIsLoading(true);
      const fetchData = async () => {
        const apiKey = '85a787896321da397a885129eb40f611';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        // Use AbortController to cancel the fetch request if the component unmounts
        const controller = new AbortController();
        const signal = controller.signal;

        try {
          const response = await fetch(url, { signal });
          if (!response.ok) {
            throw new Error('Failed to fetch forecast data');
          }
          const data: ForecastData = await response.json();
          setForecast(data);
        } catch (error) {
          setError('Failed to load forecast data');
        } finally {
          setIsLoading(false);
        }

        return () => {
          controller.abort();
        };
      };

      fetchData();
    }
  }, [lat, lon]);

  return { forecast, isLoading, error };
};

export const useDetailedWeather = () => {
  const [weather, setWeather] = useState<DailyWeather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { date } = useParams<{ date: string }>();

  useEffect(() => {
    if (date) {
      const decodedDate = decodeURIComponent(date);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=42.136097&lon=24.742168&appid=85a787896321da397a885129eb40f611&exclude=minutely,hourly,alerts&units=metric`;

      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: WeatherData = await response.json();

          const targetDay = data.daily.find((d) => {
            const dayDateString = new Date(d.dt * 1000).toLocaleDateString('en-US');
            const queryDate = new Date(decodedDate).toLocaleDateString('en-US');
            return dayDateString === queryDate;
          });

          if (targetDay) {
            setWeather(targetDay);
          } else {
            setError('No data found for this date.');
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [date]);

  return { weather, isLoading, error };
};

type DailyWeather = {
  dt: number;
  temp: {
    day: number;
    night: number; 
  };
  feels_like: { 
    day: number;
    night: number;
  };
  humidity: number; 
  wind_speed: number; 
  weather: [{
    main: string;
    description: string;
  }];
  clouds: number; 
  pressure: number; 
  uvi: number; 
  sunrise: number; 
  sunset: number; 
  rain?: number | null;
  snow?: number | null;
}

type WeatherData = {
  daily: DailyWeather[];
}

type WeatherInfo = {
  description: string;
  icon: string;
  id: number;
  main: string;
}

type ForecastInfo = {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: WeatherInfo[];
}

type ForecastData = {
  city: {
    name: string;
  };
  list: ForecastInfo[];
}

type LocationState = {
  lat: number | null;
  lon: number | null;
};

type ErrorState = string | null;
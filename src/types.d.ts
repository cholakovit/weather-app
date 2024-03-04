import { PaletteMode } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";
import { AlertColor } from "@mui/material";

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
  hourly?: number | null;
}

type HourlyWeather = {
  dt: number; // Timestamp for the hour
  temp: number; // Actual temperature
  feels_like: number; // "Feels like" temperature
  weather: [
    {
      main: string; // Main weather condition (e.g., "Clouds", "Rain")
      description: string; // More detailed weather condition description
    }
  ];
  // Include any other properties you might need from the hourly weather data
};

type WeatherData = {
  daily: DailyWeather[];
  hourly?: HourlyWeather[];
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
  lat: number | null | undefined;
  lon: number | null | undefined;
};

type ErrorState = string | null;

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    black?: string;
    fourth?: string; 
    white?: string;
  }

  type Palette = {
    primary: PaletteColor;
  }

  // Merge the Palette interface with the Theme interface
  interface Theme extends Palette {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      up: (key: number | string) => string;
      down: (key: number | string) => string;
      between: (start: number | string, end: number | string) => string;
      only: (key: number | string) => string;
      width: (key: number | string) => number;
    };
  }

  type ThemeOptions = {
    palette?: PaletteOptions;
  }
}

export type ColorModeContextValue = {
  toggleColorMode: () => void;
}
export type CustomPalette = {
  primary: {
    main: string;
    black: string;
    white: string;
    iconColor: string;
  };
  mode: PaletteMode;
}

export type ColorModeContextType = {
  toggleColorMode: () => void;
}

// for the Theme
export type colorModeProps = {
  toggleColorMode?: string | null;
};

export type metricModeProps = {
  toggleMetricMode?: string | null;
};

export type AlertWithTimeoutHookProps = {
  initialAlert: string | null
  timeout: number
}

export type AlertMessageProps = {
  alert: string | null;
  type: AlertColor;
}

// for the Skeleton
type SkeletonProps = {
  flag: number;
  width: number;
  height: number;
  number: number;
};

type UseMetricSystemReturn = {
  metricSystem: 'C' | 'F';
  toggleMetricSystem: () => void;
  colorMode: { toggleColorMode: () => void };
}
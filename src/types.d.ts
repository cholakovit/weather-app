import { PaletteMode } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";

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

  interface Palette {
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

  // Add any other customizations or extensions to the ThemeOptions interface if needed
  interface ThemeOptions {
    palette?: PaletteOptions;
    // Add theme options here, if any
  }
}

export interface ColorModeContextValue {}

// Define a custom palette interface
export interface CustomPalette {
  primary: {
    main: string;
    black: string;
    white: string;
    iconColor: string;
  };
  mode: PaletteMode;
}

export interface ColorModeContextType {
  toggleColorMode: () => void;
}







// for the Theme
export interface colorModeProps {
  toggleColorMode?: any;
};
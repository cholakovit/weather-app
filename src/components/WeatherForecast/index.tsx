// Hooks
import { usePrefetchWeatherData, useWeatherForecast } from "@/helper/hooks";
import { displayTemperature } from "@/helper/fn";

// MUI Elements
import {
  ConditionHolder,
  Content,
  H1Holder,
  ItemHolder,
  ItemsContainer,
  NameHolder,
  StyledLink,
  TemperatureHolder,
} from "./index.style";
import CloudSharpIcon from "@mui/icons-material/CloudSharp";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormSharpIcon from "@mui/icons-material/ThunderstormSharp";
import DeviceThermostatSharpIcon from "@mui/icons-material/DeviceThermostatSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

// Components
import AlertMessage from "@/components/Alert";
import Skeletons from "@/components/Skeletons";

// Constants
import {
  CLEAR,
  CLOUDS,
  CONDITION,
  DATE,
  DAYS_WEATHER_FORCAST,
  NETWORK_RESPONS_NOT_OK,
  RAIN,
  TEMPERATURE,
} from "@/helper/constants";

export const WeatherForecast = () => {

  // Fetches weather forecast data based on the user's geolocation and metric system preference, managing loading states, errors, and caching with React Query.
  const { forecast, isLoading, error, metricSystem } = useWeatherForecast();
  
  // Provides a function that prefetches detailed weather data for a specific date, using a cached location, to improve data loading efficiency and user experience.
  const prefetchWeatherData = usePrefetchWeatherData();

  const dailyForecasts = forecast?.list.filter((f) =>
    f.dt_txt.includes("12:00:00")
  );

  return (
    <>
      <H1Holder>
        {" "}
        {`${DAYS_WEATHER_FORCAST} ${forecast?.city?.name || 'city'}`}{" "}
        <CloudSharpIcon fontSize="large" />
      </H1Holder>
      <ItemsContainer>
        {error ? (
          <AlertMessage alert={NETWORK_RESPONS_NOT_OK} type="error" />
        ) : isLoading ? (
          <>
            <Skeletons flag={1} width={250} height={120} number={5} />
          </>
        ) : (
          <>
            {dailyForecasts?.map((day, index) => (
              <ItemHolder role="provider" key={index}>
                <Content>
                  <StyledLink
                    to={`/details/${encodeURIComponent(day.dt_txt)}`}
                    key={index}
                    onMouseEnter={() => prefetchWeatherData(day.dt_txt)}
                  >
                    <NameHolder>
                      {DATE + day.dt_txt} <CalendarMonthSharpIcon />
                    </NameHolder>
                    <TemperatureHolder>
                      {TEMPERATURE +
                        ": " +
                        displayTemperature(day.main.temp, metricSystem)}{" "}
                      <DeviceThermostatSharpIcon />
                    </TemperatureHolder>
                    <ConditionHolder>
                      {CONDITION + ": "}
                      {day.weather[0].main === CLOUDS && (
                        <>
                          {day.weather[0].main} <CloudSharpIcon />
                        </>
                      )}
                      {day.weather[0].main === RAIN && (
                        <>
                          {day.weather[0].main} <ThunderstormSharpIcon />
                        </>
                      )}
                      {day.weather[0].main === CLEAR && (
                        <>
                          {day.weather[0].main} <WbSunnyIcon />
                        </>
                      )}
                    </ConditionHolder>
                  </StyledLink>
                </Content>
              </ItemHolder>
            ))}
          </>
        )}
      </ItemsContainer>
    </>
  );
};
import { useWeatherForecast } from "../../helper/hooks";
import { ConditionHolder, Content, H1Holder, ItemHolder, ItemsContainer, NameHolder, StyledLink, TemperatureHolder } from "./index.style";

import CloudSharpIcon from '@mui/icons-material/CloudSharp';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp';
import DeviceThermostatSharpIcon from '@mui/icons-material/DeviceThermostatSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

export const WeatherForecast = () => {

  const { forecast, isLoading, error: forecastError } = useWeatherForecast();

  if (isLoading) return <div>Loading forecast...</div>; 

  if (forecastError) return <p>Error: {forecastError}</p>;

  if (!forecast) return <div>Forecast data is unavailable.</div>;

  const dailyForecasts = forecast.list.filter(f => f.dt_txt.includes("12:00:00"));

  return (
    <>
      <H1Holder>5 Day Weather Forecast in {forecast.city.name} <CloudSharpIcon fontSize="large" /></H1Holder>
      <ItemsContainer>
        {dailyForecasts.map((day, index) => (
          <ItemHolder role="provider" key={index}>
            <Content>
              <StyledLink to={`/details/${encodeURIComponent(day.dt_txt)}`} key={index}>
                <NameHolder>Date: {day.dt_txt} <CalendarMonthSharpIcon /></NameHolder>
                <TemperatureHolder>Temperature: {day.main.temp}°C <DeviceThermostatSharpIcon /></TemperatureHolder>
                <ConditionHolder>
                  Condition: 
                  {day.weather[0].main === 'Clouds' && (<>{day.weather[0].main} <CloudSharpIcon /></>)}
                  {day.weather[0].main === 'Rain' && (<>{day.weather[0].main} <ThunderstormSharpIcon /></>)}
                  {day.weather[0].main === 'Clear' && (<>{day.weather[0].main} <WbSunnyIcon /></>)}
                </ConditionHolder>
              </StyledLink>
            </Content>
          </ItemHolder>
        ))}
      </ItemsContainer>
    </>
  );
};

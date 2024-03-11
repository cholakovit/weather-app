// Hooks
import { usePrefetchWeatherData, useWeatherForecast } from "@/helper/hooks";
import { displayTemperature, fetchWeatherForecast } from "@/helper/fn";

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
  GEOLOCATION,
  NETWORK_RESPONS_NOT_OK,
  RAIN,
  TEMPERATURE,
  WEATHER_FORCAST,
} from "@/constants/common";
import { ForecastData, LocationState } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const WeatherForecast = () => {
  const queryClient = useQueryClient();
  const [cachedLocation, setCachedLocation] = useState<any>()

  // // Access the geolocation data from React Query's cache
  // const cachedLocation = queryClient.getQueryData<LocationState>([GEOLOCATION]);

  useEffect(() => {
    setCachedLocation(queryClient.getQueryData<any>([GEOLOCATION]))
  }, [cachedLocation, queryClient]);



  console.log('cachedLocation: ', cachedLocation)




  const { data: forecast, isLoading, error, refetch } = useQuery<ForecastData, Error>({
    queryKey: [WEATHER_FORCAST, cachedLocation?.lat, cachedLocation?.lon],
    queryFn: () => fetchWeatherForecast(cachedLocation?.lat, cachedLocation?.lon),
    enabled: !!cachedLocation?.lat && !!cachedLocation?.lon, // Only run if lat and lon are available
    staleTime: Infinity,
  });

  //console.log('WeatherForecast cachedLocation: ', cachedLocation)
  
  // Provides a function that prefetches detailed weather data for a specific date, using a cached location, to improve data loading efficiency and user experience.
  const prefetchWeatherData = usePrefetchWeatherData();

  const dailyForecasts = forecast?.list.filter((f) =>
    f.dt_txt.includes("12:00:00")
  );

  return (
    <>
      <H1Holder>
        {" "}
        {DAYS_WEATHER_FORCAST + " " + forecast?.city?.name}{" "}
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


// // Hooks
// import { usePrefetchWeatherData, useWeatherForecast } from "@/helper/hooks";
// import { displayTemperature } from "@/helper/fn";

// // MUI Elements
// import {
//   ConditionHolder,
//   Content,
//   H1Holder,
//   ItemHolder,
//   ItemsContainer,
//   NameHolder,
//   StyledLink,
//   TemperatureHolder,
// } from "./index.style";
// import CloudSharpIcon from "@mui/icons-material/CloudSharp";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
// import ThunderstormSharpIcon from "@mui/icons-material/ThunderstormSharp";
// import DeviceThermostatSharpIcon from "@mui/icons-material/DeviceThermostatSharp";
// import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

// // Components
// import AlertMessage from "@/components/Alert";
// import Skeletons from "@/components/Skeletons";

// // Constants
// import {
//   CLEAR,
//   CLOUDS,
//   CONDITION,
//   DATE,
//   DAYS_WEATHER_FORCAST,
//   GEOLOCATION,
//   NETWORK_RESPONS_NOT_OK,
//   RAIN,
//   TEMPERATURE,
// } from "@/constants/common";
// import { LocationState } from "@/types";
// import { useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// export const WeatherForecast = () => {
//   const queryClient = useQueryClient();
//   const [cityCoordinates, setCityCoordinates] = useState()

//   useEffect(() => {
//     setCityCoordinates(queryClient.getQueryData([GEOLOCATION]))
//   }, [cityCoordinates, queryClient])

//   console.log('cityCoordinates: ', cityCoordinates)

//   // Fetches weather forecast data based on the user's geolocation and metric system preference, managing loading states, errors, and caching with React Query.
//   const { forecast, isLoading, error, metricSystem } = useWeatherForecast(cityCoordinates);
  
//   // Provides a function that prefetches detailed weather data for a specific date, using a cached location, to improve data loading efficiency and user experience.
//   const prefetchWeatherData = usePrefetchWeatherData();

//   const dailyForecasts = forecast?.list.filter((f) =>
//     f.dt_txt.includes("12:00:00")
//   );

//   return (
//     <>
//       <H1Holder>
//         {" "}
//         {DAYS_WEATHER_FORCAST + " " + forecast?.city?.name}{" "}
//         <CloudSharpIcon fontSize="large" />
//       </H1Holder>
//       <ItemsContainer>
//         {error ? (
//           <AlertMessage alert={NETWORK_RESPONS_NOT_OK} type="error" />
//         ) : isLoading ? (
//           <>
//             <Skeletons flag={1} width={250} height={120} number={5} />
//           </>
//         ) : (
//           <>
//             {dailyForecasts?.map((day, index) => (
//               <ItemHolder role="provider" key={index}>
//                 <Content>
//                   <StyledLink
//                     to={`/details/${encodeURIComponent(day.dt_txt)}`}
//                     key={index}
//                     onMouseEnter={() => prefetchWeatherData(day.dt_txt)}
//                   >
//                     <NameHolder>
//                       {DATE + day.dt_txt} <CalendarMonthSharpIcon />
//                     </NameHolder>
//                     <TemperatureHolder>
//                       {TEMPERATURE +
//                         ": " +
//                         displayTemperature(day.main.temp, metricSystem)}{" "}
//                       <DeviceThermostatSharpIcon />
//                     </TemperatureHolder>
//                     <ConditionHolder>
//                       {CONDITION + ": "}
//                       {day.weather[0].main === CLOUDS && (
//                         <>
//                           {day.weather[0].main} <CloudSharpIcon />
//                         </>
//                       )}
//                       {day.weather[0].main === RAIN && (
//                         <>
//                           {day.weather[0].main} <ThunderstormSharpIcon />
//                         </>
//                       )}
//                       {day.weather[0].main === CLEAR && (
//                         <>
//                           {day.weather[0].main} <WbSunnyIcon />
//                         </>
//                       )}
//                     </ConditionHolder>
//                   </StyledLink>
//                 </Content>
//               </ItemHolder>
//             ))}
//           </>
//         )}
//       </ItemsContainer>
//     </>
//   );
// };

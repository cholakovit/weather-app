import { useParams } from 'react-router-dom';
import { useDetailedWeather } from '../../helper/hooks';
import { H1Holder, StyledLink } from '../WeatherForecast/index.style';

import CloudSharpIcon from '@mui/icons-material/CloudSharp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CenteredContainer, StyledTableCell, StyledTableRow, TableContainerHolder } from './index.style';

import ReplyAllIcon from '@mui/icons-material/ReplyAll';

export const DetailedWeather = () => {

  const { weather, isLoading, error, displayDayTemp, displayNightTemp, temperatureDay, temperatureNight, metricSystem, windSpeedDisplay } = useDetailedWeather();
  const { date } = useParams<{ date: string }>();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;
  
  if (!weather) return <div>No weather data available</div>;

  return (
    <>
      <H1Holder>Detailed Weather for {date} <CloudSharpIcon fontSize="large" /></H1Holder>
      <CenteredContainer>
        <TableContainerHolder>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Parameter</StyledTableCell>
                <StyledTableCell align="right">Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Temperature:</StyledTableCell>
                <StyledTableCell align="right">Day: {displayDayTemp}°{metricSystem}, Night: {displayNightTemp}°{metricSystem}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Feels Like:</StyledTableCell>
                <StyledTableCell align="right">Day: {temperatureDay}, Night: {temperatureNight}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Humidity:</StyledTableCell>
                <StyledTableCell align="right">{weather.humidity}%</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Wind Speed:</StyledTableCell>
                <StyledTableCell align="right">{windSpeedDisplay}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Weather Conditions:</StyledTableCell>
                <StyledTableCell align="right">{weather.weather[0].main} - {weather.weather[0].description}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Cloudiness:</StyledTableCell>
                <StyledTableCell align="right">{weather.clouds}%</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Pressure:</StyledTableCell>
                <StyledTableCell align="right">{weather.pressure} hPa</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">UV Index:</StyledTableCell>
                <StyledTableCell align="right">{weather.uvi}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Sunrise:</StyledTableCell>
                <StyledTableCell align="right">{new Date(weather.sunrise * 1000).toLocaleTimeString('en-US')}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">Sunset:</StyledTableCell>
                <StyledTableCell align="right">{new Date(weather.sunset * 1000).toLocaleTimeString('en-US')}</StyledTableCell>
              </StyledTableRow>
              {weather.rain && 
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Rain Volume:</StyledTableCell> 
                  <StyledTableCell align="right">{weather.rain} mm</StyledTableCell>
                </StyledTableRow>
              }
              {weather.snow && 
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Snow Volume:</StyledTableCell> 
                  <StyledTableCell align="right">{weather.snow} mm</StyledTableCell>
                </StyledTableRow>
              }
              <StyledTableRow>
                <StyledTableCell component="th" scope="row"><StyledLink to="/"><ReplyAllIcon /> Back to Forecast</StyledLink></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainerHolder>
      </CenteredContainer>
    </>
  );
};














// import { useParams } from 'react-router-dom';
// import { useDetailedWeather } from '../../helper/hooks';
// import { H1Holder, ItemsContainer, StyledLink } from '../WeatherForecast/index.style';

// import CloudSharpIcon from '@mui/icons-material/CloudSharp';
// import { BoxHolder, DetailedItemHolder } from './index.style';
// export const DetailedWeather = () => {

//   const { weather, isLoading, error } = useDetailedWeather();
//   const { date } = useParams<{ date: string }>();

//   if (isLoading) return <div>Loading...</div>;

//   if (error) return <div>Error: {error}</div>;
  
//   if (!weather) return <div>No weather data available</div>;

//   return (
//     <>
//       <H1Holder>Detailed Weather for {date} <CloudSharpIcon fontSize="large" /></H1Holder>
//       <ItemsContainer>
//         <DetailedItemHolder role="provider">
//           <BoxHolder><strong>Temperature:</strong> Day: {weather.temp.day}°C, Night: {weather.temp.night}°C</BoxHolder>
//           <BoxHolder><strong>Feels Like:</strong> Day: {weather.feels_like.day}°C, Night: {weather.feels_like.night}°C</BoxHolder>
//           <BoxHolder><strong>Humidity:</strong> {weather.humidity}%</BoxHolder>
//           <BoxHolder><strong>Wind Speed:</strong> {weather.wind_speed} m/s</BoxHolder>
//           <BoxHolder><strong>Weather Conditions:</strong> {weather.weather[0].main} - {weather.weather[0].description}</BoxHolder>
//           <BoxHolder><strong>Cloudiness:</strong> {weather.clouds}%</BoxHolder>
//           <BoxHolder><strong>Pressure:</strong> {weather.pressure} hPa</BoxHolder>
//           <BoxHolder><strong>UV Index:</strong> {weather.uvi}</BoxHolder>
//           <BoxHolder><strong>Sunrise:</strong> {new Date(weather.sunrise * 1000).toLocaleTimeString('en-US')}</BoxHolder>
//           <BoxHolder><strong>Sunset:</strong> {new Date(weather.sunset * 1000).toLocaleTimeString('en-US')}</BoxHolder>
//           {weather.rain && <BoxHolder><strong>Rain Volume:</strong> {weather.rain} mm</BoxHolder>}
//           {weather.snow && <BoxHolder><strong>Snow Volume:</strong> {weather.snow} mm</BoxHolder>}

//           <StyledLink to="/">Back to Forecast</StyledLink>
//         </DetailedItemHolder>
//       </ItemsContainer>
//     </>
//   );
// };
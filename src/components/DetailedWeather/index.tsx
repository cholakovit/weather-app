// React Elements
import { useParams } from "react-router-dom";

// Hooks
import { useDetailedWeather } from "../../helper/hooks";
import { displayTemperature } from "../../helper/fn";

// MUI Elements
import CloudSharpIcon from "@mui/icons-material/CloudSharp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StyledTableCell from "@mui/material/TableCell";
import StyledTableRow from "@mui/material/TableRow";
import { H1Holder, StyledLink } from "../WeatherForecast/index.style";
import { CenteredContainer, TableContainerHolder } from "./index.style";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

// Components
import AlertMessage from "../Alert";
import Skeletons from "../Skeletons";

// Constants
import {
  BACK_FORCAST,
  CONDITION,
  DETAILED_WEATHER_FOR,
  FEELS_LIKE,
  NETWORK_RESPONS_NOT_OK,
  TEMPERATURE,
  TIME,
} from "../../constants/common";

export const DetailedWeather = () => {
  const { hourlyData, isLoading, error, metricSystem } = useDetailedWeather();
  const { date } = useParams<{ date: string }>();

  console.log('hourlyData: ', hourlyData)

  return (
    <>
      <H1Holder>
        {DETAILED_WEATHER_FOR + date} <CloudSharpIcon fontSize="large" />
      </H1Holder>
      <CenteredContainer>
        {error ? (
          <AlertMessage alert={NETWORK_RESPONS_NOT_OK} type="error" />
        ) : isLoading ? (
          <Skeletons flag={1} width={500} height={650} number={1} />
        ) : (
          <TableContainerHolder>
            <Table aria-label="detailed weather">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{TIME}</StyledTableCell>
                  <StyledTableCell align="right">{TEMPERATURE}</StyledTableCell>
                  <StyledTableCell align="right">{FEELS_LIKE}</StyledTableCell>
                  <StyledTableCell align="right">{CONDITION}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hourlyData?.map((hour) => (
                  <StyledTableRow key={hour.dt}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(hour.dt * 1000).toLocaleTimeString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {displayTemperature(hour.temp, metricSystem)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {hour.feels_like}°{metricSystem}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {hour.weather[0]?.main} - {hour.weather[0]?.description}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell align="right" colSpan={3}>
                    <StyledLink to="/">
                      <ReplyAllIcon />
                      {BACK_FORCAST}
                    </StyledLink>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainerHolder>
        )}
      </CenteredContainer>
    </>
  );
};

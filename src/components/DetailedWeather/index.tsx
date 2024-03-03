import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailedWeather } from '../../helper/hooks';
import CloudSharpIcon from '@mui/icons-material/CloudSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StyledTableCell from '@mui/material/TableCell';
import StyledTableRow from '@mui/material/TableRow';
import AlertMessage from '../Alert/Alert';
import Skeletons from '../Skeletons/Skeletons';
import { H1Holder, StyledLink } from '../WeatherForecast/index.style';
import { CenteredContainer, TableContainerHolder } from './index.style';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { NETWORK_RESPONS_NOT_OK } from '../../constants/common';
import { displayTemperature } from '../../helper/fn';

export const DetailedWeather = () => {
    const { hourlyData, isLoading, error, metricSystem } = useDetailedWeather();
    const { date } = useParams<{ date: string }>();

    return (
        <>
            <H1Holder>Detailed Weather for {date} <CloudSharpIcon fontSize="large" /></H1Holder>
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
                                    <StyledTableCell>Time</StyledTableCell>
                                    <StyledTableCell align="right">Temperature</StyledTableCell>
                                    <StyledTableCell align="right">Feels Like</StyledTableCell>
                                    <StyledTableCell align="right">Condition</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {hourlyData?.map((hour) => (
                                <StyledTableRow key={hour.dt}>
                                  <StyledTableCell component="th" scope="row">
                                    {new Date(hour.dt * 1000).toLocaleTimeString()}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {/* {hour.temp}°{metricSystem} */}
                                    {displayTemperature(hour.temp, metricSystem)}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {hour.feels_like}°{metricSystem}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {/* Since `weather` is an array, ensure to access its elements correctly */}
                                    {hour.weather[0]?.main} - {hour.weather[0]?.description}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                        </Table>
                        <StyledLink to="/"><ReplyAllIcon /> Back to Forecast</StyledLink>
                    </TableContainerHolder>
                )}
            </CenteredContainer>
        </>
    );
};
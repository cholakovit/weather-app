// Styled Elements
import { styled } from '@mui/material/styles';

export const WeatherApp = styled('h1')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  fontSize: '14px',
  backgroundColor: theme.palette.primary.fourth
}));


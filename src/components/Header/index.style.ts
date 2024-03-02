// Styled Elements
import { styled } from '@mui/material/styles';

// MUI Elements
import { AppBar, FormControlLabel, Switch, Box, Button, Container } from '@mui/material';

export const HeaderContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px'
});

export const ModalButton = styled(Button)({
  display: 'flex',
  flexWrap: 'wrap'
});

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '650px',
  backgroundColor: theme.palette.primary.black,
  border: '2px solid ' + theme.palette.primary.black,
  boxShadow: '24',
  padding: '40px'
}));

export const WeatherAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.black
}));

export const WeatherFormControlLabel = styled(FormControlLabel)({
  margin: '10px',
  display: 'flex',
  flexWrap: 'wrap'
});

//Switcher
export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: theme.palette.primary.white,
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.fourth
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20 / 2
  }
}));


//Switcher
export const MetricUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: theme.palette.primary.white,
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 384.53"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M0 74c0-13.59 3.33-25.87 10.08-37 6.66-11.14 15.52-20.08 26.56-26.74C47.69 3.6 59.88.26 73.21.26c13.24 0 25.16 3.34 35.94 10 10.87 6.66 19.46 15.6 25.95 26.74 6.58 11.13 9.82 23.32 9.82 36.73 0 13.5-3.24 25.78-9.82 36.82-6.49 11.05-15.08 19.82-25.95 26.31-10.78 6.57-22.7 9.81-35.94 9.81-13.33 0-25.52-3.24-36.57-9.81-11.04-6.49-19.9-15.26-26.56-26.31C3.33 99.51 0 87.32 0 74zm41.91 0c0 8.85 3.15 16.21 9.38 22.09 6.22 5.78 13.59 8.68 21.92 8.68 8.41 0 15.52-2.9 21.21-8.68 5.7-5.88 8.6-13.24 8.6-22.09 0-9.12-2.9-16.66-8.6-22.8-5.69-6.05-12.8-9.12-21.21-9.12-8.33 0-15.7 3.07-21.92 9.12-6.23 6.14-9.38 13.68-9.38 22.8zm469.56 176.65c-1.05 26.39-8.06 49.63-21.04 69.79-13.06 20.08-31.04 35.77-54.09 47.08-23.06 11.31-50.15 17.01-81.27 17.01-33.76 0-62.6-7.46-86.62-22.27-23.94-14.82-42.26-35.95-54.79-63.56-12.63-27.53-18.86-60.41-18.86-98.63V184.9c0-38.31 6.58-71.28 19.73-98.89 13.24-27.53 31.65-48.75 55.32-63.66C293.61 7.45 321.49 0 353.49 0c33.23 0 61.2 5.96 83.9 17.97 22.62 12.01 40.24 28.32 52.6 49.01 12.45 20.78 19.73 44.1 22.01 70.14h-96.09c-.35-19.47-5.08-34.02-14.12-43.67-9.11-9.55-25.16-14.37-48.3-14.37-13.85 0-25.34 3.33-34.28 9.91-9.03 6.57-15.69 17.53-20.08 32.88-4.29 15.34-6.48 36.2-6.48 62.5v15.7c0 26.56 1.92 47.51 5.78 62.77 3.86 15.34 10.35 26.3 19.47 32.79 9.2 6.48 21.56 9.73 37.17 9.73 12.8 0 23.67-1.84 32.61-5.61 8.86-3.77 15.69-9.73 20.43-17.71 4.64-8.07 7.1-18.5 7.28-31.39h96.08z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.fourth
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '70%',
      height: '70%',
      left: '5px',
      top: '5px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 486.87 404.07"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M0 78.59c0-14.48 3.55-27.57 10.75-39.43 7.1-11.87 16.53-21.41 28.31-28.5C50.83 3.56 63.82 0 78.03 0c14.11 0 26.82 3.56 38.31 10.66 11.59 7.09 20.75 16.63 27.66 28.5 7.02 11.86 10.47 24.85 10.47 39.15 0 14.39-3.45 27.47-10.47 39.25-6.91 11.77-16.07 21.12-27.66 28.04-11.49 7-24.2 10.46-38.31 10.46-14.21 0-27.2-3.46-38.97-10.46-11.78-6.92-21.21-16.27-28.31-28.04C3.55 105.78 0 92.8 0 78.59zm44.67 0c0 9.44 3.36 17.29 10 23.55 6.63 6.17 14.48 9.25 23.36 9.25 8.97 0 16.54-3.08 22.62-9.25 6.07-6.26 9.15-14.11 9.15-23.55 0-9.72-3.08-17.75-9.15-24.29-6.08-6.45-13.65-9.73-22.62-9.73-8.88 0-16.73 3.28-23.36 9.73-6.64 6.54-10 14.57-10 24.29zm276.51 325.48H218.3V5.42h102.88v398.65zM472.1 250.44H292.49v-82.61H472.1v82.61zM486.87 88.4H292.49V5.42h194.38V88.4z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20 / 2
  }
}));
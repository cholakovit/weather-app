// MUI Elements
import Box from '@mui/material/Box';

// Styled Elements
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const H1Holder = styled('h1')(({ theme }) => ({
  margin: '100px 0 0 0',
  fontWeight: '100'
}));

export const ItemsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  justifyContent: 'center', 
  alignItems: 'center', 
  gap: theme.spacing(2), 
}));

export const ItemHolder = styled(Box)(({ theme }) => ({
  padding: '10px',
  marginBottom: '20px',
  marginTop: '20px',
  display: 'flex',
  backgroundColor: theme.palette.primary.black,
  width: '14%',
  border: '1px solid ' + theme.palette.primary.white,
  marginRight: '20px',
  overflow: 'hidden',
  maxHeight: '150px',
  [theme.breakpoints.down('sm')]: {
    width: '28%' // Set the width to 30% for smaller screens (down to sm breakpoint)
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '28%' // Around 30% width for tablets
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '21%' // Set the width to 25% for tablets (between md and lg breakpoints)
  }
}));

export const Content = styled(Box)({
  width: '100%',
  overflow: 'hidden'
});

export const NameHolder = styled(Box)({
  height: '30px',
  overflow: 'hdden',
  color: '#fff',
  textDecoration: 'none'
});

export const TemperatureHolder = styled(Box)({
  height: '30px',
  overflow: 'hdden',
  color: '#fff',
  textDecoration: 'none'
});

export const ConditionHolder = styled(Box)({
  height: '30px',
  overflow: 'hdden',
  color: '#fff',
  textDecoration: 'none'
});

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.white
  //color: '#fff'
}));
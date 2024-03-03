// MUI Elements
import Box from '@mui/material/Box';

// Styled Elements
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const H1Holder = styled('div')(({ theme }) => ({
  margin: '100px 0 0 0',
  fontWeight: '100',
  fontSize: '2em',
  lineHeight: '1.2',
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
    width: '90%' 
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '40%' 
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '35%' 
  },
  [theme.breakpoints.up('lg')]: {
    width: '23%', 
  },
  [theme.breakpoints.up('xl')]: {
    width: '18%', 
  },
}));

export const Content = styled(Box)({
  width: '100%',
  overflow: 'hidden'
});

export const NameHolder = styled(Box)({
  height: '30px',
  overflow: 'hidden',
  textDecoration: 'none'
});

export const TemperatureHolder = styled(Box)({
  height: '30px',
  overflow: 'hdden',
  textDecoration: 'none'
});

export const ConditionHolder = styled(Box)({
  height: '30px',
  overflow: 'hdden',
  textDecoration: 'none'
});

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.lighter
}));
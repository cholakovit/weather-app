// MUI Elements
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paper, TableRow } from '@mui/material';
import Box from '@mui/material/Box';

// Styled Elements
import { styled } from '@mui/material/styles';


export const DetailedItemHolder = styled(Box)(({ theme }) => ({
  padding: '10px',
  marginBottom: '20px',
  marginTop: '20px',

  backgroundColor: theme.palette.primary.black,
  width: '24%',
  border: '1px solid ' + theme.palette.primary.white,
  marginRight: '20px',
  overflow: 'hidden',
  maxHeight: '650px',
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

export const BoxHolder = styled('div')(({ theme }) => ({
  display: 'block',
  padding: '15px',
  '& strong': {
    marginRight: '8px', // Adjust the value as needed to get the desired spacing
  },
}));

export const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', 
  marginTop: '50px'
});

export const TableContainerHolder = styled(Paper)(({ theme }) => ({
  width: '500px',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// MUI Elements
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paper, TableRow } from '@mui/material';

// Styled Elements
import { styled } from '@mui/material/styles';

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
  margin: '50px 0px'
});

export const TableContainerHolder = styled(Paper)(({ theme }) => ({
  width: '550px',
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
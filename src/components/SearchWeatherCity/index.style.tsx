// MUI Elements
import { Button, TextField } from '@mui/material';

// Styled Elements
import { styled } from '@mui/material/styles';

export const FormHolder = styled('form')(({ theme }) => ({
  margin: '100px 0 0 0',
  fontWeight: '100',
  fontSize: '2em',
  lineHeight: '1.2',
}));

export const ButtonHolder = styled(Button)(({ theme }) => ({
  margin: '2px 20px',
  fontWeight: '100',
  height: '50px',
  lineHeight: '1.2',
  backgroundColor: theme.palette.primary.black
}));

export const TextFieldHolder = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': { 
    color: theme.palette.primary.black, 
  },
  '&:hover .MuiInputLabel-root': { 
    color: theme.palette.primary.white,
  },
  '& .MuiFilledInput-root': {
    '&:after': { 
      borderBottomColor: theme.palette.primary.white,
    },
    '&:hover:before': { 
      borderBottomColor: theme.palette.primary.white, 
    },
  },
}));
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

export const TextFieldHolder = styled(TextField)({
  '& .MuiInputLabel-root': { // Target the label
    color: 'black', // Default label color
  },
  '&:hover .MuiInputLabel-root': { // Change label color on hover
    color: 'white',
  },
  '& .MuiFilledInput-root': {
    '&:after': { // Underline color when textfield is focused
      borderBottomColor: 'orange',
    },
    '&:hover:before': { // Underline color on hover (before focus)
      borderBottomColor: 'white', // Try to match the label color or use any color
    },
  },
});
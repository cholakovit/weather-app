// React hooks
import React from 'react';

// MUI Elements
import { Alert, AlertColor } from '@mui/material';

// Custom Hooks
import { useAlertWithTimeout } from './Alert.hooks';

// Interfaces
import { AlertMessageProps } from './Alert.types';

const AlertMessage: React.FC<AlertMessageProps> = ({ alert, type }) => {
  
  // Use the custom hook to handle the timeout logic
  const displayAlert: string | null = useAlertWithTimeout({
    initialAlert: alert,
    timeout: 30000
  });

  return (
    // Conditionally render the Alert component if 'alert' has a value
    displayAlert ? (
      <Alert severity={type as AlertColor} data-testid="alert">
        {displayAlert}
      </Alert>
    ) : null
  );
};

export default AlertMessage;

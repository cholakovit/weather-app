import { AlertColor } from "@mui/material";

export interface AlertWithTimeoutHookProps {
  initialAlert: string | null
  timeout: number
}

export interface AlertMessageProps {
  alert: string | null;
  type: AlertColor;
}
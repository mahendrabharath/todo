import { AlertColor } from "@mui/material";
import { useState, createContext } from "react";

type TToastContext = {
  toast: boolean;
  message: string;
  severity: AlertColor;
  setMessage: Function;
  setSeverity: Function;
  setToast: Function;
};

export const ToastContext = createContext<TToastContext>({
  toast: false,
  message: "",
  severity: "success",
  setMessage: new Function(),
  setSeverity: new Function(),
  setToast: new Function(),
});
ToastContext.displayName = "Toast Context";

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  return (
    <ToastContext.Provider
      value={{ toast, setToast, message, setMessage, severity, setSeverity }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};


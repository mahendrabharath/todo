import { ToastContext, ToastProvider } from "@/hooks/useToast";
import { Alert, Snackbar } from "@mui/material";
import { useContext, useState } from "react";

const ToastWrapper = () => {
  return (
    <ToastProvider>
      <Toast />
    </ToastProvider>
  );
};

const Toast = () => {
  const { severity, toast, setToast, message } = useContext(ToastContext);

  return (
    <Snackbar
      style={{ maxWidth: "400px" }}
      open={toast}
      autoHideDuration={6000}
      onClose={() => setToast(!toast)}
    >
      <Alert
        onClose={() => setToast(!toast)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

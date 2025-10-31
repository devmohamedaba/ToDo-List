import { createContext, useContext, useState } from "react";
import TodoSnackbar from "../Components/Snackbar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <TodoSnackbar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

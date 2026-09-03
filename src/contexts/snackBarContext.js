import * as React from "react";
import { createContext } from "react";
import Snackbars from "../components/snackBarAlert";

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
  const showHideSnackbar = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  return (
    <SnackBarContext.Provider value={{ showHideSnackbar }}>
      <Snackbars open={open} message={message} />
      {children}
    </SnackBarContext.Provider>
  );
};

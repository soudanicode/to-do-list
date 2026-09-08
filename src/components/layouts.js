import "../App.css";
import React, { useEffect, useReducer } from "react";

import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// FILES IMPORTED
import DataContext from "../contexts/dataContext";
import mainReducer from "../redusers/mainReducer";
// Motion Fremwork
// componenets
import { SnackBarProvider } from "../contexts/snackBarContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
// CREATE TEAM
const theme = createTheme({
  palette: {
    primary: {
      light: "#5172e6",
      main: "#2952e0",
      dark: "#122a7d",
      contrastText: "#fff",
    },
    secondary: {
      light: "#51bce6",
      main: "#29ade0",
      dark: "#125f7d",
      contrastText: "#f8efce",
    },
  },

  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#2952e0",
          "&.Mui-selected": {
            backgroundColor: "#122a7d",
            color: "#fff",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#122a7d",
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#122a7d",
            color: "#fff",
          },
        },
      },
    },
  },
});

export default function Layout() {
  /// ٭٭٭ REDUSER CODE٭٭٭
  const initialize = (defaultState) => {
    const savedState = localStorage.getItem("todo_states");
    return savedState ? JSON.parse(savedState) : defaultState;
  };
  const initialState = {
    globalList: [],
    formOutputs: {
      name: "",
      date: new Date().toISOString().split("T")[0],
      priority: "m",
    },
    checkedList: [],
  };
  const [state, dispatch] = useReducer(mainReducer, initialize(initialState));

  // === GET states IN  LOCALE STORAGE
  useEffect(() => {
    localStorage.setItem("todo_states", JSON.stringify(state));
  }, [state.globalList, state.checkedList]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <DataContext.Provider value={[state, dispatch]}>
            <Container
              id="container"
              maxWidth=""
              sx={{ padding: { xs: "3px" } }}
            >
              <Box
                className="contentBox glass-card"
                sx={{
                  height: { xs: "90vh" },
                  padding: { xs: "8px 8px", sm: "10px", md: "20px" },
                }}
              >
                <Stack spacing={5}>
                  <Stack
                    spacing={3}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <img src="/favicon.ico" alt="Check" width="60" />
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{
                        fontSize: "",
                        textAlign: "center",
                        color: "#dcdbdd",
                      }}
                    >
                      DO<span className="symbol">✔</span>T
                    </Typography>
                  </Stack>
                  <Outlet />
                </Stack>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 1,
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.8rem",
                }}
              >
                Designed & Developed with ❤️ by «sdnMostafa»
              </Typography>
            </Container>
          </DataContext.Provider>
        </SnackBarProvider>
      </ThemeProvider>
    </>
  );
}

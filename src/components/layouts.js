import "../App.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataContext from "../contexts/dataContext";
import { SnackBarProvider } from "../contexts/snackBarContext";
// Motion Fremwork
// componenets
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
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
  // use states data
  const [globalList, setGlobalList] = React.useState(() => {
    const savedTask = localStorage.getItem("my_tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [checked, setChecked] = React.useState(() => {
    const savedChecked = localStorage.getItem("checked_list");
    return savedChecked ? JSON.parse(savedChecked) : [];
  });
  const [status, setStatus] = React.useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    priority: "m",
  });

  // === GET DATA IN  LOCALE STORAGE
  // for globale list
  useEffect(() => {
    localStorage.setItem("my_tasks", JSON.stringify(globalList));
  }, [globalList]);
  // for Cheked
  useEffect(() => {
    localStorage.setItem("checked_list", JSON.stringify(checked));
  }, [checked]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <DataContext.Provider
            value={[
              status,
              setStatus,
              globalList,
              setGlobalList,
              checked,
              setChecked,
            ]}
          >
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
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width="60"
                    />
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
                Designed & Developed with ❤️ by «sdnMostaf»
              </Typography>
            </Container>
          </DataContext.Provider>
        </SnackBarProvider>
      </ThemeProvider>
    </>
  );
}

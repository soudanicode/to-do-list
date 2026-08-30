import "../App.css";
import React, { useState, useEffect } from "react";
import { HomeInterface } from "./homeComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataContext from "../dataContext";
// Motion Fremwork
import { motion } from "motion/react";
// componenets
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ButtonGroup, Button } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Route, Routes, BrowserRouter, Link, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { red } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
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
  const [open, setOpen] = React.useState(false);
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

  // HANDLER EVENTS
  // create HANDLE DELETE FUNCTION
  const handleDelete = (id) => {
    const newList = [...globalList];
    let counter = 0;
    let currentIndex = 0;
    for (let task of newList) {
      if (task.id === id) {
        currentIndex = counter;
      }
      counter++;
    }
    newList.splice(currentIndex, 1);
    setGlobalList(newList);
  };
  // create HANDLE EDIT FUNCTION
  const handleEdit = (task) => {
    setStatus((preventStatus) => ({
      ...preventStatus,
      name: task.name,
      date: task.date,
      id: task.id,
      priority: task.priority,
    }));
  };
  // for Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataContext.Provider
          value={[
            status,
            setStatus,
            globalList,
            setGlobalList,
            checked,
            setChecked,
            handleDelete,
            handleEdit,
            open,
            setOpen,
            handleClose,
          ]}
        >
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message="A new task has been added"
          />
          <Container id="container" maxWidth="sm">
            <Box className="contentBox glass-card">
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
                    sx={{ fontSize: "", textAlign: "center", color: "#dcdbdd" }}
                  >
                    DO<span className="symbol">✔</span>T
                  </Typography>
                </Stack>
                <Outlet />
              </Stack>
            </Box>
          </Container>
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
            Designed & Developed with ❤️ by   «sdnMostaf»
          </Typography>
        </DataContext.Provider>
      </ThemeProvider>
    </>
  );
}

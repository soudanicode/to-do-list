import "../App.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DataContext from "../contexts/dataContext";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useContext, useEffect } from "react";
export default function HomeInterface() {
  const [, setStatus, , , , , , , , , , ,] = useContext(DataContext);
  const [alignment, setAlignment] = useState(() => {
    const savedAlignment = localStorage.getItem("aligment-butt");
    return savedAlignment ? JSON.parse(savedAlignment) : "all";
  });
  // save in locale storage
  useEffect(() => {
    localStorage.setItem("aligment-butt", JSON.stringify(alignment));
  });

  const hadleAlignment = (ev, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const handleCancel = useEffect(() => {
    // clean input form
    setStatus((prevStatus) => ({
      ...prevStatus,
      name: "",
      date: new Date().toISOString().split("T")[0],
      priority: "m",
    }));
  }, [setStatus]);

  return (
    <>
      <Box>
        <Stack>
          <Stack
            id="nav-button"
            direction="row"
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div onClick={handleCancel}>
              <Link to="/addtask">
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  sx={{
                    fontSize: "17px",
                    fontWeight: "700",
                    height: "35px",
                    color: "#ffff ",
                  }}
                >
                  <AddTaskIcon sx={{ mr: 1, fontSize: "1.6rem" }} />
                  Add
                </Fab>
              </Link>
            </div>
            <ToggleButtonGroup
              id="nav-class"
              value={alignment}
              exclusive
              onChange={hadleAlignment}
              aria-label="Basic button group"
              size="small"
              sx={{
                gap: { xs: "10px", sm: "7px" },

                width: "100%",
                justifyContent: "end",
                ".css-1i4vqyu-MuiButtonBase-root-MuiToggleButton-root": {
                  lineHeight: { xs: "1.2", sm: "1.7" },
                  fontWeight: "600",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  height: "35px",
                  borderRadius: "10px",
                  textTransform: "math-auto",
                  padding: "0px 14px",
                  letterSpacing: "0.028em",
                  color: "#f4f4f4",
                },
              }}
            >
              <Link to="/">
                <ToggleButton value="all">All</ToggleButton>
              </Link>
              <Link to="/pending">
                <ToggleButton value="pending">Pending</ToggleButton>
              </Link>
              <Link to="/completed">
                <ToggleButton value="completed">Completed</ToggleButton>
              </Link>
            </ToggleButtonGroup>
          </Stack>
          <Outlet />
        </Stack>
      </Box>
    </>
  );
}

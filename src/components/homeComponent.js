import "../App.css";
import Tasks from "./task";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DataContext from "../dataContext";
import { ButtonGroup, Button } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useContext } from "react";
export default function HomeInterface() {
  const [alignment, setAlignment] = useState("all");
  const hadleAlignment = (ev, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <>
      <Box>
        <Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Link to="/addtask">
              <Fab variant="extended" size="small" color="primary">
                <AddTaskIcon sx={{ mr: 1 }} />
                Add
              </Fab>
            </Link>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={hadleAlignment}
              aria-label="Basic button group"
              size="small"
              style={{ gap: "10px" }}
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

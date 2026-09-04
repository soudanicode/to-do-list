import "../App.css";
import React from "react";
import { useContext } from "react";
import { MotivationText } from "./motivationText";
// ___ MUI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import FlagIcon from "@mui/icons-material/Flag";
import Tooltip from "@mui/material/Tooltip";

// _____ Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DataContext from "../contexts/dataContext";

import { Link } from "react-router-dom";
// ===========

export default function Tasks() {
  return (
    <>
      <Box>
        <CheckboxList />
      </Box>
    </>
  );
}

export function CheckboxList() {
  const [
    ,
    setStatus,
    globalList,
    setGlobalList,
    checked,
    setChecked,
    deleteTask_inStorage,
  ] = useContext(DataContext);

  const handleToggle = (id) => {
    const currentList = Array.isArray(checked) ? checked : [];
    const currentIndex = checked.indexOf(id);
    const updateList = [...currentList];
    if (currentIndex === -1) {
      updateList.unshift(id);
    } else {
      updateList.splice(currentIndex, 1);
    }
    setChecked(updateList);
  };
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
    deleteTask_inStorage(id);
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

  return (
    <List
      className="w-list hide-scrollbar p-8 "
      sx={{
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      {/* === MTV TEXT */}
      {globalList.length === 0 && (
        <MotivationText
          typography={{
            firstText: "No tasks for now",
            secondaryText: "Click the button above to create your first task",
          }}
        />
      )}
      {/* === MTV TEXT */}

      {Array.isArray(globalList) &&
        globalList.map((task) => {
          let key = task.id;
          const isChecked = Array.isArray(checked) && checked.includes(key);
          return (
            <ListItem
              key={task.id}
              secondaryAction={
                <Stack
                  edge="end"
                  aria-label="Icons"
                  direction="row"
                  sx={{ gap: "8px", alignItems: "center" }}
                >
                  {/*==== ADD flag icon */}
                  <Tooltip
                    title={`${task.priority === "m" ? "Midium" : task.priority === "h" ? "High" : "Low"} Priority`}
                  >
                    <FlagIcon
                      sx={{
                        color:
                          task.priority === "m"
                            ? "var(--priority-color-midium)"
                            : task.priority === "h"
                              ? "var(--priority-color-high)"
                              : "var(--priority-color-low)",
                      }}
                    />
                  </Tooltip>
                  {/* ==== ADD flag icon */}
                  {isChecked === false ? (
                    <Tooltip title="Edit">
                      <Link to={`/addtask/${task.id}`}>
                        <IconButton
                          aria-label="deleteForeverIcon"
                          color="primary.dark"
                          onClick={() => handleEdit(task)}
                        >
                          <EditNoteOutlinedIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  ) : null}

                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="deleteForeverIcon"
                      color="primary.dark"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
              disablePadding
            >
              <ListItemButton
                className=""
                role={undefined}
                onClick={() => handleToggle(key)}
                dense
                sx={{
                  mb: "5px",
                  borderRadius: "10px",
                  padding: "0px",
                  paddingLeft: "15px ",
                  bgcolor: isChecked ? "#c5cae9" : "var(--inChecked-color)",
                  opacity: isChecked ? "#edeef1ce" : "non",
                  "&:hover": {
                    backgroundColor: "#f1f1edea  ",
                  },
                }}
              >
                <ListItemIcon>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          checked={isChecked}
                          icon={<CheckCircleOutlinedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                        />
                      }
                      label={
                        <ListItemText
                          dir="auto"
                          primary={
                            <Typography
                              id="title"
                              component="h4"
                              color="textPrimary"
                              sx={{
                                textDecoration: isChecked
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              dir="auto"
                              component="span"
                              color="textSecondary"
                              sx={{ fontSize: "0.8rem  !important" }}
                            >
                              {task.date}
                            </Typography>
                          }
                        />
                      }
                    />
                  </FormGroup>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}

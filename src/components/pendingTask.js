import "../App.css";
import React from "react";
import { useContext } from "react";
import { MotivationText } from "./motivationText";
// ___ MUI Components
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
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import DataContext from "../contexts/dataContext";

export default function PendingTask() {
  const [state, dispatch] = useContext(DataContext);
  const handleToggle = (id) => {
    dispatch({ type: "CHECKING_TASK", payload: { id } });
  };
  // create HANDLE DELETE FUNCTION
  const handleDelete = (id) => {
    dispatch({ type: "DELETED_TASK", payload: { id } });
  };
  // create HANDLE EDIT FUNCTION
  const handleEdit = (task) => {
    dispatch({ type: "EDIT_TASK", payload: { task } });
  };
  return (
    <>
      <List
        className="w-list hide-scrollbar p-8"
        sx={{ borderRadius: "10px", marginTop: "10px" }}
      >
        {/* === MTV TEXT */}
        {state.globalList.length === 0 && (
          <MotivationText
            typography={{
              firstText: "No tasks in progress",
              secondaryText:
                "Do you want to get something done? Click the add button above",
            }}
          />
        )}
        {/* === MTV TEXT */}
        {Array.isArray(state.globalList) &&
          state.globalList
            .filter(
              (task) =>
                Array.isArray(state.checkedList) &&
                !state.checkedList.includes(task.id),
            )
            .map((task) => {
              let key = task.id;
              const isChecked =
                Array.isArray(state.checkedList) &&
                state.checkedList.includes(key);

              return (
                <ListItem
                  key={task.id}
                  disablePadding
                  secondaryAction={
                    <Stack
                      edge="end"
                      aria-label="Icons"
                      direction="row"
                      sx={{ gap: "8px", alignItems: "center" }}
                    >
                      {/* ADD tag icon */}
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
                      {/* ADD tag icon */}
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
                >
                  <ListItemButton
                    className="rd-10 p-10"
                    role={undefined}
                    dense
                    onClick={() => handleToggle(key)}
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
                                    fontSize: "1.1rem",
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
    </>
  );
}

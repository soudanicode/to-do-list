import "../App.css";
import React from "react";
import { useContext } from "react";
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
import { SnackBarContext } from "../contexts/snackBarContext";

// _____ Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DataContext from "../contexts/dataContext";
import Tooltip from "@mui/material/Tooltip";

export default function CompleteTask() {
  const { showHideSnackbar } = useContext(SnackBarContext);

  const [, , globalList, setGlobalList, checked] = useContext(DataContext);
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
    showHideSnackbar("remov");
  };
  return (
    <>
      <List
        className="w-list w-list hide-scrollbar p-8"
        sx={{ borderRadius: "10px", marginTop: "10px" }}
      >
        {Array.isArray(globalList) &&
          globalList
            .filter(
              (task) => Array.isArray(checked) && checked.includes(task.id),
            )
            .map((task) => {
              const isChecked =
                Array.isArray(checked) && checked.includes(task.id);

              return (
                <ListItem
                  key={task.id}
                  disablePadding
                  secondaryAction={
                    <Stack
                      edge="end"
                      aria-label="Icons"
                      direction="row"
                      sx={{ gap: "8px" }}
                    >
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

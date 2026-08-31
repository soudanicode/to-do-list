import "../App.css";
import React from "react";
import { useContext, useMemo } from "react";
// ___ MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
// _____ Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DataContext from "../dataContext";
import Tooltip from "@mui/material/Tooltip";

export default function CompleteTask() {
  const [, , globalList, setGlobalList, checked, setChecked, handleDelete] =
    useContext(DataContext);
  return (
    <>
      <List
        className="w-list w-list hide-scrollbar p-8"
        sx={{ borderRadius: "10px", marginTop: "10px" }}
      >
        {Array.isArray(globalList) &&
          globalList.map((task) => {
            let key = task.id;
            const isChecked = Array.isArray(checked) && checked.includes(key);
            if (isChecked === true) {
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
                      bgcolor: isChecked
                        ? "var(--checked-color)"
                        : "var(--inChecked-color)",
                      opacity: isChecked ? "0.7" : "non",
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
            }
          })}
      </List>
    </>
  );
}

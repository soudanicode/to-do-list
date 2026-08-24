import "../App.css";
import React from "react";
// ___ MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import Stack from "@mui/material/Stack";
// _____ Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Typography } from "@mui/material";
import DataContext from "../dataContext";
import { useContext } from "react";
import { ClassNames } from "@emotion/react";
import Badge from "@mui/material/Badge";
import { warning } from "motion";
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

// -----
const listItems = [
  {
    key: "",
    name: "go to home",
    priority: "m",
    date: "22/4/2000",
  },
  {
    key: "",
    name: "go to school",
    priority: "l",
    date: "22/1/2000",
  },
];

// ----
export function CheckboxList() {
  const [status, setStatus, , , checked, setChecked] = useContext(DataContext);

  const newChecked = [...checked];
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    // List element checked

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className="p-8" sx={{ borderRadius: "10px", marginTop: "10px" }}>
      {[0, 1, 2, 3, 4].map((value) => {
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Stack
                edge="end"
                aria-label="Icons"
                direction="row"
                sx={{ gap: "8px" }}
              >
                <Chip
                  label="Priority"
                  color="primary.dark"
                  size="small"
                  variant="outlined"
                  disabled={newChecked.includes(value) ? true : false}
                  avatar={
                    <Avatar
                      style={{
                        color: "var(--avatar-color)",
                        backgroundColor:
                          status.priority === "m"
                            ? "var(--priority-color-m)"
                            : status.priority === "l"
                              ? "var(--priority-color-l)"
                              : "var(--priority-color-h)",
                      }}
                    >
                      F
                    </Avatar>
                  }
                  sx={{ cursor: "pointer", borderColor: "#a3a3a3" }}
                />

                <IconButton aria-label="deleteForeverIcon" color="primary.dark">
                  <EditNoteOutlinedIcon />
                </IconButton>
                <IconButton aria-label="deleteForeverIcon" color="primary.dark">
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Stack>
            }
            disablePadding
          >
            <ListItemButton
              className="rd-10 p-10"
              role={undefined}
              onClick={handleToggle(value)}
              dense
              sx={{
                mb: "5px",
                bgcolor: newChecked.includes(value)
                  ? "var(--checked-color)"
                  : "var(--inChecked-color)",
                opacity: newChecked.includes(value) ? "0.7" : "non",
              }}
            >
              <ListItemIcon>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        checked={newChecked.includes(value)}
                        icon={<CheckCircleOutlinedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />
                    }
                    label={
                      <ListItemText
                        dir="auto"
                        primary={
                          <Typography
                            component="h4"
                            color="textPrimary"
                            sx={{
                              fontSize: "1.1rem",
                              textDecoration: newChecked.includes(value)
                                ? "line-through"
                                : "none",
                            }}
                          >
                            go to home
                          </Typography>
                        }
                        secondary={
                          <Typography
                            dir="auto"
                            component="span"
                            color="textSecondary"
                            sx={{ fontSize: "0.8rem  !important" }}
                          >
                            {status.date}
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

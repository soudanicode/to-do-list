import "../App.css";
import React from "react";
import { useContext } from "react";
import DataContext from "../dataContext";
import { Link } from "react-router-dom";
// copmonenets
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, ButtonGroup } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

export default function FormInput() {
  const [status, setStatus] = useContext(DataContext);

  // handleFunctions
  function handleChangeDate(ev) {
    setStatus({ ...status, date: ev.target.value });
  }
  function handleChangeName(ev) {
    setStatus({ ...status, name: ev.target.value });
  }

  const handleChangeSelect = (ev) => {
    setStatus({ ...status, priority: ev.target.value });
  };

  // ========
  return (
    <>
      <Box
        className="form rd-10"
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
          padding: "20px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Stack className="w-castum" direction="column" spacing={2}>
          <TextField
            label="Add a Task"
            color="error"
            variant="outlined"
            required
            value={status.name}
            onChange={handleChangeName}
          />
          <TextField
            label="Date"
            color="secondary"
            variant="outlined"
            type="date"
            focused
            value={status.date}
            onChange={handleChangeDate}
          />
          <Stack className="" sx={{}}>
            <FormControl
              sx={{ width: "100%", fontSize: "15px" }}
              variant="outlined"
              color="secondary"
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ paddingBottom: "10px" }}
              >
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status.priority}
                label="priority"
                onChange={handleChangeSelect}
              >
                <MenuItem value="h">
                  <Badge badgeContent={8} color="error" variant="dot">
                    High
                  </Badge>
                </MenuItem>
                <MenuItem value="l">
                  <Badge badgeContent={8} color="success" variant="dot">
                    Low
                  </Badge>
                </MenuItem>
                <MenuItem value="m">
                  <Badge badgeContent={8} color="warning" variant="dot">
                    Middle
                  </Badge>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack direction="row-reverse" spacing={2} sx={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="success"
            size="small"
            disabled={status.name !== "" ? false : true}
          >
            <AddIcon />
            ADD
          </Button>
          <Link to="/">
            <Button variant="outlined" color="warning" size="small">
              <CancelIcon />
              Cancel
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
}

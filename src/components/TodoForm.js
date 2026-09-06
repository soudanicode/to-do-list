import "../App.css";
import React from "react";
import { useContext } from "react";
import DataContext from "../contexts/dataContext";
import { Link } from "react-router-dom";
// copmonenets
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { SnackBarContext } from "../contexts/snackBarContext";

export default function FormInput() {
  const [state, dispatch, , , , , , ,] = useContext(DataContext);
  const { showHideSnackbar } = useContext(SnackBarContext);
  // handleFunctions
  const handleSubmit = () => {
    showHideSnackbar("add task");
    dispatch({
      type: "ADD_TASK",
    });
  };
  const handleChangeDate = (ev) => {
    const value = ev.target.value;
    dispatch({ type: "SET_DATE", payload: value });
  };
  const handleChangeName = (ev) => {
    const value = ev.target.value;
    dispatch({ type: "SET_NAME", payload: value });
  };

  const handleChangeSelect = (ev) => {
    const value = ev.target.value;
    dispatch({ type: "SET_PRIORITY", payload: value });
  };

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
            value={state?.formOutputs?.name ?? "  "}
            onChange={(ev) => {
              handleChangeName(ev);
            }}
          />
          <TextField
            label="Date"
            color="secondary"
            variant="outlined"
            type="date"
            focused
            value={
              state?.formOutputs?.date ?? new Date().toISOString().split("T")[0]
            }
            onChange={(ev) => handleChangeDate(ev)}
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
                value={state?.formOutputs?.priority ?? "m"}
                label="priority"
                onChange={(ev) => handleChangeSelect(ev)}
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
          <Link to="/">
            <Button
              variant="outlined"
              color="success"
              size="small"
              disabled={state?.formOutputs?.name !== "" ? false : true}
              onClick={() => {
                handleSubmit();
              }}
            >
              <AddIcon />
              ADD
            </Button>
          </Link>
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

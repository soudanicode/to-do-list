import { Box, Typography } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
export const MotivationText = (props) => {
  const { typography } = props;
  const { firstText, secondaryText } = typography;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 20px",
        color: "rgba(255, 255, 255, 0.7)",
        textAlign: "center",
      }}
    >
      <AssignmentTurnedInIcon sx={{ fontSize: 60, mb: 1, opacity: 0.8 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
        {firstText}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {secondaryText}
      </Typography>
    </Box>
  );
};

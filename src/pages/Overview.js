import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Overview() {
  const navigate = useNavigate();

  // Dummy Data (Replace with API later)
  const counts = {
    pending: 12,
    approved: 8,
    rejected: 3,
  };

  const cardStyle = {
    borderRadius: 3,
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 6,
    },
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Claims Overview
      </Typography>

      <Grid container spacing={4}>

        {/* Pending Claims */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ ...cardStyle, backgroundColor: "#facc15" }}
            onClick={() => navigate("/processor")}
          >
            <CardContent>
              <PendingActionsIcon sx={{ fontSize: 40 }} />
              <Typography variant="h4" mt={2} fontWeight="bold">
                {counts.pending}
              </Typography>
              <Typography variant="subtitle1">
                Pending Claims
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Approved Claims */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ ...cardStyle, backgroundColor: "#4ade80" }}
            onClick={() => navigate("/approved")}
          >
            <CardContent>
              <CheckCircleIcon sx={{ fontSize: 40 }} />
              <Typography variant="h4" mt={2} fontWeight="bold">
                {counts.approved}
              </Typography>
              <Typography variant="subtitle1">
                Approved Claims
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rejected Claims */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ ...cardStyle, backgroundColor: "#f87171" }}
            onClick={() => navigate("/rejected")}
          >
            <CardContent>
              <CancelIcon sx={{ fontSize: 40 }} />
              <Typography variant="h4" mt={2} fontWeight="bold">
                {counts.rejected}
              </Typography>
              <Typography variant="subtitle1">
                Rejected Claims
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

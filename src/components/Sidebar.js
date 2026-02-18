import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import { UploadFile } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check active route
  const isActive = (path) => location.pathname === path;

  // const menuItemStyle = (path) => ({
  //   backgroundColor: isActive(path) ? "#334155" : "transparent",
  //   color: "#fff",
  //   "&:hover": {
  //     backgroundColor: "#475569",
  //   },
  // });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e293b",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Claim Management
        </Typography>
      </Toolbar>

      <Divider sx={{ backgroundColor: "#334155" }} />

      <List>

          {/* Creator Menu */}
            {user?.role === "creator" && (
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/creator")}
                onClick={() => navigate("/creator")}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <UploadFile />
                </ListItemIcon>
                <ListItemText primary="Upload Claim Documents" />
              </ListItemButton>
            )}

            {/* Processor Menu */}
            {user?.role === "processor" && (
            <>
                 {/* <ListItemButton onClick={() => navigate("/overview")}>
                  <ListItemText primary="Overview" />
                </ListItemButton> */}

                <ListItemButton onClick={() => navigate("/processor")}>
                  <ListItemText primary="Claim List" />
                </ListItemButton>

                {/* <ListItemButton onClick={() => navigate("/approved")}>
                  <ListItemText primary="Approved Claims" />
                </ListItemButton> */}

                {/* <ListItemButton onClick={() => navigate("/rejected")}>
                  <ListItemText primary="Rejected Claims" />
                </ListItemButton> */}
              </>
            )}

      </List>

      <Box sx={{ flexGrow: 1 }} />
    </Drawer>
  );
}

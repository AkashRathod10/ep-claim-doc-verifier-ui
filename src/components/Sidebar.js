import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Collapse,
  Box,
  Button,
} from "@mui/material";

import {
  Dashboard,
  UploadFile,
  Approval,
  ExpandLess,
  ExpandMore,
  Logout,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

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
          Claim Docs Verify
        </Typography>
      </Toolbar>

      <Divider sx={{ backgroundColor: "#334155" }} />

      <List>
        {/* Dashboard Menu */}
        <ListItemButton onClick={() => setOpenMenu(!openMenu)}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

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
                <ListItemText primary="Upload Documents" />
              </ListItemButton>
            )}

            {/* Processor Menu */}
            {user?.role === "processor" && (
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive("/processor")}
                onClick={() => navigate("/processor")}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <Approval />
                </ListItemIcon>
                <ListItemText primary="Approve Documents" />
              </ListItemButton>
            )}

          </List>
        </Collapse>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}

import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
} from "@mui/icons-material";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ drawerWidth = 240 }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#0f172a",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Side */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>

          {/* <Typography variant="h6" sx={{ ml: 2 }}>
            Dashboard
          </Typography> */}
        </Box>

        {/* Right Side */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            Role: <b>{user?.role?.toUpperCase()}</b>
          </Typography>

          <Tooltip title="Account settings">
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                {user?.role?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
          >
            <MenuItem disabled>
              <AccountCircle sx={{ mr: 1 }} />
              {user?.role}
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

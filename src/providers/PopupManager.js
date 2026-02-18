import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CommonDialog({
  open,
  title = "Alert",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = true,
  onConfirm,
  onCancel,
  type = "default" // success | error | warning | info
}) {

  const getColor = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {showCancel && (
          <Button variant="outlined" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button
          variant="contained"
          color={getColor()}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>

    </Dialog>
  );
}

import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Delete } from "@mui/icons-material";
import CommonDialog from "../providers/PopupManager";
import { useDispatch } from "react-redux";
import { setClaimResult } from "../redux/slices/claimSlice";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreatorDashboard() {
  const [claimData, setClaimData] = useState({
    type: "",
    description: "",
    amount: "",
    incidentDate: "",
    policyNumber: "",
    remarks: "",
  });

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [showPopup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setClaimData({ ...claimData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

   const handleConfirm = () => {
    setPopup(false);
    alert("Claim Submitted Successfully!!");
    setFile(null);
    setClaimData({});
  };

  const handleSubmit = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append("pdf_file", file);

    console.log("formData: ", formData);

    try {
      setLoading(true);
      const response = await fetch("https://claim-backend-api-b6dqewdzhqfsbed8.ukwest-01.azurewebsites.net/clamis/upload-claim/", {
            method: "POST",
            body: formData,  
      });
      const res = await response.json();
      console.log("responseData: ", res);
      console.log("responseData length : ", res?.data?.length);
      dispatch(setClaimResult(res));


        if (res) {
          setLoading(false);
        // console.log("responseData displayed................ ");
            // dispatch(setClaimResult(res));
            setPopup(true);

        }

    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
    setLoading(false);  // Stop loader
  }

  };


  return (
    <Box style={{marginLeft: '-20%'}}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Create New Claim
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>

          {/* ================= Claim Details Section ================= */}
          <Typography style={{fontSize:'18px', fontWeight: 'bold'}} mb={2}>
            Claim Information
          </Typography>

          <Grid container spacing={3}>

            {/* Claim Type */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                fullWidth
                label="Claim Type"
                name="type"
                value={claimData.type}
                onChange={handleChange}
                style={{paddingRight: '110px'}}
              >
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Accident">Accident</MenuItem>
              </TextField>
            </Grid>

            {/* Claim Amount */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Claim Amount"
                type="number"
                name="amount"
                value={claimData.amount}
                onChange={handleChange}
              />
            </Grid>

            {/* Incident Date */}
            {/* <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Incident Date"
                name="incidentDate"
                value={claimData.incidentDate}
                onChange={handleChange}
              />
            </Grid> */}

            {/* Policy Number */}
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Policy Number"
                name="policyNumber"
                value={claimData.policyNumber}
                onChange={handleChange}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={claimData.description}
                onChange={handleChange}
                style={{paddingRight: '100px'}}
              />
            </Grid>

            {/* Remarks */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Remarks"
                name="remarks"
                value={claimData.remarks}
                onChange={handleChange}
              />
            </Grid> */}

          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* ================= Document Upload Section ================= */}
          <Typography style={{fontSize:'18px', fontWeight: 'bold'}} mb={2}>
            Upload Supporting Documents
          </Typography>

          <Grid container spacing={3}>

            {/* Upload Button */}
            <Grid item xs={12}>
              {/* <Button variant="contained" component="label">
                Upload Files
                <input
                  hidden
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </Button> */}

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            {/* File List */}
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
                  <List dense>
                    {!file && (
                      <Typography variant="body2" color="text.secondary">
                        No file uploaded
                      </Typography>
                    )}

                    {file && (
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" onClick={handleRemoveFile}>
                            <Delete color="error" />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={file.name} />
                      </ListItem>
                    )}
                  </List>
                </Paper>
            </Grid>
          
          </Grid>
            
          <Grid container spacing={3}>
           {/* Submit Button */}
            <Grid item xs={12}>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  size="medium"
                  // disabled={!file}
                  disabled={loading}
                  startIcon={
                    loading && <CircularProgress size={20} color="inherit" />
                  }
                  onClick={handleSubmit}
                >
                   {loading ? "Processing..." : "Submit Claim"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CommonDialog
        open={showPopup}
        title="Claim Submitted"
        message="Are you sure you want to submit this claim?"
        confirmText="Submit"
        cancelText="Cancel"
        type="success"
        onConfirm={handleConfirm}
        onCancel={() => setPopup(false)}
      />

    </Box>
  );
}

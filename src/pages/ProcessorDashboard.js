/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Card, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, LinearProgress
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CommonDialog from "../providers/PopupManager";
import { useSelector } from "react-redux";

const defaultColumns = [
  {width: 200, title: 'Claim ID', field: 'claim_id', enableSearch: true, enableFilter: true},
  {width: 200, title: 'Matched Claim ID', field: 'new_claim_id', enableSearch: true, enableFilter: true},
  {width: 200, title: 'Similarity Percentage', field: 'similarity_percentage', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Status', field: 'status', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Policy Number', field: 'policy_number', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Vehicle Number', field: 'vehicle_number', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Engine Number', field: 'engine_number', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Chassis Number', field: 'chassis_number', enableSearch: true, enableFilter: true},
  // {width: 120, title: 'Owner Name', field: 'owner_name', enableSearch: true, enableFilter: true},
  // {width: 120, title: 'Contact', field: 'mobile', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Accident Date', field: 'accident_date', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Description', field: 'damage_description', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Action', field: '', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Action', field: '', enableSearch: true, enableFilter: true},

];

const defaultModalColumns = [
  {width: 200, title: 'Claim ID', field: 'claim_id', enableSearch: true, enableFilter: true},
  {width: 100, title: 'Policy Number', field: 'policy_number', enableSearch: true, enableFilter: true},
  {width: 100, title: 'Vehicle Number', field: 'vehicle_number', enableSearch: true, enableFilter: true},
  {width: 100, title: 'Engine Number', field: 'engine_number', enableSearch: true, enableFilter: true},
  {width: 100, title: 'Chassis Number', field: 'chassis_number', enableSearch: true, enableFilter: true},
  {width: 120, title: 'Owner Name', field: 'owner_name', enableSearch: true, enableFilter: true},
  {width: 120, title: 'Contact', field: 'mobile', enableSearch: true, enableFilter: true},
  {width: 100, title: 'Accident Date', field: 'accident_date', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Description', field: 'damage_description', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Accident Location', field: 'accident_location', enableSearch: true, enableFilter: true},
  // {width: 100, title: 'Claim Creation Date', field: 'created_at', enableSearch: true, enableFilter: true},
];

export default function ProcessorDashboard() {
  const [open, setOpen] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  const [getClaimData, setClaimData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [newClaimId, setNewClaimId] = useState([]);
  const [topMatchedData, setTopMatchedData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [showPopup, setPopup] = useState(false);

  const claimData = useSelector((state) => state.claim);

  console.log("Redux data-------> ", claimData);
    useEffect(() => {
      setClaimData(claimData);
      setTableData([claimData]);
      setTopMatchedData(claimData.top_matches);
      setNewClaimId(claimData?.new_claim_id[0])
    },[claimData]);

  const handleOpen = (claim) => {
    // console.log("clicked claim..... ", claim)
    // setSelectedClaim(claim);
    getClaimDetails(claim)
    setOpen(true);
  };

  const handleOpenClaim = () => {
    setOpenClaim(true);
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMatched = () => {
    setOpenClaim(false);
  };
  

  console.log("topMatchedData--------> ", topMatchedData);

  console.log("newClaimId--------> ", newClaimId);
  
  // const handleApprove = (id) => {
  //   alert(`Claim ${id} Approved`);
  // };

  const handleReject = (id) => {
    alert(`Claim ${id} Rejected`);
  };
  

  const getClaimDetails = async (claim_id) => {

     try {

        const response = await fetch(`https://claim-backend-api-b6dqewdzhqfsbed8.ukwest-01.azurewebsites.net/clamis/claimdetails/${claim_id}/`,
          {
            method: "GET",
          });
          const res = await response.json();
          // console.log("modal data----------: ", res);
          setModalData(res);
            // if (res?.data?.length > 0) {
            //     setPopup(true);
            // }

        } catch (error) {
          console.error(error);
        }

  };


  const handleApprove = async (data) => {

     try {

      const formData = new FormData();

        // console.log("getClaimData passData ----- ", data);

        //  console.log("modalData?.file ----- ", modalData?.file);
              
          if (modalData?.file) {
            formData.append("pdf_file", modalData.file);
          }

          if (data?.new_claim_id) {
            formData.append("claim_id", data.new_claim_id);
          }

          if (data?.extracted_data) {
            formData.append(
              "extracted_data",
              JSON.stringify(data.extracted_data)
            );
          }

          if (data?.embedding) {
            formData.append(
              "embedding",
              JSON.stringify(data.embedding)
            );
          }

      console.log("FormData final--- ", formData);

      const response = await fetch("https://claim-backend-api-b6dqewdzhqfsbed8.ukwest-01.azurewebsites.net/clamis/add_claim_details/", {
            method: "POST",
            body: formData,  
          });
          const res = await response.json();
          console.log("Approved Data: ", res);

          if(res){
             setPopup(true);
          }

            // if (res?.data?.length > 0) {
            //     setPopup(true);
            // }

        } catch (error) {
          console.error(error);
        }

  };


  const handleConfirm = () => {
    // console.log("popup called......")
    setPopup(false);
    setTableData({});
  };

  const ClaimMatchedDetails = [
  { label: "Claim ID", value: modalData?.extracted_data?.claim_id },
  { label: "Policy Number", value: modalData?.extracted_data?.policy_number },
  { label: "Vehicle Model", value: modalData?.extracted_data?.vehicle_model },
  { label: "Engine Number", value: modalData?.extracted_data?.engine_number },
  { label: "Chassis Number", value: modalData?.extracted_data?.chassis_number },
  { label: "Owner Name", value: modalData?.extracted_data?.owner_name },
  { label: "Mobile", value: modalData?.extracted_data?.mobile },
  { label: "Accident Date", value: modalData?.extracted_data?.accident_date },
  { label: "Accident Location", value: modalData?.extracted_data?.accident_location },
  { label: "Damage Description", value: modalData?.extracted_data?.damage_description },
  { label: "Created At", value: modalData?.created_at },
];

  return (
    <>
      <h2>Claims List</h2>

      <TableContainer component={Paper} style={{marginLeft: '-15%'}}>
        <Table>
          <TableHead>
            <TableRow>

              {defaultColumns.map((column) => (
                <TableCell key={column.field} sx={{ width: column.width }}>
                  <strong>{column.title}</strong>
                </TableCell>
              ))}
              
            </TableRow>
          </TableHead>

          <TableBody>
        
             {topMatchedData.map((row) => (
              <TableRow key={row?.claim_id}>
                <TableCell
                  sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => handleOpen(row?.claim_id)}
                >
                   {row?.claim_id}
                </TableCell>

                <TableCell
                  sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => handleOpenClaim()}
                >
                   {newClaimId}
                </TableCell>

				        <TableCell>
                {/* <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">
                      {row?.similarity_percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={row?.similarity_percentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      mt: 1,
                    }}
                    color={
                      row?.similarity_percentage > 70
                        ? "success"
                        : row?.similarity_percentage > 40
                        ? "warning"
                        : "error"
                    }
                  />
                </Box> */}

                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">
                      {row?.similarity_percentage}%
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      height: 10,
                      borderRadius: 5,
                      overflow: "hidden",
                      display: "flex",
                      mt: 1,
                    }}
                  >
                    {/* RED Portion */}
                    <Box
                      sx={{
                        width: `${row?.similarity_percentage}%`,
                        backgroundColor: "error.main",
                      }}
                    />

                    {/* GREEN Remaining Portion */}
                    <Box
                      sx={{
                        width: `${100 - row?.similarity_percentage}%`,
                        backgroundColor: "#50a454",
                      }}
                    />
                  </Box>
                </Box>


              </TableCell>
                {/* <TableCell>{row?.status}</TableCell> 
                <TableCell>{row?.extracted_data.policy_number}</TableCell>
                <TableCell>{row?.extracted_data.vehicle_model}</TableCell>
                <TableCell>{row?.extracted_data.engine_number}</TableCell>
                <TableCell>{row?.extracted_data.chassis_number}</TableCell>
                <TableCell>{row?.extracted_data.owner_name}</TableCell>
                <TableCell>{row?.extracted_data.mobile}</TableCell>
                <TableCell>{row?.extracted_data.accident_date}</TableCell>
                <TableCell>{row?.extracted_data.accident_location}</TableCell>
                <TableCell>{row?.extracted_data.damage_description}</TableCell> */}
                {/* <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(getClaimData)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    // onClick={() => handleReject(row.claim_id)} 
                  >
                    Reject
                  </Button>
                </TableCell> */}
              </TableRow>
            ))} 

          </TableBody>
        </Table>
        
      </TableContainer>

            <div style={{marginTop: "21px", marginLeft:'15%'}}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(getClaimData)}
              >
                Approve
              </Button>

                <Button
                variant="contained"
                color="error"
                style={{ marginLeft:'20px'}}
                // onClick={() => handleReject(row.claim_id)} 
              >
                Reject
              </Button>

            </div>

      {/* Modal for Documents */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{fontSize: '18px', fontWeight: 'bold'}}>Claim Details</DialogTitle>
        <DialogContent sx={{overflowX: "auto"}}>
          <Card sx={{backgroundColor: "beige" }}>
            <Table>
            <TableBody>

              {/* Document Row */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                  Document
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => window.open(modalData?.file, "_blank")}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>

              {ClaimMatchedDetails.map((item) => (
                <TableRow key={item.label}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {item.label}
                  </TableCell>
                  <TableCell>
                    {item.value || "-"}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for matched claim */}
      <Dialog open={openClaim} onClose={handleCloseMatched} maxWidth="md" fullWidth>
        <DialogTitle style={{fontSize: '18px', fontWeight: 'bold'}}>Matched Claim Details</DialogTitle>
        <DialogContent sx={{overflowX: "auto"}}>
          <Card sx={{backgroundColor: "beige" }}>
            <Table>
              <TableHead>
                 {defaultModalColumns.map((column) => (
                    <TableCell key={column.field} sx={{ width: column.width }}>
                      <strong>{column.title}</strong>
                    </TableCell>
                  ))}
              </TableHead>

              <TableBody>
                 <TableCell>{getClaimData?.extracted_data?.claim_id}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.policy_number}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.vehicle_model}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.engine_number}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.chassis_number}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.owner_name}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.mobile}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.accident_date}</TableCell>
                {/* <TableCell>{getClaimData?.extracted_data?.accident_location}</TableCell>
                <TableCell>{getClaimData?.extracted_data?.damage_description}</TableCell> */}
              </TableBody>
            </Table>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMatched}>Close</Button>
        </DialogActions>
      </Dialog>


        <CommonDialog
          open={showPopup}
          title="Claim Submitted"
          message="Claim Approved..!"
          // confirmText="Submit"
          cancelText="Cancel"
          type="success"
          onConfirm={handleConfirm}
          onCancel={() => setPopup(false)}
        />
    </>
  );
}

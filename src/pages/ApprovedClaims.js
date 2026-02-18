import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function ApprovedClaims() {

  const [tableData, setTableData] = useState([]);
  
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


  const getApprovedClaimDetails = async () => {

     try {

      const response = await fetch(`https://claim-backend-api-b6dqewdzhqfsbed8.ukwest-01.azurewebsites.net/clamis/all_claim_details/`,
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


  return (
    <Paper sx={{ p: 2 }} style={{marginLeft: '-20%'}}>
      <h2>Approved Claims</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Approved Date</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Medical</TableCell>
            <TableCell>5000</TableCell>
            <TableCell>2026-02-13</TableCell>
            <TableCell>Done</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@mui/material";

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
        console.log("tableData----------: ", res);
        setTableData(res);

      } catch (error) {
        console.error(error);
      }

  };

useEffect(() => {
  getApprovedClaimDetails();
},[])

  return (
    <Paper sx={{ p: 2 }} style={{marginLeft: '-20%'}}>
      <h2>Approved Claims</h2>
      <Table>
          <TableHead>
              {defaultModalColumns.map((column) => (
                <TableCell key={column.field} sx={{ width: column.width }}>
                  <strong>{column.title}</strong>
                </TableCell>
              ))}
          </TableHead>
       <TableBody>
        {tableData.map((row) => (
          <TableRow key={row.claim_id}>
            
            <TableCell>{row.claim_id}</TableCell>

            {/* <TableCell>
              {row.file ? (
                <Button
                  size="small"
                  onClick={() => window.open(row.file, "_blank")}
                >
                  Download
                </Button>
              ) : (
                "-"
              )}
            </TableCell> */}

            <TableCell>{row.extracted_data?.policy_number}</TableCell>
            <TableCell>{row.extracted_data?.vehicle_number}</TableCell>
            <TableCell>{row.extracted_data?.vehicle_model}</TableCell>
            <TableCell>{row.extracted_data?.owner_name}</TableCell>
            <TableCell>{row.extracted_data?.mobile}</TableCell>
            <TableCell>{row.extracted_data?.accident_date}</TableCell>
            <TableCell>{row.extracted_data?.accident_location}</TableCell>
            <TableCell>
              {new Date(row.created_at).toLocaleDateString()}
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
      </Table>
    </Paper>
  );
}

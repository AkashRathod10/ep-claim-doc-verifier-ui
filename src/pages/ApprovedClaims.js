import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function ApprovedClaims() {
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

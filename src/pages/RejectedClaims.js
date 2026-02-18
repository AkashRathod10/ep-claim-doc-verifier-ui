import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function RejectedClaims() {
  return (
    <Paper sx={{ p: 2 }} style={{marginLeft: '-20%'}}>
      <h2>Rejected Claims</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Rejected Date</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Invalid Document</TableCell>
            <TableCell>2026-02-12</TableCell>
            <TableCell>Date missing</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

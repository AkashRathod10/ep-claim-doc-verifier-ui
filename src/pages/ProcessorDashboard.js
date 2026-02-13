import { useState, useEffect } from "react";
import { Button, TextField, Container, Paper } from "@mui/material";
import axios from "axios";

export default function ProcessorDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => setData(res.data.slice(0,5)));
  }, []);

  const handleApprove = () => {
    alert("Approved!");
  };

  return (
    <Container style={{marginLeft: '-20%'}}>
      <Paper sx={{ p: 3 }}>
        {/* <h2>Processor Dashboard</h2> */}

        <div>Date: </div><TextField type="date" />
        <div>Time: </div><TextField type="time" />

        <h3>Uploaded Documents</h3>

        <div key="">Addhar Card</div>

        {/* {data.map(item => (
          // <div key={item.id}>{item.title}</div>
          <div key={item.id}>Addhar Card</div>
        ))} */}

        <Button variant="contained" color="success" onClick={handleApprove} style={{marginTop: '10px'}}>
          Approve
        </Button>
      </Paper>
    </Container>
  );
}

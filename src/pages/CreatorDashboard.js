import { useState } from "react";
import { TextField, Button, Container, Paper } from "@mui/material";
import axios from "axios";

export default function CreatorDashboard() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    await axios.post("https://jsonplaceholder.typicode.com/posts", formData);

    alert("Data sent to backend!");
  };

  return (
    <Container style={{marginLeft: '-20%'}}>
      
      <Paper sx={{ p: 3 }}>

        <TextField
          fullWidth
          label="Enter Description"
          onChange={(e) => setText(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <Button variant="contained" onClick={handleSubmit} style={{marginTop: '10px'}}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
}

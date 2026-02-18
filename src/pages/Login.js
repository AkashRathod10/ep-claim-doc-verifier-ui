import { useState, useContext } from "react";
import { TextField, Button, MenuItem, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = () => {
    const success = login(form.username, form.password);

    if (success) {
      if (form.username === "creator") navigate("/creator");
      else navigate("/processor");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5">Login</Typography>

        {/* <TextField
          fullWidth
          margin="normal"
          label="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        /> */}

        <TextField
          fullWidth
          select
          label="Select User"
          // value={role}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          margin="normal"
        >
          <MenuItem value="creator">Creator</MenuItem>
          <MenuItem value="processor">Processor</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Login
        </Button>

        <Typography mt={2}>
          Dummy:
          <br />
          creator / 123
          <br />
          processor / 123
        </Typography>
      </Paper>
    </Container>
  );
}

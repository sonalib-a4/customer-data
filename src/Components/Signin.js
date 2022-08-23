import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      axios.post(`http://localhost:3000/users/login`, 
        { user: { 
                  email: data.get("email"), 
                  password: data.get("password")
                }
        }
      )
      .then(res => {
        if(res.status == 200)
          alert("You are logged in successfully");
          window.localStorage.setItem('isLoggedIn', true);
          navigate("/Dashboard");
      })
      .catch((error) => { alert(error?.response?.data?.error)})
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs" margin="5">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
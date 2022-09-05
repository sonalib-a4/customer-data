import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  
  const [formData, setFormData] = useState({email: "", password: ""})
  const [errors, setErrors] = useState({})

  const validate = event => {
    let temp = {};
    temp.email = formData.email === "" ? "Email is required." : ""
    if(formData.email)
      temp.email = (/\S+@\S+\.\S+/).test(formData.email) ? "" : (temp.email + " Email format is invalid.")
    temp.password = formData.password === "" ? "Password is required." : ""
    if(formData.password)
      temp.password = formData.password.length < 9 ? "Minimum 10 numbers required." : ""
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if(validate()){
      axios.post(`http://localhost:3000/users/login`, 
        { user: { 
            email: data.get("email"), 
            password: data.get("password")
          }
        }
      )
      .then(res => {
        if(res.status === 200)
          alert("You are logged in successfully");
          window.localStorage.setItem('isLoggedIn', true);
          navigate("/home");
      })
      .catch((error) => { alert(error?.response?.data?.error)})
    }
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
              required={true}
              margin="normal"
              fullWidth
              onChange={ event => {
                  setFormData({
                    ...formData,
                    email: event.currentTarget.value 
                  })
                }
              }
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              onChange={ event => {
                setFormData({
                  ...formData,
                  password: event.currentTarget.value
                })
              }
            }
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password ? true : false}
              helperText={errors.password}
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
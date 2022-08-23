import { AppBar, Toolbar, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';

export class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: JSON.parse(window.localStorage.getItem("isLoggedIn"))
    }
  }

  onLogout = () => {
    window.localStorage.setItem("isLoggedIn", false);
    this.setState({
      isLoggedIn: false
    })
    window.location.reload();
    useNavigate("/");
  }

  render() {
    return (
      <AppBar>
        <Toolbar sx={{display:'flex', justifyContent:"space-between"}}><Avatar alt="dummy" src="./dummy.png" />
          {
            this.state.isLoggedIn && 
            <Button 
              variant="contained"
              color="secondary" 
              size="small"
              onClick={this.onLogout} 
              href="/"
              endIcon={<LogoutIcon />}>Logout
            </Button>
          }
        </Toolbar>
    </AppBar>
    )
  }
}

export default Navbar

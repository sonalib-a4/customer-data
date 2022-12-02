  import { AppBar, Toolbar, Avatar, Switch, Button, Menu, MenuItem, Stack } from '@mui/material';
  import LogoutIcon from '@mui/icons-material/Logout';
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  import React, { Component } from 'react'
  import { useNavigate } from 'react-router-dom';
  import { Link } from '@mui/material';

  export class Navbar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoggedIn: JSON.parse(window.localStorage.getItem("isLoggedIn")),
        anchorEl: null,
        checked: true
      }
    }

    handleClose = () => {
      this.setState({ anchorEl: null })
    };

    loadCustomers = () => {
      this.handleClose()
      useNavigate("/customers");
    }

    onLogout = () => {
      window.localStorage.setItem("isLoggedIn", false);
      this.setState({
        isLoggedIn: false
      })
    }

    handleClick = (event) => {
      this.setState({
        anchorEl: event.currentTarget
      })
    }

   

    render() {
      return (
        <AppBar>
          <Toolbar sx={{display:'flex', justifyContent:"space-between"}}><Avatar alt="dummy" src="./dummy.png" />
            {
              this.state.isLoggedIn && 
              <Stack>
                <Stack direction="row" spacing={2}>
                  <Button color="inherit" href="/home">Home</Button>
                  <Button color="inherit" href="/dashboard">Dashboard</Button>
                  <Button color="inherit" 
                          id="clinician-list-button" 
                          onClick={this.handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                          >Customer
                  </Button>
                  
                  <Button 
                    variant="contained"
                    color="secondary" 
                    size="small"
                    onClick={this.onLogout}
                    href="/"
                    endIcon={<LogoutIcon />}>Logout
                  </Button>
                </Stack>
                <Menu id="customer-list" anchorEl={this.state.anchorEl} open={this.state.anchorEl ? true : false}>
                  <MenuItem 
                  component={Link} 
                  href="/customers"
                  >
                  Customers</MenuItem>
                  <MenuItem component={Link} onClick={this.handleClose} href="/editable_table" >Accounts</MenuItem>
                  <MenuItem onClick={this.handleClose} >Gallery</MenuItem>
                </Menu>
              </Stack>
            }
          </Toolbar>
        </AppBar>
      )
    }
  }

  export default Navbar

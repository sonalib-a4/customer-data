import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function FormDialog({ open, handleClose, handleSubmit}) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
                type="submit"
                variant="contained"
                size="small"
                >
                Submit
              </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

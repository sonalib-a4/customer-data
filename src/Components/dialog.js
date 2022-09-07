import * as React from 'react';
import { 
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  InputLabel
} from '@mui/material'
import Box from '@mui/material/Box';

export default function FormDialog({ errors, formData, open, handleClose, handleSubmit, onChange}) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Update User" : "Create New User" }</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              error={errors.name ? true : false}
              helperText={errors.name}
              onChange={event => onChange(event)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors.email}
              onChange={ event => onChange(event) }
            />

            <FormControl sx={{ width: 200 }} error={errors.status ? true : false}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                id="status"
                name="status"
                label="Status"
                value={formData.status}
                onChange={ event => onChange(event) }
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
              <FormHelperText>{errors.status}</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
                type="submit"
                variant="contained"
                size="small"
                >
                { formData.id ? "Update" : "Submit" }
              </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

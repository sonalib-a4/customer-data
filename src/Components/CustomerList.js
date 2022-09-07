import React from 'react'
import { Stack, Grid, Button } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { Navbar } from './Navbar'
import { useState, useEffect, useMemo } from 'react'
import { Add, Delete, Edit } from '@mui/icons-material'
import FormDialog from './dialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { render } from '@testing-library/react';

const CustomerList = () => {
  const [rowData, setRowData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: "", email: "", status: ""})
  const [errors, setErrors] = useState({})


  // without formik and yup
  const validate = () => {
    let temp = {};
    temp.name = formData.name === "" ? "Name is required." : ""
    if(formData.name)
      temp.name = formData.name.length <= 5  ? `${temp.name}, Minimum 5 characters required.` : ""
    temp.status = formData.status === "" ? "Status is required." : ""
    temp.email = formData.email === "" ? "Email is required." : ""
    if(formData.email)
      temp.email = (/\S+@\S+\.\S+/).test(formData.email) ? "" : (temp.email + " Email format is invalid.")
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x == "")
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: "id" }, 
    { field: "name" }, 
    { field: "email" },
    { field: "status" },
    { floatingFilter: false, headerName: "Actions", field: "id",
      cellRenderer: (params) => {
        return(
          <div>
            <IconButton aria-label="update" size="small" onClick={ () => handleUpdate(params.data) }>
              <Edit />
            </IconButton>
            
            <IconButton aria-label="delete" size="small" onClick={() => deleteUser()} value={params?.data?.id}>
              <Delete />
            </IconButton>
          </div>
        )
      }
    }
  ])

  const deleteUser = event => {
    const confirm = window.confirm("Are you sure, want to delete row?")
    if (confirm){
      axios.delete(`http://localhost:3000/users/${event.currentTarget?.value}`)
      .then(res => {
        if(res.status == 204)
          alert("You have destroyed user successfully");
          getUsers()
      })
      .catch((error) => { alert(error?.response?.data?.error)})
    }
  }

  const handleUpdate = oldData => {
    console.log(oldData)
    setFormData({
      ...oldData
    })
    handleClickOpen()
  }

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    width: 170,
    floatingFilter: true
  }), [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = event => {
    const {value, name} = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    // fetched input values for form
    event.preventDefault()
    // const data = new FormData(event.currentTarget)
    if(validate()){
      // we can use formData values here also
      if(formData.id){
        axios.put(`http://localhost:3000/users/${formData.id}`, 
          { user: formData }
        )
        .then(res => {
          if(res.status == 200){
            handleClose()
            getUsers()
            setFormData({ name: "", email: "", status: "" })
          }
        })
        .catch((error) => { alert(error?.response?.data?.error)})
      }else{
        axios.post(`http://localhost:3000/users/`, 
          { user: formData }
        )
        .then(res => {
          if(res.status == 201){
            handleClose()
            getUsers()
            setFormData({ name: "", email: "", status: ""})
          }
        })
        .catch((error) => { alert(error?.response?.data?.error)})
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch("http://localhost:3000/users")
    .then(result => result.json())
    .then(rowData => setRowData(rowData));
  }

  return (
    <Grid container rowSpacing={1} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} mb={10}>
        <Navbar />
      </Grid>
      <Grid item xs={9} justifyContent="flex-end">
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClickOpen}> Add User</Button> 
      </Grid>
      <Grid item xs={9}>
        <div className="ag-theme-alpine" style={{height: 500, margin: "px"}} >
          <AgGridReact 
          rowData={rowData}
          columnDefs={columnDefs}
          margin={4}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
          />
        </div>
      </Grid>
      <FormDialog 
        errors={errors} 
        formData={formData} 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        setFormData={setFormData}
        onChange={onChange}
        />
    </Grid>
  )
}

export default CustomerList

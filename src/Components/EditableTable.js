import React from 'react'
import { Grid } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { Navbar } from './Navbar'
import { useState, useEffect, useMemo } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const EditableTable = () => {
  const [rowData, setRowData] = useState(null)

  const [columnDefs, setColumnDefs] = useState([
    { field: "Vendor" }, 
    { field: "Group" }, 
    { field: "Product" },
    { field: "Mon", editable: true },
    { field: "Tue", editable: true },
    { field: "Wed", editable: true },
    { field: "Thu", editable: true },
    { field: "Fri", editable: true },
    { field: "Total", aggFunc: "mySum" }
  ])

  const defaultColDef = useMemo(() => ({
    width: 170,
    cellStyle: params => {
      if (params.colDef.editable) {
        return {color: 'black', backgroundColor: 'cyan'};
      }
      return null;
  }
  }), [])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch("http://localhost:3000/users/get_list")
    .then(result => result.json())
    .then(rowData => {
      setRowData(rowData)
    });
  }

  const aggFuncs = {
    // this overrides the grids built-in sum function
    'mySum': params => {
        debugger
        let sum = 0;
        // params.values.forEach(value => sum += value);
        return sum;
    }
};

  return (
    <Grid container rowSpacing={1} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} mb={10}>
        <Navbar />
      </Grid>
      <Grid item xs={9}>
        <div className="ag-theme-alpine" style={{height: 500, margin: "px"}} >
          {console.log(rowData)}
          <AgGridReact 
          rowData={rowData}
          columnDefs={columnDefs}
          margin={4}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
          aggFuncs={aggFuncs}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default EditableTable

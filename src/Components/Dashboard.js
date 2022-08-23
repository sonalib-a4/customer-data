import { Typography } from '@mui/material';
import React from 'react'
import { Navbar } from './Navbar';


const data = [
    { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
    { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  ];
  
  const columns = [
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
  ];

function Dashboard() {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Dashboard

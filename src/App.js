import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './Components/Signin'
import Dashboard from './Components/Dashboard'
import CustomerList from './Components/CustomerList'
import Home from './Components/home'
import React from 'react'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />     
      <Route path="/customers" element={<CustomerList />} />     
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

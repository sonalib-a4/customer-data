import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './Components/Signin'
import Dashboard from './Components/Dashboard'
import CustomerList from './Components/CustomerList'
import Home from './Components/home'
import React from 'react'
import {
  createTheme,
  ThemeProvider,
  Switch
} from "@mui/material";
import Gmap from './Components/Gmap'
import { darkTheme } from "./themes/darkTheme"
import { lightTheme } from "./themes/lightTheme"
import EditableTable from './Components/EditableTable'

function App() {
  const [mode, setMode] = React.useState("light")

  // This runs only when mode value changes
  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const toggleMode = () => {
    setMode(prevMode => ( prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <Switch
        color="secondary"
        onChange={toggleMode}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{ marginTop: 9 }}
        label={ mode === 'light' ? 'DarkMode' : 'LightMode' }
      />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />     
        <Route path="/customers" element={<CustomerList />} />     
        <Route path="/home" element={<Home />} />
        <Route path="/gmap" element={<Gmap />} />
        <Route path="/editable_table" element={<EditableTable />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignIn from './Components/Signin';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />     
      <Route path="/dashboard" element={<Dashboard />} />     
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Signup from "./Conection/Signup";
import Login from "./Conection/Login";
import { AuthProvider } from "./AuthContext";
import './Conection/conection.css'
import './Main/main.css'

const App = (props) => {
  return (
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' exact element={<props.render />} />
            <Route path='/manage' element={<props.manage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
)}

export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Signup from "./Conection/Signup";
import Login from "./Conection/Login";
import List from './Main/List';
import { AuthProvider } from "./AuthContext";
import './Conection/conection.css'
import './Main/main.css'
import NavBar from "./Main/NavBar";
import Footer from "./Main/Footer";

const App = (props) => {
  return (
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes location={'/main'}>
            <Route path='/main' element={<NavBar />}/>
          </Routes>

          <Routes>
            <Route path='/' exact element={<props.render />} />
            <Route path='/manage' element={<props.manage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/main'>
              <Route path='list' exact element={<List />} />
            </Route>
          </Routes>

          <Routes location={'/main'}>
            <Route path='/main' element={<Footer />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
)}

export default App
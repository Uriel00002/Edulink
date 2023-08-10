
import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/icons/css/all.css';

import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Profile} from './components/Profile';
import {Calif} from './components/Calif';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Apiurl } from './services/apirest';
import { Register_career } from './components/career/Register_career';
import { Index_career } from './components/career/Index_career';

function App() {
  const [login, setLogin] = useState(false)
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if(token){
      const intervalId = setInterval(() => {
        axios.post(Apiurl + 'users/verify/',{
          token
        })
          .then((res) => {
            if(res.data.isExpired){ // Si está expirado
              setLogin(false)
              localStorage.removeItem("token")
            }else{
              setLogin(true)
            }
          })
      }, 1000);

      // Limpieza: este retorno se ejecuta antes de que el componente sea desmontado
      return () => {
        clearInterval(intervalId); // Limpiar el intervalo al desmontar
      };
    }else{
      setLogin(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        {login ? (
          <Route path="/*" element={<AuthenticatedRoutes />} />
        ) : (
          <Route path="/*" element={<UnauthenticatedRoutes />} />
        )}
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calif" element={<Calif />} />
      <Route path="/career/*" element={<Routes>
        <Route path="/" element={<Index_career />} />
        <Route path="/register" element={<Register_career />} />
      </Routes>} />

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}

export default App;


import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/icons/css/all.css';

import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import New from './components/New';
import {Profile} from './components/Profile';
import {Calif} from './components/Calif';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Apiurl } from './services/apirest';

function App() {
  const [contador, setContador] = useState(0);
  const [login, setLogin] = useState(false)
  const token = localStorage.getItem("token");
  

  useEffect(() => {

    const intervalId = setInterval(() => {
      axios.post(Apiurl + 'users/verify/',{
        token
      })
        .then((res) => {
          if(res.data.isExpired){
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
  }, [token,login]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calif" element={<Calif />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;


import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/icons/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Profile} from './components/Profile';
import {Calif} from './components/Calif';
import {New} from './components/New';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Apiurl } from './services/apirest';
import { Register_career } from './components/career/Register_career';
import { Index_career } from './components/career/Index_career';
import { storeEdulink } from './store/EdulinkStore';

function App() {
  const authStatus = storeEdulink(state => state.auth.isAuth)
  const [intervalId, setIntervalId] = useState(null);

  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if(authStatus){
      const newIntervalId = setInterval(() => {
        axios.post(Apiurl + 'users/verify/',{
          token
        })
          .then((res) => {
            if(res.data.isExpired){ // Si está expirado
              //cerrar sesión
              clearInterval(newIntervalId);
            }
          })
      }, 5000);
      setIntervalId(newIntervalId);
    }
    // Limpieza: este retorno se ejecuta antes de que el componente sea desmontado
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
      <Route path="/auth/*" element={
        <>
          {
            authStatus ? (<Navigate to="/" />) 
            : (
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/*" element={ <Navigate to="/auth/login" /> }/>
              </Routes>
            )
          }
        </>
      } />
      <Route path="/*" element={ 
            <>
              {
                !authStatus ? (<Navigate to="/auth" />)
                : (
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/calif" element={<Calif />} />
                    <Route path="/career/*" element={<Routes>
                      <Route path="/" element={<Index_career />} />
                      <Route path="/register" element={<Register_career />} />
                    </Routes>} />

                    <Route path="*" element={ <Navigate to="/" /> }/>
                  </Routes>
                )
              }
            </>
          } />
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

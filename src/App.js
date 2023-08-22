/* eslint-disable react/jsx-pascal-case */

import React, { useEffect, useState } from 'react';
import './assets/css/App.css';
import './assets/icons/css/all.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery'


import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Register} from './components/student/Register';
import {Calif} from './components/grade/Calif';
import {New} from './components/New';
import {Index_buildings} from './components/buildings/Index_buildings';
import {Register_buildings} from './components/buildings/Register_buildings';
import {Index_categories} from './components/categories/Index_categories';
import {Register_categories} from './components/categories/Register_categories';
import {Index_position} from './components/positions/Index_position';
import {Register_position} from './components/positions/Register_position';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Apiurl } from './services/apirest';
import { Register_career } from './components/career/Register_career';
import { Index_career } from './components/career/Index_career';

import { storeEdulink } from './store/EdulinkStore';


function App() {
  const authStatus = storeEdulink(state => state.auth.isAuth)
  const token = storeEdulink(state => state.auth.token)
  const logout = storeEdulink(state => state.logout)
  const setAuth = storeEdulink(state => state.setAuth)
  const [intervalId, setIntervalId] = useState(null);
  

  useEffect(() => {
    if(authStatus){
      const newIntervalId = setInterval(() => {
        axios.post(Apiurl + 'users/verify/',{
          token
        })
          .then((res) => {
            if(res.data.isExpired){ // Si está expirado
              //cerrar sesión
              setAuth({
                token: null,
                user: null,
                isAuth: false,
                isTokenActive: false
              })
              logout()
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
      <div className='body'>
        <BrowserRouter>
        <Routes>
        <Route path="/auth/*" element={
          <>
            {
              authStatus ? (<Navigate to="/" />) 
              : (
                //rutas para no logueados
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
                    //rutas para logueados
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/new" element={<New />} />
                      <Route path="/calif" element={<Calif />} />
                      <Route path="/student/*" element={<Routes>
                        {/* <Route path="/" element={<Index_position />} /> */}
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/position/*" element ={<Routes>
                        <Route path="/" element={<Index_position />} />
                        <Route path="/register" element={<Register_position />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>}/>
                      <Route path="/categories/*" element={<Routes>
                        <Route path="/" element={<Index_categories />} />
                        <Route path="/register" element={<Register_categories />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>}/>
                      <Route path="/buildings/*" element ={<Routes>
                        <Route path="/" element={<Index_buildings />} />
                        <Route path="/register" element={<Register_buildings />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>}/>
                      <Route path="/career/*" element={<Routes>
                        <Route path="/" element={<Index_career />} />
                        <Route path="/register" element={<Register_career />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
        
                      <Route path="*" element={ <Navigate to="/" /> }/>
                    </Routes>
                  )
                }
              </>
            } />
        </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;

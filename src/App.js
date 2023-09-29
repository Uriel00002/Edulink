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
import { IndexCareer } from './components/career/IndexCareer';

import { alertError, alertSuccess, storeEdulink } from './store/EdulinkStore';
import Swal from 'sweetalert2';


export const typeUser = sessionStorage.getItem('type') //tipo de usuario
// 0: tutor 1: estudiante 2: docentes 3: asistentes 4: director 5: director academico 6: rector 7: control escolar 8: Recursos humanos  128: TODO

function App() {

  const authStatus = storeEdulink(state => state.auth.isAuth)
  const token = storeEdulink(state => state.auth.token)
  const username = storeEdulink(state => state.auth.user?.username)
  const logout = storeEdulink(state => state.logout)
  const loading = storeEdulink(state => state.ui.loading)
  const setLoading = storeEdulink(state => state.setLoading)
  const setAuth = storeEdulink(state => state.setAuth)
  const setToken = storeEdulink(state => state.setToken)
  const [intervalId, setIntervalId] = useState(null);

  const swalAlertTime = (min) => {
    Swal.fire({
      title: 'Tiempo de sesión',
      text: `La sesión expira en ${min} minutos`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Refrescar sesión',
      cancelButtonText: 'Ignorar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.get(Apiurl + 'users/refreshtoken/?username=' + username);
          console.log(res);
          setToken(res.data.token);
          alertSuccess(res.data.message);
        } catch (error) {
          console.log(error);
          alertError(error.response.data.error)
        }
      }
    });
  }
  

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
            }else{
              const time = res.data.time;//time in seconds
              if(time > 1795 && time <= 1805){// 30 minutos
                swalAlertTime(30)
              }else if(time > 895 && time <= 905){// 15 minutos
                swalAlertTime(15)
              }else if(time > 295 && time <= 305){// 5 minutos
                swalAlertTime(5)
              }
            }
          })
      }, 5000);
      setIntervalId(newIntervalId);
    }
    // Limpieza: este retorno se ejecuta antes de que el componente sea desmontado
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className='body'>
        {
          loading ? (
            <div className='loading'>
              <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
          ) : null
        }
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
                        <Route path="/" element={<IndexCareer />} />
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

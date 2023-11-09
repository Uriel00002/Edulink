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
import {PerfilUsuario} from './components/PerfilUsuario';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Apiurl } from './services/apirest';

import { alertError, alertSuccess, storeEdulink } from './store/EdulinkStore';
import Swal from 'sweetalert2';
import { IndexCRUD } from './components/crud/models/IndexCRUD';
import { Index } from './SICAH/views/Index';
import { IndexUsers } from './components/users/IndexUsers';
import { FormReport } from './components/reports/FormReport';
import HomeScreen from './TEMPO/views/HomeScreen';
import { IndexEmployees } from './components/users/IndexEmployees';
import { IndexStudents } from './components/users/IndexStudents';
import { Reports } from './SICAH/views/Reports';



// 0: tutor 1: estudiante 2: docentes 3: asistentes 4: director 5: director academico 6: rector 7: control escolar 8: Recursos humanos  128: TODO
export function App() {
  const authStatus = storeEdulink(state => state.auth.isAuth)
  const token = storeEdulink(state => state.auth.token)
  const username = storeEdulink(state => state.auth.user?.username)
  const logout = storeEdulink(state => state.logout)
  const loading = storeEdulink(state => state.ui.loading)
  const setLoading = storeEdulink(state => state.setLoading)
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
          window.location.reload();
        } catch (error) {
          console.log(error);
          alertError(error.response.data.error)
        }
      }
    });
    setTimeout(() => {
      Swal.close()
    }, 5000)
  }
  
  useEffect(() => {
    if(authStatus){
      const newIntervalId = setInterval(() => {
        axios.post(Apiurl + 'users/verify/',{
          token
        })
          .then((res) => {
            if(res.data.isExpired){ // Si está expirado
              logout()
              clearInterval(newIntervalId);
            }else{
              const time = res.data.time;//time in seconds
              if(time > 1795 && time <= 1800){// 30 minutos
                swalAlertTime(30)
              }else if(time > 895 && time <= 900){// 15 minutos
                swalAlertTime(15)
              }else if(time > 295 && time <= 300){// 5 minutos
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
                      <Route path="/calif" element={<Calif permissions={{c:[],r:[128],rbid:[128,0],u:[128],d:[]}} />} />
                      <Route path="/perfilusuario" element={<PerfilUsuario permissions={{c:[],r:[],rbid:[],u:[],d:[]}} />} />
                      <Route path="/users/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="users" nameView="Usuarios" permissions={{c:[128,7,8],r:[128,7,8],rbid:[128,7,8],u:[128,7,8],d:[128,7,8]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/employees/*" element={
                        <Routes>
                          <Route path="/" element={<IndexEmployees permissions={{c:[128,8],r:[128,8],rbid:[128,8],u:[128,8],d:[128,8]}} />} />
                          <Route path='/employees' element={<IndexCRUD nameAPI="employees" nameView="Empleados" permissions={{c:[128,8],r:[128,8],rbid:[128,8],u:[128,8],d:[128,8]}} />} />
                          <Route path='/positions' element={<IndexCRUD nameAPI="positions" nameView="Puestos" permissions={{c:[128,8],r:[128,8],rbid:[128,8],u:[128,8],d:[128,8]}} />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      } />
                      <Route path="/students/*" element={
                        <Routes>
                          <Route path="/" element={<IndexStudents permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,3,4,5,6,7],d:[128,7]}} />} />
                          <Route path="/students" element={<IndexCRUD nameAPI="students" nameView="Estudiantes" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />/*rbid 0,1*/} />
                          <Route path="/register" element={<Register permissions={{c:[128,7],r:[],rbid:[],u:[],d:[]}} />} />
                          <Route path="/highschools" element={<IndexCRUD nameAPI="highschools" nameView="Preparatorias" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />/*rbid 0,1*/} />
                          <Route path="/parents" element={<IndexCRUD nameAPI="parents" nameView="Padres" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />}/*rbid 0 u 0*//>
                          <Route path="/profiles" element={<IndexCRUD nameAPI="profiles" nameView="Perfiles" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />}/*rbid 0,1 u 1*//>
                          <Route path='/addresses' element={<IndexCRUD nameAPI="addresses" nameView="Direcciones" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />}/*c 1 rbid 0,1 u 1 d 1*//>
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      } />
                      <Route path="/subjects/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="subjects" nameView="Materias" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      {/* <Route path="/grades/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="grades" nameView="Calificaciones" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,2,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} /> */}
                      <Route path="/categories/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="categories" nameView="Categorías de aulas" permissions={{c:[128,7],r:[128,4,5,6,7],rbid:[128,4,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/classrooms/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="classrooms" nameView="Salones" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/career/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="careers" nameView="Carreras" permissions={{c:[128,7],r:[128,4,5,6,7],rbid:[128,4,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/buildings/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="buildings" nameView="Edificios" permissions={{c:[128,7],r:[128,5,6,7],rbid:[128,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/groups/*" element={<Routes>
                        <Route path="/" element={<IndexCRUD nameAPI="groups" nameView="Grupos" permissions={{c:[128,7],r:[128,3,4,5,6,7],rbid:[128,3,4,5,6,7],u:[128,7],d:[128,7]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />
                      <Route path="/reports/*" element={<Routes>
                        <Route path="/" element={<FormReport />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />

                      {/* SICAH */}
                      <Route path="/sicah/*" element={<Routes>
                        <Route path="/" element={<Index permissions={{c:[],r:[128,4],rbid:[],u:[],d:[]}} />} />
                        <Route path="/academiccharges" element={<IndexCRUD nameAPI="academiccharges" nameView="Carga horaria" permissions={{c:[128,4],r:[128,4],rbid:[128,4],u:[128,4],d:[128,4]}} />} />
                        <Route path='/reports' element={<Reports permissions={{c:[128,4],r:[],rbid:[],u:[],d:[]}} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>} />

                      {/* TEMPO */}
                      <Route path="/tempo/*" element={<Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/createSchedules" />
                        <Route path="/editSchedules" />
                        <Route path="/seeSchedules" />
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
import React from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/list.css'

export const IndexUsers = () => {
  const navigate = useNavigate()
  return (
    <>
       <section className="header_main">
                <Header name={"Usuarios"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu">
                <div class="list-multiple">
                  <ul>
                    <li class="parent">Cuentas
                      <ul class="sub-list">
                        <li onClick={() => navigate('users')}>Usuarios</li>
                      </ul>
                    </li>
                    <li class="parent">Estudiantes
                      <ul class="sub-list">
                        <li onClick={() => navigate('students')}>Datos academicos</li>
                        <li onClick={() => navigate('highschools')}>Preparatorias</li>
                        <li onClick={() => navigate('profiles')}>Perfiles</li>
                        <li onClick={() => navigate('addresses')}>Direcciones</li>
                      </ul>
                    </li>
                    <li class="parent">Padres
                      <ul class="sub-list">
                        <li onClick={() => navigate('parents')}>Datos familiares</li>
                      </ul>
                    </li>
                    <li class="parent">Empleados
                      <ul class="sub-list">
                        <li onClick={() => navigate('employees')}>Datos laborales</li>
                        <li onClick={() => navigate('positions')}>Puestos</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
    </>
  )
}

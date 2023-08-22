/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'
import axios from "axios";
import { Apiurl } from "../services/apirest";
import { storeEdulink } from "../store/EdulinkStore";
import { Link } from "react-router-dom";


const Header = ({name}) => {
  const username = storeEdulink(state => state.auth.user.username)
  const setAuth = storeEdulink(state => state.setAuth)
  const logout = storeEdulink(state => state.logout)
  const [togleOptions, setTogleOptions] = useState(false)

  return (
    <section id="header" className="header">
        <Link to="/" className="header_logo">
            <img src={Logo} alt="Logo" />
        </Link>
        <a className="info-page">{name}</a>
        <div className="header_icon">
            <i className="fas fa-bars" onClick={() => setTogleOptions(!togleOptions)} />
        </div>
        <div className="d-flex w-100 justify-content-end">
          <div style={{transform: togleOptions ? 'translateY(0%)' : 'translateY(-1000%)'}} className="header_options">
              <ul>
                  <li onClick={()=>{}}>Ver perfil</li>
                  <li onClick={()=>{}}>... ... ...</li>
                  <li onClick={()=>{}}>... ... ...</li>
                  <li onClick={()=>{}}>Cambiar contraseña</li>
                  <li onClick={logout}>Cerrar Sesión</li>
              </ul>
          </div>
        </div>
    </section>
  )
}

export default Header
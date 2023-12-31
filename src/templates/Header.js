/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'
import { storeEdulink } from "../store/EdulinkStore";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Header = ({name}) => {
  const navigate = useNavigate()
  const location = useLocation() 
  const logout = storeEdulink(state => state.logout)
  const [togleOptions, setTogleOptions] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if(e.target.id === 'fondo') {
        setTogleOptions(false)
      }
    })
  }, [])

  return (
    <section id="header" className="header">
        <Link to="/" className="header_logo">
            <img src={Logo} alt="Logo" />
        </Link>
        <a className="info-page">{name}</a>
          <i className="header_icon p-2 fas fa-bars fs-3" onClick={() => setTogleOptions(!togleOptions)} />

        {
          togleOptions &&
            <div id="fondo" className="w-100 position-absolute bg-transparent" style={{height: '100vh', zIndex: '2'}}>
            </div>
        }

        
        <div className="d-flex w-100 justify-content-end">
          <div style={{transform: togleOptions ? 'translateY(0%)' : 'translateY(-1000%)'}} className="header_options">
              <ul>
                <Link to="/perfilusuario"><i className="fa-duotone fa-user"></i> Ver perfil</Link>
                <Link to="/"><i className="fa-duotone fa-user-graduate"></i> EDULINK</Link>
                <Link to="/tempo"><i className="fa-duotone fa-table"></i> TEMPO</Link>
                <Link to="/sicah"><i className="fa-duotone fa-clock"></i> SICAH</Link>
                <Link to="/sipecs"><i className="fa-duotone fa-user-police"></i> SIPECS</Link>
                <li onClick={logout}><i className="fa-duotone fa-arrow-right-from-bracket"></i> Cerrar Sesión</li>
              </ul>
          </div>
        </div>
    </section>
  )
}

export default Header
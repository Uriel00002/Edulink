import React from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'


const Header = ({name}) => {
  return (
    <section id="header" className="header">
        <div className="header_logo">
            <img src={Logo}/>
        </div>
        <a className="info-page">{name}</a>
        <div className="header_icon">
            <i className="fas fa-bars" />
        </div>
    </section>
  )
}

export default Header
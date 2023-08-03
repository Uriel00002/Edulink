import React from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'

class Header extends React.Component{

    render(){

        return(

           <section id="header" className="header">
                <div className="header_logo">
                    <img src={Logo}/>
                </div>
                <a className="info-page">INICIO</a>
                <div className="header_icon">
                    <i className="fas fa-bars" />
                </div>
           </section>

        );

    }

}

export default Header;
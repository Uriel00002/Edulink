import React from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'

class Header extends React.Component{

    render(){

        return(

           <section id="header" className="header">

                <img src={Logo}/>
                {/* <div className="icon-out">
                </div> */}
                <a className="info-page">INICIO</a>
                <i className="fas fa-bars" />
                {/* <div className="logo">
                </div> */}
           </section>

        );

    }

}

export default Header;
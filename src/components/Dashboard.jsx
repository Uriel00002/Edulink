import React from "react";
import Header from "../stemplates/Header"
import Footer from "../stemplates/Footer"
import '../assets/css/dashboard.css'
import Logo from '../assets/img/logo.png'


class Dashboard extends React.Component{

    render(){

        return(

            <React.Fragment>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>


                <Header></Header>


                <section className="carrousel">
                <div class="carousel center-aling">
                <div class="carousel-item">
                        <img src={Logo}/>
                </div>
              
               
                </div>
                </section>
                

            </React.Fragment>

        );

    }

}   

export default Dashboard
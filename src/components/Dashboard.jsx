import React from "react";
import '../assets/css/dashboard.css'
import Img from '../assets/img/wallpaper.png'
import { useNavigate } from 'react-router-dom';
import Header from "../templates/Header";


export const Dashboard = () => {
    const history = useNavigate();


    return(

        <React.Fragment>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>


            <section className="dashboard">

                <Header name={"Inicio"} />

                <div className="dashboard_content d-flex align-items-center">

                    <div className="dash_menu">
                        
                    </div>

                </div>

                
            </section>

        </React.Fragment>

 );
}
import React from "react";
import Header from "../templates/Header"
import '../assets/css/dashboard.css'
import Img from '../assets/img/wallpaper.png'
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
    const history = useNavigate();


    return(

        <React.Fragment>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>


            <section className="dashboard">


                <Header></Header>


                <div className="dashboard_content">

                    <div className="carrousel d-flex align-items-center">
                            <div class="carousel-item d-block w-100">
                                    <img src={Img} alt="..." />
                            </div>
                    </div>

                </div>

                
            </section>

        </React.Fragment>

 );
}
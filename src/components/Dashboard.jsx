import React from "react";
import '../assets/css/dashboard.css';
import Img from '../assets/img/wallpaper.png';
import Header from "../templates/Header";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


export const Dashboard = () => {

    return (
        <React.Fragment>

            <section className="dashboard">
                <Header name={"Inicio"} />

                <div className="dashboard_content d-flex align-items-center">


                    <div className="dash_menu">

                        <div className="carousel-div">

                                <Carousel className="carrusel-list" infiniteLoop autoPlay showArrows={true} showThumbs={false} showStatus={false} showIndicators={true} transitionTime={1000} >

                                    <div className="carrusel-track">
                                        <img src={Img} alt="imagen" />
                                        <p className="legend">Legend 1</p>
                                    </div>
                                    <div className="carrusel-track">
                                        <img src={Img} alt="imagen" />
                                        <p className="legend">Legend 1</p>
                                    </div>
                                    <div className="carrusel-track">
                                        <img src={Img} alt="imagen" />
                                        <p className="legend">Legend 1</p>
                                    </div>
                                </Carousel>


                        </div>

                    </div>


                </div>
            </section>
        </React.Fragment>
    );
}

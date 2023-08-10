import React from "react";
import '../assets/css/dashboard.css';
import Img from '../assets/img/wallpaper.png';
import { useNavigate } from 'react-router-dom';
import Header from "../templates/Header";
import { Link } from 'react-router-dom'; // Importa el componente Link

export const Dashboard = () => {
    const history = useNavigate();

    const manejadorBotonPage = async() => {
        history("/dashboard");
      }

    return (
        <React.Fragment>

            <section className="dashboard">
                <Header name={"Inicio"} />

                <div className="dashboard_content d-flex align-items-center">


                    <div className="dash_menu">

                        <div className="carousel">

                            <div className="carousel_item ">
                                <a>Registrar Usuarios</a>
                                <Link to="/profile"> {/* Enlace al hacer clic */}
                                     <button>Ir a Otra Página</button>
                                </Link>
                            </div>

                            <div className="carousel_item ">
                                <a> Calificaciones</a>
                                <Link to="/calif"> {/* Enlace al hacer clic */}
                                     <button>Ir a Otra Página</button>
                                </Link>
                            </div>

                        </div>

                    </div>


                </div>
            </section>
        </React.Fragment>
    );
}

/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import "../../assets/css/App.css";

export const PerfilUsuario = () => {
    return (
        <React.Fragment>
            <section className="header_main">
                <Header name={"Perfil"} />
            </section>
            <section className="profile_main">
                <div class="user-details">
                    <h1>Datos del Usuario</h1>
                    <div class="detail">
                        <label for="nombre">Nombre:</label>
                        <span id="nombre">John</span>
                    </div>
                    <div class="detail">
                        <label for="apellido-paterno">Apellido Paterno:</label>
                        <span id="apellido-paterno">Doe</span>
                    </div>
                    <div class="detail">
                        <label for="apellido-materno">Apellido Materno:</label>
                        <span id="apellido-materno">Smith</span>
                    </div>
                    <div class="detail">
                        <label for="email">Email:</label>
                        <span id="email">john.doe@example.com</span>
                    </div>
                    <div class="detail">
                        <label for="contrasena">Contraseña:</label>
                        <span id="contrasena">**********</span>
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
        </React.Fragment>
    );
}
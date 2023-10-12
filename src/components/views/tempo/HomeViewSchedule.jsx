/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

export const Home = () => {

    return (
        <React.Fragment>
            <section className="header_main">
                <Header name={"TEMPO"} />
            </section>
            <section className="profile_main">
                <div class="user-details">
                    <div style={cardContainerStyle}>
                      <Card
                        title="Crear Horario"
                        description="Crea un nuevo horario."
                        link="/create"
                      />
                      <Card
                        title="Editar Horario"
                        description="Edita tu horario actual."
                        link="/edit"
                      />
                      <Card
                        title="Ver Horario"
                        description="Visualiza tu horario actual."
                        link="/schedule"
                      />
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
        </React.Fragment>
    );
}
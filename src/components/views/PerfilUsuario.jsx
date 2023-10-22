/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import "../../assets/css/App.css";
import { storeEdulink } from "../../store/EdulinkStore";
import { encriptar_desencriptar } from "../../helpers/criptografia";
import { useNavigate } from "react-router-dom";
import { validateUserInView } from "../../helpers/funtionsGlobals";

export const PerfilUsuario = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const {user} = storeEdulink(state => state.auth)
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario

    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

    const handleChangePassword = () => {
        console.log("Cambiar contraseña")
    }
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
                        <span id="nombre">{user.name || 'Sin nombre'}</span>
                    </div>
                    <div class="detail">
                        <label for="email">Usuario:</label>
                        <span id="email">{user.username}</span>
                    </div>
                    <div class="detail">
                        <label for="email">Email:</label>
                        <span id="email">{user.email}</span>
                    </div>
                    <div class="detail">
                        <label for="email">Rol:</label>
                        <span id="email">{typeUser === 0 ? 'Tutor' : typeUser === 1 ? 'Estudiante' : 'Empleado'}</span>
                    </div>
                    <div class="detail">
                        <button onClick={handleChangePassword} type="button" class="btn btn-primary w-100 fs-4">Cambiar contraseña</button>
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
        </React.Fragment>
    );
}
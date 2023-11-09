import axios from "axios";
import React, { useState } from "react";
import { Apiurl } from "../services/apirest";
import Logo from '../assets/img/logo.png';
import Pic from '../assets/img/pics.jpg'
import Pic2 from '../assets/img/pics2.jpg'
import Pic3 from '../assets/img/pics3.jpg'
import Uni from '../assets/img/uni.jpg';
import Uni2 from '../assets/img/uni2.jpg';
import Uni3 from '../assets/img/uni3.jpg';
import '../assets/css/login.css'
import { useNavigate } from 'react-router-dom';
import { storeEdulink } from "../store/EdulinkStore";
import { encriptar_desencriptar } from "../helpers/criptografia";


// Resto del código...

export const Login = () => {
    const setAuth = storeEdulink(state => state.setAuth);
    const setLoading = storeEdulink(state => state.setLoading);
    const [data, setData] = useState({
        form: {
            "username": "",
            "password": ""
        },
        error: false,
        errorMsg: ""
    })
    const [view, setView] = useState('login')

    const manejadorSubmit = e => {
        e.preventDefault();
    }

    const manejadorChange = async e => {
        await setData({
            ...data,
            form: {
                ...data.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const manejadorBoton = async () => {
        setLoading(true);
        if(view === 'login'){
            let url = Apiurl + "users/login/";
            try {
                const response = await axios.post(url, data?.form);
                if(response?.data){
                    const newType = encriptar_desencriptar(response.data.type, "e");
                    newType && setAuth({
                        type: newType,
                        token: response.data.token,
                        user: {...response.data.user, type: 'Por que estas viendo esto? -_-'},
                        isAuth: true,
                        isTokenActive: true
                    });
                }
                // console.log(response.data);
            } catch (error) {
                console.log(error);
                setData({
                    ...data,
                    error: true,
                    errorMsg: error.response.data.error
                });
            } finally {
                setLoading(false);
            }
        } else if(view === 'recuperar'){
            const username = data.form.username.trim();
            const email = data.form.email.trim();
            const new_password = data.form.new_password.trim();
            const confirm_password = data.form.confirm_password.trim();
            let url = Apiurl + "users/newpass/";
            if(!username || !email || !new_password){
                setData({
                    ...data,
                    error: true,
                    errorMsg: "Todos los campos son obligatorios"
                });
                setLoading(false);
                return;
            }
            if(new_password !== confirm_password){
                setData({
                    ...data,
                    error: true,
                    errorMsg: "Las contraseñas no coinciden"
                });
                setLoading(false);
                return;
            }
            try {
                const response = await axios.post(url, {
                    username,
                    new_password,
                    recovery_password: '1',
                    email,
                });
                console.log(response.data);
                setData({
                    ...data,
                    error: false,
                    errorMsg: "Se ha enviado un correo con la nueva contraseña, puede iniciar sesión con la nueva contraseña"
                });
            } catch (error) {
                console.log(error);
                setData({
                    ...data,
                    error: true,
                    errorMsg: error.response.data.error
                });
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <React.Fragment>

            <section className="login_body">
                <div className="wrapperr fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src={Logo} alt="Logo" />
                        </div>

                        {
                            view === 'login' && <>
                            <form onSubmit={manejadorSubmit}>
                                <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={manejadorChange} />
                                <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange} />
                                <div className="d-flex flex-column">
                                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={manejadorBoton} />
                                    <button type="button" className="btn" onClick={() => setView('recuperar')}>Olvidaste tu contraseña?</button>
                                </div>
                            </form>
                            </>
                        }
                        {
                            view === 'recuperar' && <>
                            <form onSubmit={manejadorSubmit}>
                                <input type="text" id="username" className="fadeIn second" name="username" placeholder="Usuario" onChange={manejadorChange} required />
                                <input type="text" id="email" className="fadeIn third" name="email" placeholder="Email" onChange={manejadorChange} required />
                                <input type="password" id="new_password" className="fadeIn third" name="new_password" placeholder="Nueva contraseña" onChange={manejadorChange} required />
                                <input type="password" id="confirm_password" className="fadeIn third" name="confirm_password" placeholder="Confirmar contraseña" onChange={manejadorChange} required />
                                <div className="d-flex flex-column">
                                    <input type="submit" className="fadeIn fourth" value="Enviar" onClick={manejadorBoton} />
                                    <button type="button" className="btn" onClick={() => setView('login')}>Volver</button>
                                </div>
                            </form>
                            </>
                        }

                        {data.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {data.errorMsg}
                            </div>
                        }
                        {
                            data.error === false &&	data.errorMsg &&
                            <div className="alert alert-success" role="alert">
                                {data.errorMsg}
                            </div>
                        }

                    </div>
                </div>
            </section>
            <section className="login_pics">
                <img src={Pic} className="one" alt="" />
                <img src={Uni} className="two" alt="" />
                <img src={Uni2} className="three" alt="" />
                <img src={Uni3} className="four" alt="" />
                <img src={Pic} className="five" alt="" />
            </section>

        </React.Fragment>
    );
}
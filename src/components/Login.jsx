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
        let url = Apiurl + "users/login/";
        try {
            const response = await axios.post(url, data.form);
            setAuth({
                type: await encriptar_desencriptar(response.data.type, 'e'),
                token: response.data.token,
                user: {...response.data.user, type: response.data.type},
                isAuth: true,
                isTokenActive: true
            });
            sessionStorage.setItem('type', response.data.type);
            console.log(response.data);
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

    return (


        <React.Fragment>

            <section className="login_body">
                <div className="wrapperr fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src={Logo} />
                        </div>

                        <form onSubmit={manejadorSubmit}>
                            <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={manejadorChange} />
                            <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={manejadorBoton} />
                        </form>

                        {data.error === true &&
                            <div className="alert alert-danger" role="alert">
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

// export default withRouter(Login); // Utiliza withRouter para acceder a props.history

import axios from "axios";
import React, { useState } from "react";
import { Apiurl } from "../services/apirest";
import Logo from '../assets/img/logo.png'
import '../assets/css/login.css'
import { useNavigate } from 'react-router-dom';
import { storeEdulink } from "../store/EdulinkStore";


// Resto del código...

export const Login = () => {
    const setAuth = storeEdulink(state => state.setAuth);
    const [data, setData] = useState({
        form:{
            "username":"",
            "password":""
        },
        error : false,
        errorMsg:""
    })

  const manejadorSubmit = e=>{
    e.preventDefault();
}

const manejadorChange = async e=>{
    await setData({
        ...data,
        form:{
            ...data.form,
            [e.target.name]: e.target.value
        }
    })
}

  const manejadorBoton = async() => {
    let url = Apiurl + "users/login/";
    try {
        const response = await axios.post(url, data.form);
        setAuth({
            token: response.data.token,
            user: response.data.user,
            isAuth: true,
            isTokenActive: true
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
        setData({
            ...data,
            error: true,
            errorMsg: error.response.data.error
        });
    }
  }

    return(

        <React.Fragment>

            <section className="login_body">
                <div className="wrapperr fadeInDown">
                    <div id="formContent">

                    <div className="fadeIn first">
                        <img src={Logo} />
                    </div>

                    <form onSubmit={manejadorSubmit}>
                        <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={manejadorChange}/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange}/>
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick={manejadorBoton}/>
                    </form>

                    {data.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {data.errorMsg}
                        </div>
                    }

                    </div>
                </div>
            </section>

        </React.Fragment>

 );
}

// export default withRouter(Login); // Utiliza withRouter para acceder a props.history

import React from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/login.css'
import { Apiurl } from "../services/apirest";
import axios from "axios";

class Login extends React.Component{


    state={
        form:{
            "username":"",
            "password":""
        },
        error : false,
        errorMsg:"do babes"
    }

    manejadorSubmit = e=>{
        e.preventDefault();
    }

    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }

    manejadorBoton = () =>{
        let url = Apiurl + "users/login/";
        axios.post(url, this.state.form)
        .then( response =>{
            console.log(response);
        })    }


    render(){

        return(

               <React.Fragment>

                    <div className="wrapper fadeInDown">
                    <div id="formContent">

                    <div className="fadeIn first">
                        <img src={Logo} width="200px" alt="User Icon" />
                    </div>

                    <form onSubmit={this.manejadorSubmit}>
                        <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={this.manejadorChange}/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.manejadorChange}/>
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton}/>
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
                    </div>

               </React.Fragment>

        );

    }

}   

export default Login
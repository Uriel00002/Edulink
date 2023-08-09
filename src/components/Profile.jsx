import React from "react";
import Header from "../templates/Header"
import Logo from '../assets/img/logo.png'
import '../assets/css/profile.css'
import { Apiurl } from "../services/apirest";
import axios from "axios";
import { useNavigate } from 'react-router-dom';




export const Profile = () => {
    const history = useNavigate();

    return(

        <React.Fragment>

            
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <header>
                  <meta charset="utf-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1"/>
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                </header>


                <section className="profile">

                <Header name={"Perfil"} />

                <hr/>
                
                <div className="container bootstrap snippet">

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center">
                                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
                                <h6>Upload a different photo...</h6>
                                <input type="file" class="text-center center-block file-upload"/>
                            </div>

                            <hr/>
                            <br/>
                            <div className="panel panel-default">
                                    <div className="panel-heading">Website <i class="fa fa-link fa-1x"></i></div>
                                    <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
                            </div>
                        </div>

                        <div className="col-sm-9">
                            
                                    <ul className="nav nav-tabs">
                                        <li className="active"><a data-toggle="tab" href="#home">Datos Personales</a></li>
                                        <li ><a data-toggle="tab" href="#school_info">Datos Escolares</a></li>
                                        <li ><a data-toggle="tab" href="#fam_data">Datos de padre o tutor</a></li>
                                    </ul>

                                    
                                    <div className="tab-content">

                                        <div className="tab-pane active" id="home">
                                            <hr/>
                                            <form className="form" action="##" method="post" id="registrationForm">
                                                {
                                                    [].map((item, index) => (
                                                        <div className="form-group">
                                                                <div className="col-xs-6">
                                                                    <label><h4>{item.etiqueta}</h4></label>
                                                                    <input type="text"  className="form-control" id={item.nombre} placeholder="Nombre(s)"/>
                                                                </div>
                                                        </div>
                                                    ))
                                                }
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Nombre</h4></label>
                                                            <input type="text"  className="form-control" id="first_name" placeholder="Nombre(s)"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Apellido Paterno</h4></label>
                                                        <input type="text" className="form-control" id="ape_pat" placeholder="apellido_paterno" />
                                                     </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Apellido Materno</h4></label>
                                                        <input type="text" className="form-control" id="ape_mat" placeholder="apellido_materno" />
                                                     </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Telefono</h4></label>
                                                            <input type="text" className="form-control" id="tel" placeholder="+52 000000..."/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Correo</h4></label>
                                                            <input type="text" className="form-control" id="email" placeholder="you@email.com"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Tipo sanguineo</h4></label>
                                                            <input type="text" className="form-control" id="blod_type" placeholder="O+"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Genero</h4></label>
                                                            <input type="text" className="form-control" id="gender" placeholder="F / M"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Estado Civil</h4></label>
                                                            <input type="text" className="form-control" id="e_civil" placeholder="Casado / Divorciado / Viudo"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Edad</h4></label>
                                                            <input type="int" className="form-control" id="age" placeholder="0"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Numero de hijos</h4></label>
                                                            <input type="int" className="form-control" id="children" placeholder="0"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Estado</h4></label>
                                                            <input type="text" className="form-control" id="state" placeholder="..."/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Municipio</h4></label>
                                                            <input type="text" className="form-control" id="city" placeholder="..."/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Direccion</h4></label>
                                                            <input type="text" className="form-control" id="adress" placeholder="..."/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-12">
                                                                <br/>
                                                                <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Siguiente</button>
                                                            </div>
                                                </div>
                                            </form>
                                        </div> 

                                        <div className="tab-pane " id="school_info">
                                            <hr/>
                                            <form className="form" action="##" method="post" id="registrationForm">
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Escuela de procedencia</h4></label>
                                                        <input type="text" className="form-control" id="hight_school" placeholder="Preparatoria"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Ciudad de procedencia</h4></label>
                                                        <input type="text" className="form-control" id="city_school" placeholder="Preparatoria"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Año de ingreso</h4></label>
                                                        <input type="int" className="form-control" id="school_in" placeholder="2000"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Año de egreso</h4></label>
                                                        <input type="int" className="form-control" id="school_eg" placeholder="2000"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Promedio Final</h4></label>
                                                        <input type="int" className="form-control" id="prom_old" placeholder="< 6"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                            <div className="col-xs-12">
                                                                    <br/>
                                                                    <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Siguiente</button>
                                                                </div>
                                                </div>    
                                            </form>
                                        </div>

                                        <div className="tab-pane " id="fam_data">
                                            <hr/>
                                            <form className="form" action="##" method="post" id="registrationForm">                                                                                                  
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Nombre</h4></label>
                                                            <input type="text" className="form-control" id="tutor_first_name" placeholder="Nombre(s)"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Apellido Paterno</h4></label>
                                                        <input type="text" className="form-control" id="tutor_ape_pat" placeholder="apellido_paterno" />
                                                     </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label><h4>Apellido Materno</h4></label>
                                                        <input type="text" className="form-control" id="tutor_ape_mat" placeholder="apellido_materno" />
                                                     </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Telefono</h4></label>
                                                            <input type="text" className="form-control" id="tutor_tel" placeholder="+52 000000..."/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label><h4>Correo</h4></label>
                                                            <input type="text" className="form-control" id="tutor_email" placeholder="you@email.com"/>
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-12">
                                                        <br/>
                                                        <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Guardar</button>
                                                    </div>
                                                </div>   
                                            </form>
                                        </div>
                        
                                    </div>

                        </div>

                    </div>

                </div>

                </section>

        </React.Fragment>

 );
}

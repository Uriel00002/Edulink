import React from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/profile.css'
import { Apiurl } from "../services/apirest";
import axios from "axios";

class Profile extends React.Component{


    render(){

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


                <hr/>


                <div className="container bootstrap snippet">


                    <div className="row">
                        <div className="col-sm-10"><h1>Perfil</h1></div>
                        <div className="col-sm-2"><a href="/users" className="pull-right"><img title="profile image" className="img img-responsive" src={Logo}/></a></div>
                    </div>


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
                                        <li><a data-toggle="tab" href="#messages">Datos Escolares</a></li>
                                        <li><a data-toggle="tab" href="#settings">Otros</a></li>
                                    </ul>

                                    
                                    <div className="tab-content">

                                            <div className="tab-pane active" id="home">
                                                
                                                <hr/>
                                                <form className="form" action="##" method="post" id="registrationForm">
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="first_name"><h4>First name</h4></label>
                                                            <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="last_name"><h4>Last name</h4></label>
                                                            <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="phone"><h4>Phone</h4></label>
                                                            <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label for="mobile"><h4>Mobile</h4></label>
                                                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Email</h4></label>
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Location</h4></label>
                                                            <input type="email" className="form-control" id="location" placeholder="somewhere" title="enter a location"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password"><h4>Password</h4></label>
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password2"><h4>Verify</h4></label>
                                                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-12">
                                                                <br/>
                                                                <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                                                            </div>
                                                    </div>
                                                </form>
                                            
                                            </div> 

                                            <div className="tab-pane" id="messages">
                                            
                                            <hr/>
                                                <form className="form" action="##" method="post" id="registrationForm">
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="first_name"><h4>Nombre</h4></label>
                                                            <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="last_name"><h4>Apellidos</h4></label>
                                                            <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="phone"><h4>Telefono</h4></label>
                                                            <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label for="mobile"><h4>Direccion</h4></label>
                                                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Carrera</h4></label>
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Contraseña</h4></label>
                                                            <input type="email" className="form-control" id="location" placeholder="somewhere" title="enter a location"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password"><h4>Password</h4></label>
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password2"><h4>Verify</h4></label>
                                                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-12">
                                                                <br/>
                                                                <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                                                            </div>
                                                    </div>
                                                </form>

                                            </div>

                                            <div className="tab-pane" id="settings">
                                                    
                                                
                                            <hr/>
                                                <form className="form" action="##" method="post" id="registrationForm">
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="first_name"><h4>First name</h4></label>
                                                            <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="last_name"><h4>Last name</h4></label>
                                                            <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="phone"><h4>Phone</h4></label>
                                                            <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                                                        </div>
                                                    </div>
                                        
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label for="mobile"><h4>Mobile</h4></label>
                                                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Email</h4></label>
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="email"><h4>Location</h4></label>
                                                            <input type="email" className="form-control" id="location" placeholder="somewhere" title="enter a location"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password"><h4>Password</h4></label>
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        
                                                        <div className="col-xs-6">
                                                            <label for="password2"><h4>Verify</h4></label>
                                                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-12">
                                                                <br/>
                                                                <button className="btn btn-lg btn-success pull-right" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                                                            </div>
                                                    </div>
                                                </form>
                                            
                                            </div>
                        
                                    </div>

                        </div>

                    </div>



































                </div>

            </React.Fragment>

        );

    }

}   

export default Profile
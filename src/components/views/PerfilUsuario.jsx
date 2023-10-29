/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import "../../assets/css/App.css";
import { alertError, alertSuccess, storeEdulink } from "../../store/EdulinkStore";
import { encriptar_desencriptar } from "../../helpers/criptografia";
import { useNavigate } from "react-router-dom";
import { validateUserInView } from "../../helpers/funtionsGlobals";
import axios from "axios";
import { Apiurl } from "../../services/apirest";

export const PerfilUsuario = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const {user} = storeEdulink(state => state.auth)
    const auth = storeEdulink(state => state.auth);
    const setAuth = storeEdulink(state => state.setAuth);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const token = storeEdulink(state => state.auth.token);
    const setLoading = storeEdulink(state => state.setLoading)
    const [view, setView] = useState('info')
    const [formProfile, setFormProfile] = useState({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
    })

    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

    const handleChangePassword = async(e) => {
        e.preventDefault()
        setLoading(true)
        const username = user.username.trim()
        const current_password = e.target.current_password.value.trim()
        const new_password = e.target.password.value.trim()
        const confirmPassword = e.target.confirm_password.value.trim()
        if (!current_password || !new_password || !confirmPassword) {
            alertError('Todos los campos son obligatorios')
            setLoading(false)
            return
        }
        if (new_password !== confirmPassword) {
            alertError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }
        try{
            const resp = await axios.post(Apiurl + 'users/newpass/', {
                username,
                current_password,
                new_password,
            },{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            alertSuccess(resp.data.message)
        }catch(error){
            alertError(error.response.data.error || error)
            console.log(error)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }

    const handleEdit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const username = e.target.username.value.trim()
        const name = e.target.name.value.trim()
        const email = e.target.email.value.trim()
        if (!username || !name || !email) {
            alertError('Todos los campos son obligatorios')
            setLoading(false)
            return
        }
        try{
            const resp = await axios.put(Apiurl + 'users/'+user.id+'/', {
                username: username,
                name: name,
                email: email
            },{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    username: username,
                    name: name,
                    email: email,
                },
            })
            alertSuccess(resp.data.message)
            console.log(resp);
        }catch(error){
            if(error.response.data.error.includes('users_user_username_key')){
                alertError('Ya existe ese nombre de usuario, por favor elija otro')
            }else if(error.response.data.error.includes('users_user_email_key')){
                alertError('Ya existe ese email, por favor elija otro')
            } else alertError(error.response.data.error || error)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <React.Fragment>
            <section className="header_main">
                <Header name={"Perfil"} />
            </section>
            <section className="profile_main">
                <div className="user-details">
                    {
                        view == 'info' && <>
                        <h1>Datos del Usuario</h1>
                        <div className="detail">
                            <label for="nombre">Nombre:</label>
                            <span id="nombre">{user.name || 'Sin nombre'}</span>
                        </div>
                        <div className="detail">
                            <label for="email">Usuario:</label>
                            <span id="email">{user.username}</span>
                        </div>
                        <div className="detail">
                            <label for="email">Email:</label>
                            <span id="email">{user.email}</span>
                        </div>
                        <div className="detail">
                            <label for="email">Rol:</label>
                            <span id="email">{typeUser === 0 ? 'Tutor' : typeUser === 1 ? 'Estudiante' : 'Empleado'}</span>
                        </div>
                        </>
                    }
                    {
                        view == 'edit' && <form onSubmit={e => handleEdit(e)}>
                            <h1>Editar perfil</h1>
                            <div className="detail">
                                <label for="nombre">Usuario:</label>
                                <input type="text" name="username" id="username" value={formProfile.username} onChange={e => setFormProfile({...formProfile, username: e.target.value})} required/>
                            </div>
                            <div className="detail">
                                <label for="nombre">Nombre (completo):</label>
                                <input type="text" name="name" id="name" value={formProfile.name} onChange={e => setFormProfile({...formProfile, name: e.target.value})} required/>
                            </div>
                            <div className="detail">
                                <label for="text">Email:</label>
                                <input type="text" name="email" id="email" value={formProfile.email} onChange={e => setFormProfile({...formProfile, email: e.target.value})} required/>
                            </div>
                            <div className="detail">
                                <button type="submit" className="btn btn-outline-primary w-100 fs-4">Actualizar</button>
                            </div>
                        </form>
                    }
                    {
                        view == 'pass' && <form onSubmit={handleChangePassword}>
                            <h1>Cambiar contraseña</h1>
                            <div className="detail">
                                <label for="password">Contraseña actual:</label>
                                <input type="password" name="current_password" id="current_password" required/>
                            </div>
                            <div className="detail">
                                <label for="password">Nueva contraseña:</label>
                                <input type="password" name="password" id="password" required/>
                            </div>
                            <div className="detail">
                                <label for="password">Confirmar contraseña:</label>
                                <input type="password" name="confirm_password" id="confirm_password" required/>
                            </div>
                            <div className="detail">
                                <button type="submit" className="btn btn-outline-success w-100 fs-4">Cambiar contraseña</button>
                            </div>
                        </form>
                    }
                    
                    <div className="detail">
                        {
                            view == 'info' 
                            ? <>
                                <button onClick={() => setView('edit')} type="button" className="btn btn-outline-primary w-100 fs-4 mb-3">Actualizar perfil</button>
                                <button onClick={() => setView('pass')} type="button" className="btn btn-outline-success w-100 fs-4">Cambiar contraseña</button>
                            </>
                            : <>
                                <button onClick={() => setView('info')} type="button" className="btn btn-outline-dark w-100 fs-4 mb-3">Volver</button>
                            </>
                        }
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
        </React.Fragment>
    );
}
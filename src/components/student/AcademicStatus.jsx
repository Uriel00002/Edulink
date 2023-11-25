/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import WarriorUTT from '../../assets/img/guerreroUTT.png'
import { storeEdulink } from '../../store/EdulinkStore'
import { useNavigate } from 'react-router-dom'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { validateUserInView } from '../../helpers/funtionsGlobals'
import axios from 'axios'
import { Apiurl } from '../../services/apirest'


export const AcademicStatus = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const token = storeEdulink(state => state.auth.token);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const [data, setData] = useState()

    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');

        const init = async () => {
            try {
                const resp = await axios.get(Apiurl + 'me/student/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                })
                console.log(resp.data)
                setData(resp.data)
            } catch (error) {
                console.log(error)
            } 
        }
        init()
    }, [])

  return (
    <div>
       <section className="header_main">
                <Header name={"Estado Academico"} />
            </section>
            <section className="calif_main">
                <div className="student_info">{
                    data && 
                    <img src={data.profile?.photo} className='m-0' alt="Foto" />
                   }</div>
                <img src={WarriorUTT} alt="" />
                <div className="notes">
                    {/* <h4>Matricula: {data.student?.enrollment}</h4>
                    <p>Nombre: {data.student?.name.charAt(0).toUpperCase() + data.student?.name.slice(1)}</p>
                    <p>Apellido paterno: {data.student?.last_name_1.charAt(0).toUpperCase() + data.student?.last_name_1.slice(1)}</p>
                    <p>Apellido materno: {data.student?.last_name_2.charAt(0).toUpperCase() + data.student?.last_name_2.slice(1)}</p>
                    <p>Fecha de nacimiento: {new Date(data.profile?.birthdate).toDateString()}</p>
                    <p>CURP: {data.student?.curp.toUpperCase()}</p>
                    <p>Estado civil: {data.profile?.civil_status}</p>
                    <p>Carrera: {data.group[0]?.career}</p>
                    <p>Cuatrimestre actual: {data.group[0]?.period}</p>
                    <p>Grupo actual: {data.group[0]?.name}</p>
                    <p>Telefono: {data.profile?.personal_phone}</p>
                    <p>Generacion: {data.student?.generation}</p>
                    <p>Calle: {data.address?.street}</p>
                    <p>Numero: {data.address?.number_e}</p>
                    <p>Colonia: {data.address?.suburb}</p>
                    <p>Ciudad: {data.address?.city}</p>
                    <p>Estado: {data.address?.state}</p>
                    <p>Codigo postal: {data.address?.postal_code}</p> */}
                    {
                        data && 
                        <div className="w-100 h-100 p-3">
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>Matricula: {data.student?.enrollment}</td>
                                        <td>CURP: {data.student?.curp.toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre: {data.student?.name.charAt(0).toUpperCase() + data.student?.name.slice(1)}</td>
                                        <td>Fecha de nacimiento: {new Date(data.profile?.birthdate).toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellido paterno: {data.student?.last_name_1.charAt(0).toUpperCase() + data.student?.last_name_1.slice(1)}</td>
                                        <td>Carrera: {data.group[0]?.career}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellido materno: {data.student?.last_name_2.charAt(0).toUpperCase() + data.student?.last_name_2.slice(1)}</td>
                                        <td>Estado civil: {data.profile?.civil_status}</td>
                                    </tr>
                                    <tr>
                                        <td>Cuatrimestre actual: {data.group[0]?.period}</td>
                                        <td>Grupo actual: {data.group[0]?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Telefono: {data.profile?.personal_phone}</td>
                                        <td>Generacion: {data.student?.generation}</td>
                                    </tr>
                                    <tr>
                                        <td>Calle: {data.address?.street}</td>
                                        <td>Numero: {data.address?.number_e}</td>
                                    </tr>
                                    <tr>
                                        <td>Colonia: {data.address?.suburb}</td>
                                        <td>Ciudad: {data.address?.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado: {data.address?.state}</td>
                                        <td>Codigo postal: {data.address?.postal_code}</td>
                                    </tr>
                                </tbody>
                                <tr></tr>
                            </table>
                        </div>
                    }
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
    </div>
  )
}

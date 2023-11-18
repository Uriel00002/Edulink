/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Header from '../../templates/Header'
import Footer from '../../templates/Footer'
import { useNavigate } from 'react-router-dom';
import { encriptar_desencriptar } from '../../helpers/criptografia';
import { alertError, storeEdulink } from '../../store/EdulinkStore';
import { validateUserInView } from '../../helpers/funtionsGlobals';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

export const Reports = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const token = storeEdulink(state => state.auth.token);
    const setLoading = storeEdulink(state => state.setLoading);
    const [options, setOptions] = useState({})
    const [data, setData] = useState(null)
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
        getGroups();
        getEmployees();
        getSubjects();
        getClassrooms();
    }, [])

    const getGroups = async () => {
        try {
            const res = await axios.get(Apiurl + 'groups/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            setOptions(prev => ({...prev, groups: res.data}));
        } catch (error) {
            console.log(error);
        }
    }

    const getEmployees = async () => {
        try {
            const res = await axios.get(Apiurl + 'employees/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            setOptions(prev => ({...prev, employees: res.data}));
        } catch (error) {
            console.log(error);
        }
    }

    const getSubjects = async () => {
        try {
            const res = await axios.get(Apiurl + 'subjects/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            setOptions(prev => ({...prev, subjects: res.data}));
        } catch (error) {
            console.log(error);
        }
    }

    const getClassrooms = async () => {
        try {
            const res = await axios.get(Apiurl + 'classrooms/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            setOptions(prev => ({...prev, classrooms: res.data}));
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = new FormData(e.target);
        const params = Object.fromEntries(resp.entries());
        console.log(params);
        // const {matricula, nombre, promedio, edad, carrera, cuatrimestre, sexo, grupo, municipio, generacion} = params
        try {
            setLoading(true);
            const res = await axios.post(Apiurl + 'reports/academiccharge/', params, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            console.log(res.data);
            setData(res.data);
        } catch (error) {
            alertError(error.response.data.error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <>
    <section className="header_main">
        <Header name={"Reportes de carga horaria"} />
    </section>
    <section className="dash_main h-auto">
        <div className="dash_menu my-4 flex-column p-4">
            <form className='form w-75 row' onSubmit={handleSubmit}>
                <h1 className='mb-3 px-0 py-2'>Reportes SICAH</h1>
                <div className="form-floating mb-3 col-6">
                    <select className="form-select fs-5" id="grupo" name='grupo' style={{ height: '50px' }}>
                        <option value="">Seleccionar el grupo</option>
                        {
                            options?.groups?.map(group => <option key={group.id} value={group.id}>{group.name}</option>)
                        }
                    </select>
                    <label for="grupo">Grupo</label>
                </div>
                <div className="form-floating mb-3 col-6">
                    <select className="form-select fs-5" id="tutor" name='tutor' style={{ height: '50px' }}>
                        <option value="">Seleccionar el tutor</option>
                        {
                            options?.employees?.map(employee => <option key={employee.id} value={employee.id}>{employee.full_name + ' ' + employee.number}</option>)
                        }
                    </select>
                    <label for="tutor">Tutor</label>
                </div>
                <div className="form-floating mb-3 col-6">
                    <select className="form-select fs-5" id="profesor" name='profesor' style={{ height: '50px' }}>
                        <option value="">Seleccionar el profesor</option>
                        {
                            options?.employees?.map(employee => <option key={employee.id} value={employee.id}>{employee.full_name + ' ' + employee.number}</option>)
                        }
                    </select>
                    <label for="profesor">Profesor</label>
                </div>
                <div className="form-floating mb-3 col-6">
                    <select className="form-select fs-5" id="materia" name='materia' style={{ height: '50px' }}>
                        <option value="">Seleccionar la materia</option>
                        {
                            options?.subjects?.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)
                        }
                    </select>
                    <label for="materia">Materia</label>
                </div>
                <div className="form-floating mb-3 col-6">
                    <select className="form-select fs-5" id="salon" name='salon' style={{ height: '50px' }}>
                        <option value="">Seleccionar el salon</option>
                        {
                            options?.classrooms?.map(classroom => <option key={classroom.id} value={classroom.id}>{classroom.name}</option>)
                        }
                    </select>
                    <label for="salon">Salon</label>
                </div>
                <div className="form-floating mb-3 col-12">
                    <button className="btn btn-outline-dark fs-3 w-100">Buscar <i className="fa fa-solid fa-search"></i></button>
                </div>
            </form>
            {
                data && (
                    <div className="d-flex justify-content-around w-100">
                        <button className="btn btn-outline-success border-0 fs-1"><i className="fa fa-solid fa-file"></i></button>
                        {/* <button className="btn btn-outline-primary border-0 fs-1"><i className="fa fa-solid fa-chart-area"></i></button> */}
                    </div>
                )
            }
            <div className='table-responsive row col-12'>
                <table className="table table-bordered w-100">
                    <thead>
                        <tr>
                            <th>Grupo/s</th>
                            <th>Tutor/es</th>
                            <th>Asignacion/es</th>
                            <th>Salon/es</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && 
                            Array.isArray(data) 
                            ? data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.group}</td>
                                    <td>{item.tutor}</td>
                                    <td>{item.assignments}</td>
                                    <td>{item.classrooms}</td>
                                    <td>
                                        <button className="btn btn-outline-primary border-0 fs-1"><i className="fa fa-solid fa-file"></i></button>
                                    </td>
                                </tr>
                            ))
                            : (<tr>
                                <td colSpan={5}>{data?.message}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <section className="footer_main">
        <Footer />
    </section>
</>
  )
}

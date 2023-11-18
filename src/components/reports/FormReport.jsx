import React, { useEffect, useState } from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import axios from 'axios'
import { Apiurl } from '../../services/apirest'
import { alertError, storeEdulink } from '../../store/EdulinkStore'
import { generatePDF } from '../../helpers/reportsPDF'
import { Diagrama } from './Diagrama'

export const FormReport = ({nameView, permissions={c:[],r:[],rbid:[],u:[],d:[]}, }) => {
    const token = storeEdulink(state => state.auth.token)
    const setLoading = storeEdulink(state => state.setLoading)
    const [data, setData] = useState(null)
    const [careers, setCareers] = useState(null)
    const [chart, setChart] = useState(false)

    useEffect(() => {
        getCareers()
    }, [])

    const getCareers = async () => {
        try {
            const res = await axios.get(Apiurl + 'careers/',{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setCareers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const resp = new FormData(e.target)
        const params = Object.fromEntries(resp.entries())
        console.log(params);
        // const {matricula, nombre, promedio, edad, carrera, cuatrimestre, sexo, grupo, municipio, generacion} = params
        try{
            setLoading(true)
            const res = await axios.post(Apiurl + 'reports/students/', params, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setData(res.data)
            console.log(res.data)
        } catch (error) {
            alertError(error.response.data.error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
  return (
    <React.Fragment>

            <section className="header_main">
                <Header name={"Reportes"} />
            </section>
            <section className="dash_main h-auto">
                <div className="dash_menu my-4 flex-column p-4">
                    <form className='form w-75 row' onSubmit={handleSubmit}>
                        <h1 className='mb-3 px-0 py-2'>Reportes de estudiantes</h1>
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control fs-5" id="matricula" name='matricula' placeholder="-" style={{ height: '50px' }} />
                            <label for="matricula">Matricula</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control fs-5" id="nombre" name='nombre' placeholder="-" style={{ height: '50px' }} />
                            <label for="nombre">Nombre</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="number" className="form-control fs-5" id="promedio" name='promedio' placeholder="-" style={{ height: '50px' }} />
                            <label for="promedio">Promedio</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="number" className="form-control fs-5" id="edad" name='edad' placeholder="-" style={{ height: '50px' }} />
                            <label for="edad">Edad</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <select className="form-select fs-5" id="carrera" name='carrera' style={{ height: '50px' }}>
                                <option value="">Seleccionar una carrera</option>
                                {careers?.map(career => (
                                    <option value={career.id}>{career.name}</option>
                                ))}
                            </select>
                            <label for="carrera">Carrera</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="number" className="form-control fs-5" id="cuatrimestre" name='cuatrimestre' placeholder="-" style={{ height: '50px' }} />
                            <label for="cuatrimestre">Cuatrimestre</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <select className="form-select fs-5" id="sexo" name='sexo' style={{ height: '50px' }}>
                                <option value="">Seleccionar un sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            <label for="sexo">Sexo</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control fs-5" id="grupo" name='grupo' placeholder="-" style={{ height: '50px' }} />
                            <label for="grupo">Grupo</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control fs-5" id="municipio" name='municipio' placeholder="-" style={{ height: '50px' }} />
                            <label for="municipio">Municipio</label>
                        </div>
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control fs-5" id="generacion" name='generacion' placeholder="-" style={{ height: '50px' }} />
                            <label for="generacion">Generacion</label>
                        </div>
                        <div className="form-floating mb-3 col-12">
                            <button className="btn btn-outline-dark fs-3 w-100">Buscar <i className="fa fa-solid fa-search"></i></button>
                        </div>
                    </form>
                    {
                        data && (
                            <div className="d-flex justify-content-around w-100">
                                <button className="btn btn-outline-success border-0 fs-1" onClick={() => generatePDF(data,'reporte_estudiantil')}><i className="fa fa-solid fa-file"></i></button>
                                {/* <button className="btn btn-outline-primary border-0 fs-1" onAbort={() => setChart(!chart)}><i className="fa fa-solid fa-chart-area"></i></button> */}
                            </div>
                        )
                    }
                    <div className='table-responsive row col-12'>
                        <table className="table table-bordered w-100">
                            <thead>
                                <tr>
                                    <th>Matricula</th>
                                    <th>Nombre</th>
                                    <th>Apellido paterno</th>
                                    <th>Apellido materno</th>
                                    <th>Carrera</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Cuatrimestre</th>
                                    <th>Grupo</th>
                                    <th>Municipio</th>
                                    <th>Generacion</th>
                                    <th>Promedio actual</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map(student => {
                                        return <tr>
                                            <td>{student.matricula}</td>
                                            <td>{student.nombre}</td>
                                            <td>{student.paterno}</td>
                                            <td>{student.materno}</td>
                                            <td>{student.carrera}</td>
                                            <td>{student.edad}</td>
                                            <td>{student.sexo}</td>
                                            <td>{student.cuatrimestre}</td>
                                            <td>{student.grupo}</td>
                                            <td>{student.municipio}</td>
                                            <td>{student.generacion}</td>
                                            <td>{student.promedio}</td>
                                            <td><button className="btn btn-outline-danger" onClick={(e)=>{
                                                e.preventDefault()
                                                setData(data.filter(item => item.id !== student.id))
                                            }}>Eliminar de la lista</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
  )
}

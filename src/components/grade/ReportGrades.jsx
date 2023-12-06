/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Header from '../../templates/Header'
import Footer from '../../templates/Footer'
import { useNavigate } from 'react-router-dom';
import { encriptar_desencriptar } from '../../helpers/criptografia';
import { alertError, alertSuccess, storeEdulink } from '../../store/EdulinkStore';
import { validateUserInView } from '../../helpers/funtionsGlobals';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import { generatePDF } from '../../helpers/reportsPDF';
import WarriorUTT from '../../assets/img/guerreroUTT.png'

export const ReportGrades = ({ permissions = { c: [], r: [], rbid: [], u: [], d: [] } }) => {
    const navigate = useNavigate();
    const token = storeEdulink(state => state.auth.token);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const setLoading = storeEdulink(state => state.setLoading);
    const [data, setData] = useState({update:[],search:[]})
    const [groups, setGroups] = useState([])
    const [subjects, setSubjects] = useState([])    

    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])
    
    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const resp = await axios.get(Apiurl + 'grades/myclass/',{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
              }
            })
            setGroups(resp.data.groups)
            setSubjects(resp.data.subjects)
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false);
          }
        }
        init();
    }, [])

    const handleSearch = async(e) => {
      e.preventDefault();
      const resp = new FormData(e.target);
      const params = Object.fromEntries(resp.entries());
      console.log(params);
      try {
        setLoading(true);
        const res = await axios.post(Apiurl + 'grades/mygs/', params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
          }
        })
        console.log(res.data);
        const resp = res.data?.sort((a, b) => {
          const nameA = a.student.split(' - ')[1].toLowerCase();
          const nameB = b.student.split(' - ')[1].toLowerCase();

          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
        })
        setData({
          ...data,
          update: {
            ...data.update,
            group: params.group,
            subject: params.subject,
            data: resp
          },
          search: resp
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
        <section className="header_main">
            <Header name={"Calificaciones grupales"} />
        </section>
        <section className="calif_main">
            <div className="student_info">
                <div className="d-flex flex-column gap-3">
                    <div className="">
                    </div>
                </div>
            </div>
            <img src={WarriorUTT} alt="" />
            <div className="notes">
                <div className="d-flex flex-column gap-3 p-3">
                    <form onSubmit={handleSearch} className="w-100 d-flex flex-column gap-3">
                    <select name="group" id="group">
                        <option value="">Seleccione una opción</option>
                        {
                        groups.map((group, index) => (
                            <option key={index} value={group.split(' - ')[0]}>{group.split(' - ')[1]}</option>
                        ))
                        }
                    </select>
                    <select name="subject" id="subject">
                        <option value="">Seleccione una opción</option>
                        {
                        subjects.map((subject, index) => (
                            <option key={index} value={subject.split(' - ')[0]}>{subject.split(' - ')[1]}</option>
                        ))
                        }
                    </select>
                    <button className="btn btn-primary">Buscar</button>
                    </form>
                    {
                        data?.search?.length > 0 && (
                            <div className="d-flex justify-content-around w-100">
                                <button className="btn btn-outline-success border-0 fs-1" onClick={() => generatePDF(data.search.map(student => {
                                    return {
                                        Estudiante: student.student.split(' - ')[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                                        "Parcial 1": student.partial_1 == 0 ? 1 : student.partial_1,
                                        "Parcial 2": student.partial_2 == 0 ? 1 : student.partial_2,
                                        "Parcial 3": student.partial_3 == 0 ? 1 : student.partial_3,
                                        "Parcial 4": student.partial_4 == 0 ? 1 : student.partial_4,
                                        Promedio: (student.partial_1 + student.partial_2 + student.partial_3 + student.partial_4) / 4
                                    }
                                }), 
                                `CALIFICACIONES GRUPALES - ${groups.find(group => group.split(' - ')[0] == data.update.group).split(' - ')[1]} - ${subjects.find(subject => subject.split(' - ')[0] == data.update.subject).split(' - ')[1]}`
                                )}><i className="fa fa-solid fa-file"></i></button>
                                {/* <button className="btn btn-outline-primary border-0 fs-1"><i className="fa fa-solid fa-chart-area"></i></button> */}
                            </div>
                        )
                    }
                    {
                    data?.search?.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Parcial 1</th>
                            <th>Parcial 2</th>
                            <th>Parcial 3</th>
                            <th>Parcial 4</th>
                            <th>Promedio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.search?.map((student, index) => (
                            <tr key={index}>
                                <td>{student.student.split(' - ')[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                <td>{student.partial_1 == 0 ? 1 : student.partial_1}</td>
                                <td>{student.partial_2 == 0 ? 1 : student.partial_2}</td>
                                <td>{student.partial_3 == 0 ? 1 : student.partial_3}</td>
                                <td>{student.partial_4 == 0 ? 1 : student.partial_4}</td>
                                <td>{(student.partial_1 + student.partial_2 + student.partial_3 + student.partial_4)/4}</td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </section>
        <section className="footer_main">
            <Footer />
        </section>

    </>
  )
}

/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Apiurl } from "../../services/apirest";
import WarriorUTT from '../../assets/img/guerreroUTT.png'
import '../../assets/css/calif.css'
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateUserInView } from "../../helpers/funtionsGlobals";
import { encriptar_desencriptar } from "../../helpers/criptografia";
import { storeEdulink } from "../../store/EdulinkStore";


export const Calif = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const token = storeEdulink(state => state.auth.token);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const [data, setData] = useState([])

    useEffect(() => {
        getCalif();
    }, [])
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

    const getCalif = async () => {
        try {
            const resp = await axios.get(Apiurl + 'grades/student/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                }
            })
            const formated = resp.data.sort((a, b) => parseInt(b.period) - parseInt(a.period)).reduce((acc, obj) => {
                const existingGroup = acc.find(group => group[0].group_name === obj.group_name && group[0].period === obj.period);
                if (existingGroup) {
                  existingGroup.push(obj);
                } else {
                  acc.push([obj]);
                }
                return acc;
            }, []);
            console.log(formated);
            setData(formated)
            // setData(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <React.Fragment>

            <section className="header_main">
                <Header name={"Calificaciones"} />
            </section>
            <section className="calif_main">
                <div className="student_info"></div>
                <img src={WarriorUTT} alt="" />
                <div className="notes">
                    {
                        data && data.map((subData, index) => {
                            return (
                                <table key={index} className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Cuatrimistre: </th>
                                            <th>{subData[0].period}</th>
                                            <th>{subData[0].group_name}</th>
                                        </tr>
                                        <tr>
                                            <th>Materias</th>
                                            <th>Parcial 1</th>
                                            <th>Parcial 2</th>
                                            <th>Parcial 3</th>
                                            <th>Parcial 4</th>
                                            <th>Promedio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subData.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.subject.split('-')[1]}</td>
                                                        <td>{data.partial_1}</td>
                                                        <td>{data.partial_2}</td>
                                                        <td>{data.partial_3}</td>
                                                        <td>{data.partial_4}</td>
                                                        <td>{(data.partial_1 + data.partial_2 + data.partial_3 + data.partial_4)/4}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <th>Promedio cuatrimestral:</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>{
                                                [1].map((data, index) => {
                                                    let promerio = 0
                                                    subData.map((data, index) => {
                                                        promerio += (data.partial_1 + data.partial_2 + data.partial_3 + data.partial_4)/4
                                                    })
                                                    return promerio/subData.length
                                                })
                                            }</th>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
    );
}

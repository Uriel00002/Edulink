import React, { useEffect } from "react";
import Header from "../templates/Header"
import { Apiurl } from "../services/apirest";
import Img from '../assets/img/wallpaper.png'
import '../assets/css/calif.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export const Calif = () => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        getCalif();
    }, [])

    const getCalif = async () => {
        try {
            const resp = await axios.get(Apiurl + 'grader/student?token=' + token)
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }

    return(

        <React.Fragment>

            <section className="calif">
                 
                <Header></Header>

                <div className="calif_content">

                    <div className="user_info">
                        <div className="user_image">
                            <img className="image_profile" src={Img}/>
                        </div>
                        <div className="user_data">
                            <h1>Uriel Lopez Aquino</h1>
                            <h2>20202ITID018</h2>
                            <h3>10.0</h3>
                        </div>
                    </div>

                    <div className="tables_info table-responsive">
                        <table className="table_cuatri table w-100">
                            <tr>
                                <td className="t_subject">Materia</td>
                                <td className="t_profesor_name">Profesor</td>
                                <td className="t_partial">P1</td>
                                <td className="t_partial">P2</td>
                                <td className="t_partial">P3</td>
                                <td className="t_partial">P4</td>
                                <td className="t_prom">Prom</td>
                            </tr>
                            {
                                [1,2,3,4,5,6,7,8,9,10].map((item, index) => (
                                    <tr>
                                        <td className="t_subject">{item.subject}</td>
                                        <td className="t_profesor_name">{item.profesor_name}</td>
                                        <td className="t_partial">{item.partial1}</td>
                                        <td className="t_partial">{item.partial2}</td>
                                        <td className="t_partial">{item.partial3}</td>
                                        <td className="t_partial">{item.partial4}</td>
                                        <td className="t_prom">{item.prom}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>

                </div>

            </section>

        </React.Fragment>
    );
}

import React from "react";
import Header from "../templates/Header"
import { Apiurl } from "../services/apirest";
import Img from '../assets/img/wallpaper.png'
import '../assets/css/calif.css'
import { useNavigate } from 'react-router-dom';


export const Calif = () => {
    const history = useNavigate();

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

                    <div className="tables_info">
                        <table className="table_cuatri">
                            <tr>
                                <td className="t_subject">Materia</td>
                                <td className="t_profesor_name">Profesor</td>
                                <td className="t_partial">P1</td>
                                <td className="t_partial">P2</td>
                                <td className="t_partial">P3</td>
                                <td className="t_partial">P4</td>
                                <td className="t_prom">Prom</td>
                            </tr>
                            <tr>
                                <td className="t_subject"></td>
                                <td className="t_profesor_name"></td>
                                <td className="t_partial"></td>
                                <td className="t_partial"></td>
                                <td className="t_partial"></td>
                                <td className="t_partial"></td>
                                <td className="t_prom"></td>
                            </tr>
                        </table>
                    </div>

                </div>

            </section>

        </React.Fragment>
    );
}

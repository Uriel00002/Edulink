/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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


export const UpdateCalif = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const token = storeEdulink(state => state.auth.token);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const parcial_mes = [
      {
        parcial: 1,
        mes: [0,4,8]//enero,mayo,septiembre
      },
      {
        parcial: 2,
        mes: [1,5,9]//febrero,junio,octubre
      },
      {
        parcial: 3,
        mes: [2,6,10]//marzo,julio,noviembre
      },
      {
        parcial: 4,
        mes: [3,7,11]//abril,agosto,diciembre
      }
    ]
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])
    

    return (

        <React.Fragment>

            <section className="header_main">
                <Header name={"Calificaciones grupales"} />
            </section>
            <section className="calif_main">
                <div className="student_info">
                    <div className="d-flex flex-column gap-3">
                      <div className="">
                        Calificaciones de: <span></span>
                        En las materias de: <span></span>
                      </div>
                    </div>
                </div>
                <img src={WarriorUTT} alt="" />
                <div className="notes">
                    <div className="d-flex flex-column gap-3">
                      <select name="group" id="group">
                      </select>
                      <select name="subject" id="subject">
                      </select>
                      <button className="btn btn-primary">Buscar</button>
                      <table></table>
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
    );
}

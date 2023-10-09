import React, { useEffect } from "react";
import { Apiurl } from "../../services/apirest";
import WarriorUTT from '../../assets/img/guerreroUTT.png'
import '../../assets/css/calif.css'
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
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

    return (

        <React.Fragment>

            <section className="header_main">
                <Header name={"Calificaciones"} />
            </section>
            <section className="calif_main">
                <div className="student_info"></div>
                <img src={WarriorUTT} alt="" />
                <div className="notes"></div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
    );
}

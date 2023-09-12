import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import "../../assets/css/carreer.css";
import { Apiurl } from "../../services/apirest";
import { storeEdulink } from "../../store/EdulinkStore";

export const Register_buildings = () => {
    const token = storeEdulink(state => state.auth.token);

    const [fields, setFields] = useState(null)
    const [data, setData] = useState({
        //name, type, verbose
    })

    useEffect(() => {
        getFields();
    }, [])

    useEffect(() => {
        console.log(fields);
        fields?.map(field => {
            setData({
                ...data,
                form: {
                    ...data.form,
                    [field.name]: ""
                }
            })
        })
    }
        , [fields])

    const getFields = async () => {
        try {
            const response = await axios.get(Apiurl + 'buildings/fields?token=' + token, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            setFields(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'buildings/',
                data.form,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            console.log(response.data);
        } catch (error) {

        }
    }

    return (
        <Fragment>


            <section className="header_main">
                <Header name={"Edificios"} />
            </section>

            <section className="carreer_building_main">


                <form onSubmit={handleSubmit}>

                    {
                        fields?.map((field, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={field.name}>{field.verbose}</label>
                                    <input type={
                                        field.type === "DateField" ? 'date' : 'text'
                                    } name={field.name} id={field.name} onChange={(e) => setData({
                                        ...data,
                                        form: {
                                            ...data.form,
                                            [field.name]: e.target.value
                                        }
                                    })} />
                                </div>
                            )
                        })
                    }
                    <button type='submit'>Enviar</button>
                </form>

            </section>

            <section className="footer_main">
                <Footer />
            </section>
        </Fragment>
    )
};
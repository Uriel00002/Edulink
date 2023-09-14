import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import "../../assets/css/carreer.css";
import { Apiurl } from '../../services/apirest';
import { storeEdulink } from '../../store/EdulinkStore';
import { CRUD } from '../../templates/CRUD';

export const Register_career = () => {
    const token = storeEdulink(state => state.auth.token);

    const [fields, setFields] = useState(null)
    const [data, setData] = useState({
        //name, type, verbose
    })



    useEffect(() => {
        getFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [fields])

    const getFields = async () => {
        try {
            const response = await axios.get(Apiurl + 'careers/fields?token=' + token, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            setFields(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'careers/',
                data.form,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } }
            )
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Fragment>


            <CRUD name={"Carreras"} fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} />

        </Fragment>

    )
}

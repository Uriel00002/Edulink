import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Apiurl } from "../../services/apirest";
import { storeEdulink } from "../../store/EdulinkStore";
import { CRUD } from "../../templates/CRUD";

export const Register_categories = () =>{
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
            const response = await axios.get(Apiurl + 'categories/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setFields(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'categories/',
                data.form,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>

            <CRUD name={"Categorias"} fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} />
        </Fragment>
    )
}
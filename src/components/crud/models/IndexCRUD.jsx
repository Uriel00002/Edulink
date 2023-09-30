/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Apiurl } from '../../../services/apirest';
import { alertError, alertSuccess, storeEdulink } from '../../../store/EdulinkStore';
import { CRUD } from '../../../templates/CRUD';

export const IndexCRUD = ({nameAPI='', nameView=''}) => {
    const token = storeEdulink(state => state.auth.token);

    const [fields, setFields] = useState(null)
    const [data, setData] = useState({
        //name, type, verbose
    })
    const [view, setView] = useState('v')

    useEffect(() => {
        switch (view) {
            case 'v':
                getCareers();
                break;

            case 'r':
                getFields();
                break;
        
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view])
    
    useEffect(() => {
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
            const response = await axios.get(Apiurl + nameAPI + '/fields?token=' + token, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            setFields(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCareers = async() => {
        try {
            const response = await axios.get(Apiurl + nameAPI + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + nameAPI + '/',
                data.form,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } }
            )
            alertSuccess('Registro exitoso');
            console.log(response.data);
        } catch (error) {
            alertError('Error: ' + error);
            console.log(error);
        }
    }


    return (
        <Fragment>

            <CRUD name={nameView} fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} view={view} setView={setView} />

        </Fragment>

    )
}

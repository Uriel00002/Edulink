/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Apiurl } from '../../../services/apirest';
import { alertError, alertSuccess, storeEdulink } from '../../../store/EdulinkStore';
import { CRUD } from '../../../templates/CRUD';
import { useLocation } from 'react-router-dom';

export const IndexCRUD = ({nameAPI='', nameView=''}) => {
    const {search} = useLocation();
    const token = storeEdulink(state => state.auth.token);

    const [fields, setFields] = useState(null)
    const [data, setData] = useState({
        //name, type, verbose
        form: {
            
        }
    })
    const [view, setView] = useState('v')
    const [idItem, setIdItem] = useState(null)
    const [action, setAction] = useState('ver')

    useEffect(() => {
        switch (action) {
            case 'ver':
                setView('v')
                break

            case 'registrar':
                setView('r')
                break

            default:
                break
        }
    }, [action, setView])
    
    useEffect(() => {
      if (search){
        const params = new URLSearchParams(search);
        setIdItem(params.get('id'));
      }
    }, [search]);

    useEffect(() => {
        if (idItem) {
            setTimeout(() => {
                getDataById();
            }, 1000);
            setAction('registrar');
        }
        console.log(data);
    }, [idItem])

    useEffect(() => {
        switch (view) {
            case 'v':
                getData();
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

    const getDataById = async () => {
        try {
            const response = await axios.get(Apiurl + nameAPI + '/' + idItem + '/?token=' + token, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            setData({
                ...data,
                form: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async() => {
        try {
            const response = await axios.get(Apiurl + nameAPI + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setData({
                ...data,
                data: response.data
            })
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
            <CRUD name={nameView} fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} view={view} setView={setView} action={action} setAction={setAction} />
        </Fragment>
    )
}

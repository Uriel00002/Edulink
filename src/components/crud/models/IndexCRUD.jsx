/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Apiurl } from '../../../services/apirest';
import { alertError, alertSuccess, storeEdulink } from '../../../store/EdulinkStore';
import { CRUD } from '../../../templates/CRUD';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { encriptar_desencriptar } from '../../../helpers/criptografia';
import { validateUserInView } from '../../../helpers/funtionsGlobals';

export const IndexCRUD = ({nameAPI='', nameView='', permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const {search} = useLocation();
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const token = storeEdulink(state => state.auth.token);
    const setLoading = storeEdulink(state => state.setLoading)

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
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

    useEffect(() => {
        switch (action) {
            case 'ver':
                setView('v')
                break

            case 'registrar':
                setView('r')
                break

            case 'reportes':
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
            activateLoading();
            setTimeout(() => {
                getDataById();
            }, 2000);
            setAction('registrar');
        }
    }, [idItem])

    useEffect(() => {
        switch (view) {
            case 'v':
                getData();
                activateLoading();
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

    const activateLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const getFields = async () => {
        try {
            const response = await axios.get(Apiurl + nameAPI + '/fields', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
            setFields(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataById = async () => {
        if(permissions.rbid.includes(typeUser)){
            try {
                const response = await axios.get(Apiurl + nameAPI + '/' + idItem + '/', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
                setData({
                    ...data,
                    form: response.data
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            alertError('No tiene permisos para ver los datos.');
            setLoading(false);
        }
    }

    const getData = async() => {
        if(permissions.r.includes(typeUser)){
            try {
                const response = await axios.get(Apiurl + nameAPI + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
                setData({
                    ...data,
                    data: response.data
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            alertError('No tiene permisos para ver los datos.');	
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(idItem){
            if(permissions.u.includes(typeUser)){
                try {
                    const response = await axios.put(Apiurl + nameAPI + '/' + idItem + '/',
                        data.form,
                        { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } }
                    )
                    alertSuccess('Actualización exitosa');
                    console.log(response.data);
                    setLoading(false);
                } catch (error) {
                    alertError('Error: ' + error);
                    console.log(error);
                }
            }else{
                alertError('No tiene permisos para realizar esta operación.');
                setLoading(false);
            }
        }else{
            if(permissions.c.includes(typeUser)){
                try {
                    const response = await axios.post(Apiurl + nameAPI + '/',
                        data.form,
                        { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } }
                    )
                    alertSuccess('Registro exitoso');
                    console.log(response.data);
                    setLoading(false);
                } catch (error) {
                    alertError('Error: ' + error);
                    console.log(error);
                }
            }else{
                alertError('No tiene permisos para realizar esta operación.');
                setLoading(false);
            }
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        if(permissions.d.includes(typeUser)){
            setLoading(true);
        Swal.fire({
            title: 'Eliminar?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(Apiurl + nameAPI + '/' + id + '/',
                        { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
                    alertSuccess(response.data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    console.log(response.data);
                    setLoading(false);
                } catch (error) {
                    alertError('Error: ' + error);
                    console.log(error);
                }
            }
        })
        }else{
            alertError('No tiene permisos para eliminar');
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <CRUD permissions={permissions} typeUser={typeUser} name={nameView} fields={fields} handleSubmit={handleSubmit} handleDelete={handleDelete} setData={setData} data={data} view={view} setView={setView} action={action} setAction={setAction} setIdItem={setIdItem} />
        </Fragment>
    )
}

/* eslint-disable eqeqeq */
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

    function eliminarTextoDespuesDelGuion(cadena) {
        const partes = cadena.split(' - ');
        return partes.length > 0 ? partes[0] : cadena;
    }
    function procesarPropiedad(prop) {
        if (typeof prop === 'string') {
            return eliminarTextoDespuesDelGuion(prop);
        } else if (Array.isArray(prop)) {
            return prop.map(el => {
                if (typeof el === 'string') {
                    return eliminarTextoDespuesDelGuion(el);
                }
                return el;
            });
        }
        return prop;
    }

    const getDataById = async () => {
        if(permissions.rbid.includes(typeUser)){
            try {
                const response = await axios.get(Apiurl + nameAPI + '/' + idItem + '/', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } })
                let formatedData = response.data;
                for (var key in formatedData) {
                    formatedData[key] = procesarPropiedad(formatedData[key]);
                }
                setData({
                    ...data,
                    form: formatedData
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
        let prueba = false;
        e.preventDefault();
        setLoading(true);
        let formData
        if(data.form.photo instanceof File || data.form.photo instanceof Blob) {
            formData = new FormData();
            for (const key in data.form) {
                console.log(key, data.form[key]);
                formData.append(key, data.form[key]);
            }
        } else {
            formData = data.form;
            if (formData.assignments && typeof formData.assignments === 'object') {
                formData.assignments = JSON.stringify(formData.assignments).trim();
            }
            delete formData.photo;
            console.log(formData);
        }
        if (prueba == false) {
            if(idItem){
                if(permissions.u.includes(typeUser)){
                    try {
                        const response = await axios.put(Apiurl + nameAPI + '/' + idItem + '/',
                            formData,
                            { headers: { 'Authorization': 'Token ' + token } }
                        )
                        alertSuccess('Actualización exitosa');
                        // setTimeout(() => {
                        //     window.location.reload();
                        // }, 3000);
                        console.log(response.data);
                    } catch (error) {
                        let errorMessage = ''
                        if (error.response.data.error) {
                            errorMessage = error.response.data.error
                        }else if (error.response.data) {
                            Object.keys(error.response.data).forEach(key => {
                                errorMessage += error.response.data[key] + '\n'  
                            })
                        }else{
                            errorMessage = error.message
                        }
                        alertError('Error: ' + errorMessage);
                        console.log(error);
                    } finally {
                        setLoading(false);
                    }
                }else{
                    alertError('No tiene permisos para realizar esta operación.');
                    setLoading(false);
                }
            }else{
                if(permissions.c.includes(typeUser)){
                    try {
                        const response = await axios.post(Apiurl + nameAPI + '/',
                            formData,
                            { headers: { 'Authorization': 'Token ' + token } }
                        )
                        alertSuccess('Registro exitoso');
                        console.log(response.data);
                        // setTimeout(() => {
                        //     window.location.reload();
                        // }, 3000);
                    } catch (error) {
                        let errorMessage = ''
                        if (error.response.data.error) {
                            errorMessage = error.response.data.error
                        }else if (error.response.data) {
                            Object.keys(error.response.data).forEach(key => {
                                errorMessage += error.response.data[key] + '\n'  
                            })
                        }else{
                            errorMessage = error.message
                        }
                        alertError('Error: ' + errorMessage);
                        console.log(error);
                    } finally {
                        setLoading(false);
                    }
                }else{
                    alertError('No tiene permisos para realizar esta operación.');
                    setLoading(false);
                }
            }
        }else{
            setLoading(false);
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
                    } catch (error) {
                        let errorMessage = ''
                        if (error.response.data.error) {
                            errorMessage = error.response.data.error
                        }else if (error.response.data) {
                            Object.keys(error.response.data).forEach(key => {
                                errorMessage += error.response.data[key] + '\n'  
                            })
                        }else{
                            errorMessage = error.message
                        }
                        alertError('Error: ' + errorMessage);
                        console.log(error);
                    } finally {
                        setLoading(false);
                    }
                } else setLoading(false);
            })
        }else{
            alertError('No tiene permisos para eliminar');
            setLoading(false);
        }
    }

    const createAccount = async(idStudent,type,forType=null) => {
        setLoading(true);
        try {
            const response = await axios.post(Apiurl + 'users/createAccount/',
            {
                id: idStudent,
                type: type,
                forType: forType
            },
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            console.log(response);
            alertSuccess('Registro exitoso de datos para cuenta');
            navigator.clipboard.writeText("Usuario: " + response.data.account.username + "\nContraseña: " + response.data.account.password)
            .then(function() {
                alert('Credenciales de acceso copiadas al portapapeles');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(function(err) {
                alert('Error al copiar al portapapeles, intentando de nuevo...');
                navigator.clipboard.writeText("Usuario: " + response.data.account.username + "\nContraseña: " + response.data.account.password)
                .then(function() {
                    alert('Credenciales de acceso copiadas al portapapeles');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(function(err) {
                    alert('Error al copiar al portapapeles, ...');
                    createAccount(idStudent,type,forType);
                });
            });
            // console.log('Credenciales de acceso:\nUsuario: ' + response.data.account.username + '\nContraseña: ' + response.data.account.password);

            setLoading(false);
        } catch (error) {
            alertError(error.response.data.error)
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getTeachers = async() => {
        try {
            const users = await axios.get(Apiurl + 'users/',{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            let teachers = users.data.filter(user => user.type == '2')
            let teachersIds = teachers.map(user => user.id.toString())
            const employees = await axios.get(Apiurl + 'employees/',{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            teachers = employees.data.filter(employee => teachersIds.includes(employee.user.split(' - ')[0]))
            teachers = teachers.map(employee => {
                return {
                    id: employee.id,
                    name: employee.full_name + ' ' + employee.number,
                }
            }); 
            return teachers 
        } catch (error) {
            console.log(error);
        }
    }

    const getSubjects = async() => {
        try {
            const subjects = await axios.get(Apiurl + 'subjects/',{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            return subjects.data
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <CRUD permissions={permissions} typeUser={typeUser} name={nameView} fields={fields} handleSubmit={handleSubmit} 
                handleDelete={handleDelete} setData={setData} data={data} view={view} setView={setView} action={action} 
                setAction={setAction} setIdItem={setIdItem} createAccount={createAccount} getTeachers={getTeachers} getSubjects={getSubjects} />
        </Fragment>
    )
}

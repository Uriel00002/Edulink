/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../../templates/Header"
import Logo from '../../assets/img/logo.png'
import '../../assets/css/profile.css'
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import { alertSuccess, storeEdulink } from "../../store/EdulinkStore";
import { useNavigate } from "react-router-dom";
import { encriptar_desencriptar } from "../../helpers/criptografia";
import { validateUserInView } from "../../helpers/funtionsGlobals";

export const Register = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const token = storeEdulink(state => state.auth.token);
    const [dataType, setDataType] = useState('#home')
    const [fields, setFields] = useState(null)
    const [studentId, setStudentId] = useState(null)
    const [count, setCount] = useState(0)
    const [photo, setPhoto] = useState("http://ssl.gstatic.com/accounts/ui/avatar_2x.png")
    const [data, setData] = useState({
        //name, type, verbose
    })
    const [careers, setCareers] = useState(null)

    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

    useEffect(() => {
        switch (dataType) {
            case '#home':
                getDataCareers();
                getFieldsPersonal();
                break;
            case '#school_info':
                getFieldsSchool();
                break;
            case '#fam_data':
                getFieldsTutor();
                break;
            default:
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataType])
    const getFieldsPersonal = async() => {
        try {
            const response1 = await axios.get(Apiurl + 'students/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            const response2 = await axios.get(Apiurl + 'profiles/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            const response3 = await axios.get(Apiurl + 'addresses/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})            
            
            setFields([].concat(response1.data).concat(response2.data).concat(response3.data))
        } catch (error) {
            console.log(error);
        }
    }
    const getFieldsSchool = async() => {
        try {
            const response = await axios.get(Apiurl + 'highschools/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setFields(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getFieldsTutor = async() => {
        try {
            const response = await axios.get(Apiurl + 'parents/fields?token=' + token, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setFields(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDataCareers = async() => {
        try {
            const response = await axios.get(Apiurl + 'careers/',{headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            console.log(response.data);
            setCareers(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitPersonal = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'students/',
            {
                career: data.form.career,
            },
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setStudentId(response.data.id)
            ///////////////////////////
            const formData = new FormData();
            formData.append('student', studentId);
            formData.append('photo', data.form.photo);
            formData.append('name', data.form.name);
            formData.append('last_name_1', data.form.last_name_1);
            formData.append('last_name_2', data.form.last_name_2);
            formData.append('birthdate', data.form.birthdate);
            formData.append('civil_status', data.form.civil_status);
            formData.append('curp', data.form.curp);
            formData.append('blood_type', data.form.blood_type);
            formData.append('gender', data.form.gender);
            formData.append('personal_phone', data.form.personal_phone);
            formData.append('home_phone', data.form.home_phone);
            const response2 = await axios.post(Apiurl + 'profiles/',
            formData,
            {headers: {'Authorization': 'Token ' + token}})
            ///////////////////////////
            const response3 = await axios.post(Apiurl + 'addresses/',
            {
                student: studentId,
                street: data.form.street,
                number_e: data.form.number_e,
                number_i: data.form.number_i,
                suburb: data.form.suburb,
                city: data.form.city,
                state: data.form.state,
                postal_code: data.form.postal_code,
                is_main: true
            },
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            if(response.status === 201 && response2.status === 201 && response3.status === 201){
                alertSuccess('Registro exitoso de datos personales');
                setDataType('#school_info');
                setCount(count + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitSchool = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'highschools/',
            {
                ...data.form,
                student: studentId
            },
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            if(response.status === 201){
                alert('Registro exitoso de datos de escuela');
                setDataType('#fam_data');
                setCount(count + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitTutor = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apiurl + 'parents/',
            {
                ...data.form,
                student: studentId
            },
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            if(response.status === 201){
                alert('Registro exitoso de datos de tutor');
                setDataType('');
                setCount(count + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(

        <React.Fragment>
                <header>
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                </header>


                <section className="profile">
                <Header name={"Registrar"} />
                <hr/>
                <div className="container bootstrap snippet">

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="text-center">
                                <img src={photo} className="avatar img-circle img-thumbnail" alt="avatar"/>
                                <h6>...</h6>
                            </div>

                            <hr/>
                            <br/>
                            {/* <div className="panel panel-default">
                                    <div className="panel-heading">Website <i className="fa fa-link fa-1x"></i></div>
                                    <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
                            </div> */}
                        </div>

                        <div className="col-sm-9 mb-3">
                            
                                    <ul className="nav nav-tabs">
                                        <li className={dataType === '#home' ? 'active' : ''} ><a data-toggle="tab" href="#" >Datos Personales</a></li>
                                        <li className={dataType === '#school_info' ? 'active' : ''} ><a data-toggle="tab" href="#">Datos Escolares</a></li>
                                        <li className={dataType === '#fam_data' ? 'active' : ''} ><a data-toggle="tab" href="#" >Datos de padre o tutor</a></li>
                                    </ul>

                                    
                                    <div className="tab-content">

                                        <div className="tab-pane active">
                                            <hr/>
                                            {
                                                count === 3 &&
                                                <div className="alert alert-success">
                                                    <strong>Success!</strong> EL registro se ha realizado con éxito.
                                                </div>
                                            }
                                        </div>

                                        <div className={dataType === '#home' ? 'tab-pane active' : 'tab-pane'} id="home">
                                        <form onSubmit={handleSubmitPersonal} encType="multipart/form-data" className={dataType === '#home' ? 'tab-pane active' : 'tab-pane'} id="home">
                                            <hr/>
                                            {
                                                fields && fields.map((field, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                field.type !== 'ForeignKey' && field.type !== 'ManyToManyField' && field.type !== 'OneToOneField' && field.type !== 'BooleanField' && 
                                                                field.name !== 'enrollment' && field.name !== 'generation' &&
                                                                <div className="">
                                                                    <label htmlFor={field.name}>{field.verbose}</label>
                                                                    {
                                                                        field.name === 'career' 
                                                                        ? <select className="form-control fs-5" name={field.name} id={field.name} onChange={(e) => setData({ ...data, form: { ...data.form, [field.name]: e.target.value } })}>
                                                                            <option value="">Selecciona una opción</option>
                                                                            {
                                                                                careers && careers.map((career, index) => {
                                                                                    return (
                                                                                        <option key={index} value={career.name}>{career.name}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                        : <input type={
                                                                            field.type === "DateField" ? 'date' : 
                                                                            field.type === 'FileField' ? 'file' : 
                                                                            'text'
                                                                        } name={field.name} id={field.name} onChange={(e) => {
                                                                            e.target.files && e.target.files.length ? setPhoto(URL.createObjectURL(e.target.files[0])) : setPhoto('http://ssl.gstatic.com/accounts/ui/avatar_2x.png')
                                                                            setData({
                                                                                ...data,
                                                                                form: {
                                                                                    ...data.form,
                                                                                    [field.name]: field.type === 'FileField' ? e.target.files[0] : e.target.value
                                                                                }
                                                                            })
                                                                        }}/>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="form-group">
                                                <div className="col-xs-12">
                                                    <br/>
                                                    <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Siguiente</button>
                                                </div>
                                            </div> 
                                        </form> 
                                        </div>

                                        <div className={dataType === '#school_info' ? 'tab-pane active' : 'tab-pane'} id="school_info">
                                            <hr/>
                                            <form onSubmit={handleSubmitSchool} encType="multipart/form-data" className="form" action="##" method="post" id="registrationForm">
                                                <hr/>
                                                {
                                                    fields && fields.map((field, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    field.type !== 'ForeignKey' && field.type !== 'ManyToManyField' && field.type !== 'OneToOneField' && field.type !== 'BooleanField' && 
                                                                    field.name !== 'enrollment' && field.name !== 'generation' &&
                                                                    <div className="">
                                                                        <label htmlFor={field.name}>{field.verbose}</label>
                                                                        <input type={
                                                                            field.type === "DateField" ? 'date' : 
                                                                            field.type === 'FileField' ? 'file' : 
                                                                            'text'
                                                                        } name={field.name} id={field.name} onChange={(e) => {
                                                                            setData({
                                                                                ...data,
                                                                                form: {
                                                                                    ...data.form,
                                                                                    [field.name]: field.type === 'FileField' ? e.target.files[0] : e.target.value
                                                                                }
                                                                            })
                                                                        }}/>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="form-group">
                                                    <div className="col-xs-12">
                                                        <br/>
                                                        <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Siguiente</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className={dataType === '#fam_data' ? 'tab-pane active' : 'tab-pane'} id="fam_data">
                                            <hr/>
                                            <form onSubmit={handleSubmitTutor} encType="multipart/form-data" className="form" action="##" method="post" id="registrationForm">                                                                                                  
                                                <hr/>
                                                {
                                                    fields && fields.map((field, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    field.type !== 'ForeignKey' && field.type !== 'ManyToManyField' && field.type !== 'OneToOneField' && field.type !== 'BooleanField' && 
                                                                    field.name !== 'enrollment' && field.name !== 'generation' &&
                                                                    <div className="">
                                                                        <label htmlFor={field.name}>{field.verbose}</label>
                                                                        <input type={
                                                                            field.type === "DateField" ? 'date' : 
                                                                            field.type === 'FileField' ? 'file' : 
                                                                            'text'
                                                                        } name={field.name} id={field.name} onChange={(e) => {
                                                                            setData({
                                                                                ...data,
                                                                                form: {
                                                                                    ...data.form,
                                                                                    [field.name]: field.type === 'FileField' ? e.target.files[0] : e.target.value
                                                                                }
                                                                            })
                                                                        }}/>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="form-group">
                                                    <div className="col-xs-12">
                                                        <br/>
                                                        <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Guardar</button>
                                                    </div>
                                                </div>   
                                            </form>
                                        </div>
                        
                                    </div>

                        </div>

                    </div>

                </div>

                </section>

        </React.Fragment>

 );
}

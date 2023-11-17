/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import translate from 'translate'; // Asegúrate de importar la biblioteca translate
import { alertError } from '../../store/EdulinkStore';
import $ from 'jquery';
import 'select2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const FormCrud = ({permissions, typeUser, fields, handleSubmit, setData, data, name, createAccount,
            getTeachers, getSubjects}) => {
  const [translatedFields, setTranslatedFields] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    // Función asincrónica para traducir los campos
    const translateFields = async () => {
      try{
        const translated = await Promise.all(
            fields?.map(async (field) => {
              const translation = await translate(field.verbose.toUpperCase().replace(/_/g, " "), 'es');
              return translation;
            }) 
          );
          setTranslatedFields(translated);
      } catch (err) {
        console.error(err);
      }
    };

    translateFields();
  }, [fields]);

  // useEffect(() => {
  //   $('select').select2();
  // }, [fields, data]);

  useEffect(() => {
    getTeachersAndSubjects();
  }, []);

  const getTeachersAndSubjects = async() => {
    const teachers = await getTeachers();
    const subjects = await getSubjects();
    setTeachers(teachers);
    setSubjects(subjects);
  }

  const validateFields = async(e) => {
    e.preventDefault();
    const validate = fields?.reduce((acc, field) => {
      if (field.required && !data.form[field.name]) {
        acc.push(field.name);
      }
      return acc;
    }, []); // Initialize acc as an empty array
    if (validate.length > 0) {
      const translatedFields = await Promise.all(validate.map(async (field) => await translate(field, 'es')));
      alertError(`Los siguientes campos son requeridos: ${translatedFields.join(', ')}`);
      // alert(`Los siguientes campos son requeridos: ${validate.join(', ')}`);
      //ponle la clase error a cada input que tenga un campo requerido
      validate.forEach((field) => {
        document.getElementById(field).classList.add('error');
      })
      //al primero ponerle el focus
      document.getElementById(validate[0]).focus();
      
    } else {
      handleSubmit(e);
    }
  }
  
  const handleCreateAccount = async (e, type='') => {
    e.preventDefault();
    if(name.toLowerCase().includes('stud')){
      createAccount(data.form.id, 'student');
    }else if(name.toLowerCase().includes('pa')){
      createAccount(data.form.id, 'parent');
    }else if(name.toLowerCase().includes('empl')){
      createAccount(data.form.id, 'employee',type);
    }
  }

  const CustomSelect = ({index, isMulti=false, isClearable=true, typeOptions='default', onChange='default', value='default'}) => {
    const animatedComponents = makeAnimated();
    let options = [];
    if(typeOptions === 'default'){
      options = [
        ...fields[index].value.map((item, i) => {
          const value = parseInt(item.split(' - ')[0]);
          const label = item.split(' - ')[1];
          return { value, label };
        }),
      ];
    } else if(typeOptions === 'json'){
      options = [
        ...JSON.parse(fields[index].options).map((item, i) => {
          return { value: item[Object.keys(item)[0]], label: Object.keys(item)[0] };
        })
      ]
    } else {
      options = typeOptions
    }
    return (
      <Select className='select' components={animatedComponents} 
      placeholder={isMulti ? 'Seleccione una o mas opciones' : 'Seleccione una opción'} isClearable={isClearable} isSearchable 
      isMulti={isMulti} options={options} 
      onChange={(item)=>{
        onChange === 'default'
        ? setData({
          ...data,
          form: {
            ...data.form,
            [fields[index].name]: isMulti ? item.map(option => option.value) : item ? item.value : '' 
          }
        })
        : onChange(item)
      }} defaultValue={
        value === 'default'
        ? isMulti 
          ? (Array.isArray(data.form[fields[index]?.name])
            ? options.filter(option =>
                data.form[fields[index]?.name].map(texto => parseInt(texto, 10))?.includes(option.value)
              )
            : [])
          : options.find(option => option.value == data.form[fields[index]?.name])
        : value
      }/>
    )
  }
  return (
    <div className='my-4'>
      {
        name.toLowerCase().includes('stud')
        ? (data.form?.enrollment === null || data.form?.enrollment === '')
          && <div className="float-end">
            <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e)}>Completar registro</button>
          </div>
        : name.toLowerCase().includes('pa')
          ? (data.form?.user === null || data.form?.user === '')
            && <div className="float-end">
            <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e)}>Crear cuenta</button>
          </div>
          : name.toLowerCase().includes('empl')
            && (data.form?.user === null || data.form?.user === '')
              && <div className="">
                <p>Si aun no existe una cuenta, crea una para:</p>
                <div className='d-flex flex-wrap gap-3'>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'2')}>Profesor</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'3')}>Asistente</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'4')}>Director de carrera</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'5')}>Director academico</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'6')}>Rector</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'7')}>Control escolar</button>
                  <button className="btn btn-outline-primary fs-4" onClick={(e) => handleCreateAccount(e,'8')}>Recursos humanos</button>
                </div>
              </div>
      }
      <form className="form" onSubmit={validateFields}>
        {
            translatedFields?.map((translatedFields, index) => {
                return (
                    <div key={index} className='element mb-4'>
                        <label htmlFor={fields[index].name}>{translatedFields}</label>
                        {
                          fields[index].type === 'OneToOneField' || fields[index].type === 'ForeignKey'
                          ? <CustomSelect index={index} />
                          : fields[index].type === 'ManyToManyField'
                            ? <CustomSelect index={index} isMulti={true} isClearable={true}/>
                            : fields[index].name === 'password' && data.form.id
                              ? <input disabled value='**********'/>
                              : fields[index].type === 'FileField'
                                ? <div className='d-flex'>
                                    <input type="file" name={fields[index].name} id={fields[index].name} accept='image/png, image/jpeg, image/jpg' onChange={(e) => {
                                      if(e.target.files[0]?.size > 10000000 ){//10mb
                                        e.target.classList.add('error');
                                        setErrorMessage('EL archivo supera los 10mb');
                                      }else{
                                        e.target.classList.remove('error');
                                        setErrorMessage('');
                                      }
                                      setData({
                                        ...data,
                                        form: {
                                          ...data.form,
                                          [fields[index].name]: e.target.files[0]
                                        }
                                      })
                                    }}/>
                                    {
                                      data.form[fields[index].name] 
                                      ? <a className='mx-2' href={typeof data.form[fields[index].name] === 'string' ? data.form[fields[index].name] : URL.createObjectURL(data.form[fields[index].name])} target="_blank" rel="noopener noreferrer">
                                          <img width={50} height={50} src={typeof data.form[fields[index].name] === 'string' ? data.form[fields[index].name] : URL.createObjectURL(data.form[fields[index].name])} alt="Imagen" />
                                        </a>
                                      : ''
                                    }
                                    {
                                      errorMessage && <p className='text-danger fs-6'>{errorMessage}</p>
                                    }
                                  </div>
                                : fields[index].options?.length > 0
                                  ? <CustomSelect index={index} typeOptions='json' />
                                  : fields[index].type === 'TextField'
                                    ? fields[index].name === 'assignments'
                                      ? <div class="card">
                                          <div class="card-header">
                                            <button class="btn btn-primary w-auto h-auto p-3 float-end" type="button" onClick={(e) => {
                                              e.target.disabled = true;
                                              const fieldName = fields[index].name;
                                              const currentFieldData = Array.isArray(data.form[fieldName]) ? data.form[fieldName] : [];
                                              setData({
                                                ...data,
                                                form: {
                                                  ...data.form,
                                                  [fieldName]: [
                                                    ...currentFieldData,
                                                    {
                                                      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                                                      teacher: '',
                                                      subject: '',
                                                    },
                                                  ],
                                                },
                                              });
                                              setTimeout(() => {
                                                e.target.disabled = false;
                                              }, 1000);
                                            }}>
                                              <i class="fas fa-plus"></i>
                                            </button>
                                          </div>
                                          {/* <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                          </div> */}
                                          {
                                            data.form[fields[index].name]?.length > 0
                                            ? <div class="card-body">
                                                {
                                                  Array.isArray(data.form[fields[index].name]) && data.form[fields[index].name]?.map((assignment, i) => {
                                                    const optionsTeachers = teachers.map((teacher) => {
                                                      return {
                                                        id: assignment.id,
                                                        value: teacher.id,
                                                        label: teacher.name,
                                                      }
                                                    })
                                                    const optionsSubjects = subjects.map((subject) => {
                                                      return {
                                                        id: assignment.id,
                                                        value: subject.id,
                                                        label: subject.name,
                                                      }
                                                    })
                                                    return (
                                                      <div class="form-group row" key={i}>
                                                        <div class="col-6">
                                                          <CustomSelect index={i} typeOptions={optionsTeachers} isClearable={false} onChange={(item) => {
                                                            setData({
                                                              ...data,
                                                              form: {
                                                                ...data.form,
                                                                [fields[index].name]: item ? data.form[fields[index]?.name]?.map((assignment) => {
                                                                  if(assignment.id === item.id){
                                                                    return {
                                                                      ...assignment,
                                                                      teacher: item.value
                                                                    }
                                                                  }else{
                                                                    return assignment
                                                                  }
                                                                }) : ''
                                                              }
                                                            })
                                                          }} value={
                                                            optionsTeachers.find((teacher) => {
                                                              return teacher.value === assignment.teacher
                                                            })
                                                          } />
                                                        </div>
                                                        <div class="col-6">
                                                          <CustomSelect index={i} typeOptions={optionsSubjects} isClearable={false} onChange={(item) => {
                                                            setData({
                                                              ...data,
                                                              form: {
                                                                ...data.form,
                                                                [fields[index].name]: item ? data.form[fields[index]?.name]?.map((assignment) => {
                                                                  if(assignment.id === item.id){
                                                                    return {
                                                                      ...assignment,
                                                                      subject: item.value
                                                                    }
                                                                  }else{
                                                                    return assignment
                                                                  }
                                                                }) : ''
                                                              }
                                                            })
                                                          }} value={
                                                            optionsSubjects.find((subject) => {
                                                              return subject.value === assignment.subject
                                                            })
                                                          } />
                                                        </div>
                                                      </div>
                                                    )
                                                  })
                                                }
                                              </div>
                                            : null
                                          }
                                        </div>
                                      : null 
                                    : <input type={
                                    fields[index].type === "DateField" ? 'date' 
                                    : fields[index].type === "PasswordField" ? 'password' 
                                    : fields[index].type === "EmailField" ? 'email' 
                                    : fields[index].type === "BooleanField" ? 'checkbox'
                                    : fields[index].type === "IntegerField" ? 'number'
                                    : fields[index].type === "FloatField" ? 'number' 
                                    : 'text'
                                    // eslint-disable-next-line no-useless-escape
                                    }name={fields[index].name} id={fields[index].name} onChange={(e) => {
                                      if (e.target.name === 'enrollment') {
                                        e.target.value = data.form[fields[index].name] || ''
                                      }
                                      if(e.target.value){
                                        e.target.classList.remove('error');
                                        e.target.classList.add('success');
                                      }else {
                                        e.target.classList.remove('success');
                                        e.target.classList.remove('error');
                                      }
                                      fields[index].type === "BooleanField"
                                      ?setData({
                                        ...data,
                                        form: {
                                          ...data.form,
                                          [fields[index].name]: e.target.checked
                                        }
                                      })
                                      :setData({
                                        ...data,
                                        form: {
                                          ...data.form,
                                          [fields[index].name]: e.target.value
                                        }
                                      })
                                    }} value={data.form[fields[index].name] || ''} checked={data.form[fields[index].name] || ''} />
                        }
                    </div>
                )
            })
        }
        <button type='submit'>{data.form.id ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </div>
  )
}

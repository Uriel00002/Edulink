/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import translate from 'translate'; // Asegúrate de importar la biblioteca translate
import { alertError } from '../../store/EdulinkStore';
import $ from 'jquery';
import 'select2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const FormCrud = ({permissions, typeUser, fields, handleSubmit, setData, data, name, createAccount}) => {
  const [translatedFields, setTranslatedFields] = useState([]);
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

  const CustomSelect = ({index, isMulti=false, isClearable=false, typeOptions='default'}) => {
    const animatedComponents = makeAnimated();
    let options = [];
    if(typeOptions === 'default'){
      options = [
        ...fields[index].value.map((item, i) => {
          const value = item.split(' - ')[0];
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
      options = [
        ...typeOptions
      ]
    }
    console.log(options.find(option => option.value == data.form[fields[index].name]));
    return (
      <Select className='select' components={animatedComponents} 
      placeholder={isMulti ? 'Seleccione una o mas opciones' : 'Seleccione una opción'} isClearable={true} isSearchable 
      isMulti={isMulti} options={options} 
      onChange={(item)=>{
        setData({
          ...data,
          form: {
            ...data.form,
            [fields[index].name]: isMulti ? item.map(option => option.value) : item ? item.value : '' 
          }
        })
      }} defaultValue={
        isMulti 
        ? options.filter(option => data.form[fields[index].name]?.includes(option.value))
        // : options.find(option => option.value == data.form[fields[index].name])
        : options.find(option => option.value == data.form[fields[index].name])
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
                    <div key={index} className='element'>
                        <label htmlFor={fields[index].name}>{translatedFields}</label>
                        {
                          fields[index].type === 'OneToOneField' || fields[index].type === 'ForeignKey' 
                          // ? <Select className='select' value={data?.form[fields[index]?.name]?.toString() || ''} name={fields[index].name} id={fields[index].name} onChange={(e) => {
                          //   setData({
                          //     ...data,
                          //     form: {
                          //       ...data.form,
                          //       [fields[index].name]: e.target.value
                          //     }
                          //   })
                          // }}>
                          //   <option value='' >Seleccione una opcion</option>
                          //   { data &&
                          //     fields[index].value.map((item, i) => {
                          //       const value = item.split(' - ')[0];
                          //       const label = item.split(' - ')[1];
                          //       return (
                          //         <option key={i} value={value} >{label}</option>
                          //       )
                          //     })
                          //   }
                          // </Select>
                          ? <CustomSelect index={index} />
                          : fields[index].type === 'ManyToManyField' 
                            // ? <select value={data?.form[fields[index]?.name]?.toString() || ''} multiple name={fields[index].name} id={fields[index].name} onChange={(e)=>{
                            //   setData({
                            //     ...data,
                            //     form: {
                            //       ...data.form,
                            //       [fields[index].name]: [...e.target.options].filter(option => option.selected).map(option => option.value)
                            //     }
                            //   })
                            // }}>
                            //   <option value='' >Seleccione una opción</option>
                            //   {
                            //     fields[index].value.map((item, i) => {
                            //       const value = item.split(' - ')[0];
                            //       const label = item.split(' - ')[1];
                            //       return (
                            //         <option key={i} value={value} >{label}</option>
                            //       )
                            //     })
                            //   }
                            // </select>
                            ? <CustomSelect index={index} isMulti={true} isClearable={true}/>
                            : fields[index].name === 'password' && data.form.id
                              ? <input disabled value='**********'/>
                              : fields[index].type === 'FileField'
                                ? <input type="file" name={fields[index].name} id={fields[index].name} onChange={(e) => {
                                    setData({
                                      ...data,
                                      form: {
                                        ...data.form,
                                        [fields[index].name]: e.target.files[0]
                                      }
                                    })
                                  }}/>
                                : fields[index].options?.length > 0
                                  // ? <select value={data?.form[fields[index]?.name]?.toString() || ''} name={fields[index].name} id={fields[index].name} onChange={(e) => 
                                  // setData({...data, form: {...data.form, [fields[index].name]: e.target.value}})} >
                                  //   <option value='' >Seleccione una opción</option>
                                  //   {
                                  //     JSON.parse(fields[index].options).map((item, i) => {
                                  //       return (
                                  //         <option key={i} value={item[Object.keys(item)[0]]} >{Object.keys(item)[0]}</option>
                                  //       )
                                  //     })
                                  //   }
                                  // </select>
                                  ? <CustomSelect index={index} typeOptions='json' />
                                  :<input type={
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

import React, { useEffect, useState } from 'react'
import translate from 'translate'; // Asegúrate de importar la biblioteca translate
import { alertError } from '../../store/EdulinkStore';

export const FormCrud = ({fields, handleSubmit, setData, data}) => {
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
      console.log(data);
      handleSubmit(e);
    }
  }
  

  return (
    <form className="form" onSubmit={validateFields}>
      {
          translatedFields?.map((translatedFields, index) => {
              return (
                  <div key={index} className='element'>
                      <label htmlFor={fields[index].name}>{translatedFields}</label>
                      {
                        fields[index].type === 'OneToOneField' || fields[index].type === 'ForeignKey' 
                        ? <select defaultValue={''} name={fields[index].name} id={fields[index].name} onChange={(e) => {
                          setData({
                            ...data,
                            form: {
                              ...data.form,
                              [fields[index].name]: e.target.value
                            }
                          })
                        }}>
                          <option value='' disabled>Seleccione una opcion</option>
                          {
                            fields[index].value.map((item, index) => {
                              const value = item.split(' - ')[0];
                              const label = item.split(' - ')[1];
                              return (
                                <option key={index} value={value}>{label}</option>
                              )
                            })
                          }
                        </select>
                        : fields[index].type === 'ManyToManyField' 
                        ? <select defaultValue={''} multiple name={fields[index].name} id={fields[index].name} onChange={(e)=>{
                          setData({
                            ...data,
                            form: {
                              ...data.form,
                              [fields[index].name]: [...e.target.options].filter(option => option.selected).map(option => option.value)
                            }
                          })
                        }}>
                          <option value='' disabled>Seleccione una opción</option>
                          {
                            fields[index].value.map((item, index) => {
                              const value = item.split(' - ')[0];
                              const label = item.split(' - ')[1];
                              return (
                                <option key={index} value={value}>{label}</option>
                              )
                            })
                          }
                        </select>
                        : fields[index].type === 'PasswordField' && data.form.id
                          ? <input disabled value='**********'/>
                          : <input type={
                            fields[index].type === "DateField" ? 'date' 
                            : fields[index].type === "PasswordField" ? 'password' 
                            : fields[index].type === "EmailField" ? 'email' 
                            : fields[index].type === "IntegerField" ? 'number' 
                            : 'text'
                            } name={fields[index].name} id={fields[index].name} onChange={(e) => {
                              if(e.target.value){
                                e.target.classList.remove('error');
                                e.target.classList.add('success');
                              }else {
                                e.target.classList.remove('success');
                                e.target.classList.remove('error');
                              }
                              setData({
                                ...data,
                                form: {
                                  ...data.form,
                                  [fields[index].name]: e.target.value
                                }
                            })}} value={data.form[fields[index].name] || ''} />
                      }
                  </div>
              )
          })
      }
      <button type='submit'>{data.form.id ? 'Actualizar' : 'Registrar'}</button>
    </form>
  )
}

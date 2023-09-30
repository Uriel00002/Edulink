import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import translate from 'translate'; // Asegúrate de importar la biblioteca translate
import { storeEdulink } from '../../store/EdulinkStore';

export const FormCrud = ({fields, handleSubmit, setData, data}) => {
  const [translatedFields, setTranslatedFields] = useState([]);
  const setLoading = storeEdulink(state => state.setLoading)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    
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

  return (
    <form className="form" onSubmit={handleSubmit}>
      {
          translatedFields?.map((translatedFields, index) => {
              return (
                  <div key={index} className='element'>
                      <label htmlFor={fields[index].name}>{translatedFields}</label>
                      <input type={
                          fields[index].type === "DateField" ? 'date' : 'text'
                      } name={fields[index].name} id={fields[index].name} onChange={(e) => setData({
                          ...data,
                          form: {
                              ...data.form,
                              [fields[index].name]: e.target.value
                          }
                      })} value={data.form[fields[index].name] || ''} />
                  </div>
              )
          })
      }
      <button type='submit'>Enviar</button>
    </form>
  )
}

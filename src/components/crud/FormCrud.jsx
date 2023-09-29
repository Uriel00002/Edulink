import React, { useEffect, useState } from 'react'
import translate from 'translate'; // Asegúrate de importar la biblioteca translate

export const FormCrud = ({fields, handleSubmit, setData, data}) => {
    const [translatedFields, setTranslatedFields] = useState([]);
    useEffect(() => {
        // Función asincrónica para traducir los campos
        const translateFields = async () => {
          try{
            const translated = await Promise.all(
                fields.map(async (field) => {
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
                      })} />
                  </div>
              )
          })
      }
      <button type='submit'>Enviar</button>
    </form>
  )
}

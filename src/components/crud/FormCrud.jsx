import axios from 'axios';
import React, { useEffect, useState } from 'react'
import translate from 'translate'; // Asegúrate de importar la biblioteca translate

export const FormCrud = ({fields, handleSubmit, setData, data}) => {
  console.log(fields);
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

  return (
    <form className="form" onSubmit={handleSubmit}>
      {
          translatedFields?.map((translatedFields, index) => {
              return (
                  <div key={index} className='element'>
                      <label htmlFor={fields[index].name}>{translatedFields}</label>
                      {
                        fields[index].type === 'OneToOneField' || fields[index].type === 'ForeignKey' 
                        ? <select>
                            <option value={data.form[fields[index].name] || ''}>{data.form[fields[index].name] || ''}</option>
                        </select>
                        : fields[index].type === 'ManyToManyField' 
                        ? <select>
                            <option value={data.form[fields[index].name] || ''}>{data.form[fields[index].name] || ''}</option>
                        </select>
                        : <input type={
                          fields[index].type === "DateField" ? 'date' : 'text'
                          } name={fields[index].name} id={fields[index].name} onChange={(e) => setData({
                              ...data,
                              form: {
                                  ...data.form,
                                  [fields[index].name]: e.target.value
                              }
                          })} value={data.form[fields[index].name] || ''} />
                      }
                  </div>
              )
          })
      }
      <button type='submit'>{data.form.id ? 'Actualizar' : 'Registrar'}</button>
    </form>
  )
}

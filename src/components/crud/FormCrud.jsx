import React from 'react'

export const FormCrud = ({fields, handleSubmit, setData, data}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      {
          fields?.map((field, index) => {
              return (
                  <div key={index} className='element'>
                      <label htmlFor={field.name}>{field.verbose}</label>
                      <input type={
                          field.type === "DateField" ? 'date' : 'text'
                      } name={field.name} id={field.name} onChange={(e) => setData({
                          ...data,
                          form: {
                              ...data.form,
                              [field.name]: e.target.value
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

import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'

export const CRUD = ({name, fields, handleSubmit, setData, data}) => {
    const [action, setAction] = useState('ver')
  return (
    <>
       
       <section className="header_main">
                <Header name={name} />
            </section>

            <section className="carreer_building_main row">
                <div className="col-4 border-end border-dark d-flex flex-column gap-3">
                    <img src="https://via.placeholder.com/300" alt="" />
                    <button className="btn btn-primary" onClick={() => setAction('registrar')} >registrar</button>
                    <button className="btn btn-primary" onClick={() => setAction('ver')}>Ver</button>
                    <button className="btn btn-primary" onClick={() => setAction('reportes')}>Reportes</button>
                </div>


                {
                    action === 'registrar' &&
                    <form className="col-8" onSubmit={handleSubmit}>

                        {
                            fields?.map((field, index) => {
                                return (
                                    <div key={index}>
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
                }
                {action === 'ver' && <div></div>}
                {action === 'reportes' && <div></div>}

            </section>

            <section className="footer_main">
                <Footer />
            </section>
       
    </>
  )
}

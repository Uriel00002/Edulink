import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../assets/css/cruds.css'
import Pic from '../assets/img/pics.jpg'


export const CRUD = ({name, fields, handleSubmit, setData, data}) => {
    const [action, setAction] = useState('ver')
  return (
    <>
       
       <section className="header_main">
                <Header name={name} />
            </section>

            <section className="cruds_main row">

                <div className="cruds_bar col-3 d-flex flex-column gap-3">
                    <img src="https://via.placeholder.com/300" alt="" />
                    <button className="btn btn-primary">registrar</button>
                    <button className="btn btn-primary">Ver</button>
                    <button className="btn btn-primary">Reportes</button>
                </div>

                <div className="cruds_content col-9" >

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

                </div>
                

            </section>

            <section className="footer_main">
                <Footer />
            </section>
       
    </>
  )
}

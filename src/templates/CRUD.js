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

            <section className="cruds_main row row-cols-1">

                <div className="cruds_bar col col-3 d-flex flex-column gap-3 position-relative overflow-hidden">
                    <img className='img-cruds' src="https://via.placeholder.com/300" alt="" />
                    <button className="btn btn-primary" onClick={() => setAction('registrar')}><span className='text-btn-slider'>Registrar</span><span className='icon-btn-slider'><i className="fas fa-solid fa-plus"></i></span></button>
                    <button className="btn btn-primary" onClick={() => setAction('ver')}><span className='text-btn-slider'>Ver</span><span className='icon-btn-slider'><i className="fas fa-solid fa-eyes"></i></span></button>
                    <button className="btn btn-primary" onClick={() => setAction('reportes')}><span className='text-btn-slider'>Reportes</span><span className='icon-btn-slider'><i className="fas fa-solid fa-chart-line"></i></span></button>
                </div>

                <div className="cruds_content col col-9" >

                { action === 'registrar' &&	
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
                }

                { action === 'ver' &&	<div></div>}

                { action === 'reportes' &&	<div></div>}

                </div>
                

            </section>

            <section className="footer_main">
                <Footer />
            </section>
       
    </>
  )
}

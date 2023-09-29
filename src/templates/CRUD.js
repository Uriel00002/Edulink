import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../assets/css/cruds.css'
import Pic from '../assets/img/pics.jpg'
import { FormCrud } from '../components/crud/FormCrud'
import { TableCrud } from '../components/crud/TableCrud'
import { storeEdulink } from '../store/EdulinkStore'


export const CRUD = ({name, fields, handleSubmit, setData, data, view, setView}) => {
    const setLoading = storeEdulink(state => state.setLoading)
    const [action, setAction] = useState('ver')
    useEffect(() => {
        switch (action) {
            case 'ver':
                setView('v')
                break

            case 'registrar':
                setView('r')
                break

            default:
                break
        }
    }, [action, setView])
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
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
                    <FormCrud fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} />
                }

                { action === 'ver' &&	
                    <TableCrud data={data} />
                }

                { action === 'reportes' &&	<div></div>}

                </div>
                

            </section>

            <section className="footer_main">
                <Footer />
            </section>
       
    </>
  )
}

import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../assets/css/cruds.css'
import Pic from '../assets/img/pics.jpg'
import { FormCrud } from '../components/crud/FormCrud'
import { TableCrud } from '../components/crud/TableCrud'
import { useLocation, useNavigate } from 'react-router-dom';


export const CRUD = ({permissions, typeUser, name, fields, handleSubmit, handleDelete, setData, data, view, setView, action, setAction, setIdItem}) => {
  const history = useNavigate();
  const location = useLocation();
  const handleRemoveIdFromURL = () => {
    history({pathname: location.pathname, search: ''});
    setIdItem(null);
  }
  return (
    <>
       
       <section className="header_main">
                <Header name={name} />
            </section>

            <section className="cruds_main row row-cols-1">

                <div className="cruds_bar col col-3 d-flex flex-column gap-3 position-relative overflow-hidden">
                    <img className='img-cruds' src="https://via.placeholder.com/300" alt="" />
                    {
                      permissions.c.includes(typeUser) &&
                        <button className="btn btn-primary" onClick={() => {setAction('registrar'); handleRemoveIdFromURL(); setData({data:data.data, form:{}})}}><span className='text-btn-slider'>Registrar</span><span className='icon-btn-slider'><i className="fas fa-solid fa-plus"></i></span></button>
                    }
                    {
                      permissions.r.includes(typeUser) &&
                      <button className="btn btn-primary" onClick={() => {setAction('ver'); handleRemoveIdFromURL(); setData({data:data.data, form:{}})}}><span className='text-btn-slider'>Ver</span><span className='icon-btn-slider'><i className="fas fa-solid fa-eyes"></i></span></button>
                    }
                    <button className="btn btn-primary" onClick={() => setAction('reportes')}><span className='text-btn-slider'>Reportes</span><span className='icon-btn-slider'><i className="fas fa-solid fa-chart-line"></i></span></button>
                </div>

                <div className="cruds_content col col-9" >

                { action === 'registrar' && permissions.c.includes(typeUser) &&	
                    <FormCrud permissions={permissions} typeUser={typeUser} fields={fields} handleSubmit={handleSubmit} setData={setData} data={data} />
                }

                { action === 'ver' &&	 permissions.r.includes(typeUser) &&
                    <TableCrud permissions={permissions} typeUser={typeUser} data={data.data} setAction={setAction} handleDelete={handleDelete} />
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

import React from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/list.css'

export const IndexUsers = () => {
  const navigate = useNavigate()
  const list = [
    {
      name: 'Cuentas',
      link: [{name: 'Usuarios', link: 'users'}],
    },
    {
      name: 'Estudiantes',
      link: [
        {name: 'Datos academicos', link: 'students'},
        {name: 'Preparatorias', link: 'highschools'},
        {name: 'Perfiles', link: 'profiles'},
        {name: 'Direcciones', link: 'addresses'},
      ],
    },
    {
      name: 'Padres',
      link: [{name: 'Datos familiares', link: 'parents'}],
    },
    {
      name: 'Empleados',
      link: [
        {name: 'Datos laborales', link: 'employees'},
        {name: 'Puestos', link: 'positions'},
      ],
    }
  ]
  return (
    <>
       <section className="header_main">
                <Header name={"Usuarios"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu row gap-5">
                  {
                    list.map((item, index) => {
                      return (
                        <div key={index} className="item_list col-md-2">
                          <h3 onClick={(e) =>{
                            document.querySelectorAll('.active').forEach((item) => {
                              item.classList.remove('active')
                            })
                            e.target.classList.toggle('active')
                          }}>{item.name}</h3>
                          <ul>
                            {
                              item.link.map((item, index) => {
                                return (
                                  <li key={index} onClick={() => navigate(item.link)}>{item.name}</li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      )
                    })
                  }
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
    </>
  )
}

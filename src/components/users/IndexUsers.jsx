import React, { useEffect } from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/list.css'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { storeEdulink } from '../../store/EdulinkStore'
import { validateUserInView } from '../../helpers/funtionsGlobals'

export const IndexUsers = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
  const navigate = useNavigate()
  const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
  const list = [
    {
      name: 'Cuentas',
      link: [{name: 'Usuarios', link: 'users', permissions: [0,1,2,3,4,5,6,7,8]}],
    },
    {
      name: 'Estudiantes',
      link: [
        {name: 'Datos academicos', link: 'students', permissions: [2,3,4,5,6,7]},
        {name: 'Preparatorias', link: 'highschools',permissions: [2,3,4,5,6,7]},
        {name: 'Perfiles', link: 'profiles', permissions: [2,3,4,5,6,7]},
        {name: 'Direcciones', link: 'addresses', permissions: [2,3,4,5,6,7]},
      ],
    },
    {
      name: 'Padres',
      link: [{name: 'Datos familiares', link: 'parents', permissions: [3,4,5,6,7]}],
    },
    {
      name: 'Empleados',
      link: [
        {name: 'Datos laborales', link: 'employees', permissions: [2,3,4,5,6,7,8]},
        {name: 'Puestos', link: 'positions', permissions: [2,3,4,5,6,7,8]},
      ],
    }
  ]

  useEffect(() => {
    !validateUserInView(typeUser, permissions) && navigate('/');
}, [])
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
                              item.link.map((item, index) => 
                                item.permissions.includes(typeUser) &&
                                  <li key={index} onClick={() => navigate(item.link)}>{item.name}</li>
                              )
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

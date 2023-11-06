import React, { useEffect } from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/list.css'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { storeEdulink } from '../../store/EdulinkStore'
import { validateUserInView } from '../../helpers/funtionsGlobals'

export const IndexStudents = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
  const navigate = useNavigate()
  const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
  const list = [
    {
      name: 'Estudiantes',
      link: [
        {name: 'Datos academicos', link: '/students/students', permissions: [128,2,3,4,5,6,7]},
        {name: 'Preparatorias', link: '/students/highschools',permissions: [128,2,3,4,5,6,7]},
        {name: 'Perfiles', link: '/students/profiles', permissions: [128,2,3,4,5,6,7]},
        {name: 'Direcciones', link: '/students/addresses', permissions: [128,2,3,4,5,6,7]},
      ],
    },
    {
      name: 'Padres',
      link: [{name: 'Datos familiares', link: '/students/parents', permissions: [128,3,4,5,6,7]}],
    },
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

import React from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { Link } from 'react-router-dom'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { storeEdulink } from '../../store/EdulinkStore'

export const Index = () => {
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")) //tipo de usuario
  return (
    <>
       <section className="header_main">
                <Header name={"SICAH"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu">

                    <div className="wrapper">
                        <i id="left" className="arrow fa-solid fa-angle-left"></i>
                        <ul className="carousel">
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/positions/">
                                    <div className="circle"><i className="fa-solid fa-crosshairs-simple fa-bounce"></i></div>
                                    <h2>Posicion</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/employees/">
                                    <div className="circle"><i className="fa-solid fa-chalkboard-user fa-bounce"></i></div>
                                    <h2>Empleados</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/subjects/">
                                    <div className="circle"><i className="fa-solid fa-book fa-bounce"></i></div>
                                    <h2>Materias</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/categories/">
                                    <div className="circle"><i className="fa-solid fa-booth-curtain fa-bounce"></i></div>
                                    <h2>Categorías de aulas</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/classrooms/">
                                    <div className="circle"><i className="fa-solid fa-booth-curtain fa-bounce"></i></div>
                                    <h2>Salones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/career/">
                                    <div className="circle"><i className="fa-solid fa-file fa-bounce"></i></div>
                                    <h2>Carreras</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/buildings/">
                                    <div className="circle"><i className="fa-solid fa-building fa-bounce"></i></div>
                                    <h2>Edificios</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/groups/">
                                    <div className="circle"><i className="fa-solid fa-layer-group fa-bounce"></i></div>
                                    <h2>Grupos</h2>
                                </Link>
                            }
                        </ul>
                        <i id="right" className="arrow fa-solid fa-angle-right"></i>
                    </div>
                </div>


            </section>
            <section className="footer_main">
                <Footer />
            </section>
    </>
  )
}

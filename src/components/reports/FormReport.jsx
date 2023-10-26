import React from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'

export const FormReport = () => {
  return (
    <React.Fragment>

            <section className="header_main">
                <Header name={"Reportes"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu h-auto my-5">
                    <form className='form w-75'>
                        <h1 className='mb-3'>Reportes de estudiantes</h1>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control fs-5" id="promedio" placeholder="-" style={{ height: '50px' }} />
                            <label for="promedio">Promedio</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control fs-5" id="edad" placeholder="-" style={{ height: '50px' }} />
                            <label for="edad">Edad</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="carrera" placeholder="-" style={{ height: '50px' }} />
                            <label for="carrera">Carrera</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="semestre" placeholder="-" style={{ height: '50px' }} />
                            <label for="semestre">Semestre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="grupo" placeholder="-" style={{ height: '50px' }} />
                            <label for="grupo">Grupo</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="municipio" placeholder="-" style={{ height: '50px' }} />
                            <label for="municipio">Municipio</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="genero" placeholder="-" style={{ height: '50px' }} />
                            <label for="genero">Genero</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control fs-5" id="generacion" placeholder="-" style={{ height: '50px' }} />
                            <label for="generacion">Generacion</label>
                        </div>
                    </form>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
  )
}

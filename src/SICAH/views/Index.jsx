/* eslint-disable eqeqeq */
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import '../../assets/css/dashboard.css';
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
                    {
                        typeUser == 128 &&
                        <Link className="sicah_card" to="/sicah/academiccharges/">
                            <div className="circle"><i className="fa-solid fa-table-cells fa-bounce"></i></div>
                            <h2>Carga horaria</h2>
                        </Link>
                    }
                    {
                        typeUser == 128 &&
                        <Link className="sicah_card" to="/sicah/">
                            <div className="circle"><i className="fa-solid fa-file fa-bounce"></i></div>
                            <h2>Reportes</h2>
                        </Link>
                    }
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>
        </>
    )
}

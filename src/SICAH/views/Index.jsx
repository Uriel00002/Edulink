/* eslint-disable eqeqeq */
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import '../../assets/css/dashboard.css';
import { Link, useNavigate } from 'react-router-dom'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { storeEdulink } from '../../store/EdulinkStore'
import { useEffect } from 'react';
import { validateUserInView } from '../../helpers/funtionsGlobals';

export const Index = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])
    return (
        <>
            <section className="header_main">
                <Header name={"SICAH"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu flex-wrap py-5">
                    {
                        (typeUser == 128 || typeUser == 4) &&
                        <Link className="sicah_card" to="/sicah/academiccharges/">
                            <div className="circle"><i className="fa-solid fa-table-cells fa-bounce"></i></div>
                            <h2>Carga horaria</h2>
                        </Link>
                    }
                    {
                        (typeUser == 128 || typeUser == 3 || typeUser == 4 || typeUser == 5 || typeUser == 6 || typeUser == 7) &&
                        <Link className="sicah_card" to="/groups/">
                            <div className="circle"><i className="fa-solid fa-layer-group fa-bounce"></i></div>
                            <h2>Grupos</h2>
                        </Link>
                    }
                    {
                        (typeUser == 128 || typeUser == 5 || typeUser == 6 || typeUser == 7) &&
                        <Link className="sicah_card" to="/subjects/">
                            <div className="circle"><i className="fa-solid fa-book fa-bounce"></i></div>
                            <h2>Materias</h2>
                        </Link>
                    }
                    {
                        (typeUser == 128 || typeUser == 2 || typeUser == 4) &&
                        <Link className="sicah_card" to="/sicah/reports">
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

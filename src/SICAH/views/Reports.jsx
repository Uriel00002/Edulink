/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Header from '../../templates/Header'
import Footer from '../../templates/Footer'
import { useNavigate } from 'react-router-dom';
import { encriptar_desencriptar } from '../../helpers/criptografia';
import { storeEdulink } from '../../store/EdulinkStore';
import { validateUserInView } from '../../helpers/funtionsGlobals';

export const Reports = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])
  return (
    <>
    <section className="header_main">
        <Header name={"Reportes de carga horaria"} />
    </section>
    <section className="dash_main">
        <div className="dash_menu">
        </div>
    </section>
    <section className="footer_main">
        <Footer />
    </section>
</>
  )
}

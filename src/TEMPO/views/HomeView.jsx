/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import Footer from '../../templates/Footer'
import Header from '../../templates/Header'
import { Link, useNavigate } from 'react-router-dom'
import { encriptar_desencriptar } from '../../helpers/criptografia'
import { storeEdulink } from '../../store/EdulinkStore'
import { validateUserInView } from '../../helpers/funtionsGlobals'

export const HomeView = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])

  return (
    <>
       <section className="header_main">
                <Header name={"TEMPO"} />
            </section>
            <section className="dash_main">
            </section>
            <section className="footer_main">
                <Footer />
        </section>
    </>
  )
}

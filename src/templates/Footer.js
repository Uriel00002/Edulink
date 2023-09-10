/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from '../assets/img/logo.png'
import '../assets/css/header.css'
import axios from "axios";
import { Apiurl } from "../services/apirest";
import { storeEdulink } from "../store/EdulinkStore";
import { Link } from "react-router-dom";



const Footer = () => {

  return (
    

  <section id="footer" className="footer">

    <div className="contact_us">
      <ul>
        <li>
          <a className="icon" href=""><i class="fab fa-facebook"/></a>
          <a className="titulo" href="">Facebook</a>
        </li>
        <li>
          <a className="icon" href=""><i class="fab fa-instagram"/></a>
          <a className="titulo" href="">Instagram</a>
        </li>
        <li>
          <a className="icon" href="https://twitter.com"><i class="fab fa-twitter"/></a>
          <a className="titulo" href="">Twitter</a>
        </li>       
        <li>
          <a className="icon" href=""><i class="fab fa-tiktok"/></a>
          <a className="titulo" href="">Tiktok</a>
        </li>
        <li>
          <a className="icon" href=""><i class="fab fa-youtube"/></a>
          <a className="titulo" href="">YouTube</a>
        </li>
      </ul>
    </div>

  </section>


  )

}

export default Footer
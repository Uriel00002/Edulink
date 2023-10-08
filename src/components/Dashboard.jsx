/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import '../assets/css/dashboard.css';
import Img from '../assets/img/wallpaper.png';
import Profile from '../assets/img/profile_img.png';
import Carreer from '../assets/img/carrera.png';
import Building from '../assets/img/edificio.png';
import Calif from '../assets/img/calif.png';
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { storeEdulink } from "../store/EdulinkStore";
import { encriptar_desencriptar } from "../helpers/criptografia";

export const Dashboard = () => {
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")) //tipo de usuario

    useEffect(() => {
        try {
            const wrapper = document.querySelector(".wrapper");
            const carousel = document.querySelector(".carousel");
            const firstCardWidth = carousel.querySelector(".card")?.offsetWidth;
            const arrowBtns = document.querySelectorAll(".wrapper i");
            const carouselChildrens = [...carousel.children];
            let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
            let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
            carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
                carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
            });
            carouselChildrens.slice(0, cardPerView).forEach(card => {
                carousel.insertAdjacentHTML("beforeend", card.outerHTML);
            });
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
            arrowBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
                });
            });
            const dragStart = (e) => {
                isDragging = true;
                carousel.classList.add("dragging");
                // Records the initial cursor and scroll position of the carousel
                startX = e.pageX;
                startScrollLeft = carousel.scrollLeft;
            }
            const dragging = (e) => {
                if (!isDragging) return; // if isDragging is false return from here
                carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
            }
            const dragStop = () => {
                isDragging = false;
                carousel.classList.remove("dragging");
            }
            const infiniteScroll = () => {
                // If the carousel is at the beginning, scroll to the end
                if (carousel.scrollLeft === 0) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                    carousel.classList.remove("no-transition");
                }
                // If the carousel is at the end, scroll to the beginning
                else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.offsetWidth;
                    carousel.classList.remove("no-transition");
                }

                // Clear existing timeout & start autoplay if mouse is not hovering over carousel
                clearTimeout(timeoutId);
                if (!wrapper.matches(":hover")) autoPlay();
            }
            const autoPlay = () => {
                if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
                timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
            }
            autoPlay();
            carousel.addEventListener("mousedown", dragStart);
            carousel.addEventListener("mousemove", dragging);
            document.addEventListener("mouseup", dragStop);
            carousel.addEventListener("scroll", infiniteScroll);
            wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
            wrapper.addEventListener("mouseleave", autoPlay);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <React.Fragment>

            <section className="header_main">
                <Header name={"EDULINK"} />
            </section>
            <section className="dash_main">
                <div className="dash_menu">

                    <div className="wrapper">
                        <i id="left" className="arrow fa-solid fa-angle-left"></i>
                        <ul className="carousel">
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/perfilusuario">
                                    <div className="circle"><i className="fa-solid fa-file fa-bounce"></i></div>
                                    <h2>PerfilAlumno</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/students/register">
                                    <div className="circle"><i class="fa-solid fa-graduation-cap fa-bounce"></i></div>
                                    <h2>Inscripcion</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/calif">
                                    <div className="circle"><i className="fa-solid fa-file fa-bounce"></i></div>
                                    <h2>Calificaciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/users/">
                                    <div className="circle"><i className="fa-solid fa-file fa-bounce"></i></div>
                                    <h2>Usuarios</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/students/">
                                    <div className="circle"><i class="fa-solid fa-file-user fa-bounce"></i></div>
                                    <h2>Estudiantes</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/highschools/">
                                    <div className="circle"><i class="fa-solid fa-school fa-bounce"></i></div>
                                    <h2>Preparatorias</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/parents/">
                                    <div className="circle"><i class="fa-solid fa-family-pants fa-bounce"></i></div>
                                    <h2>Padres</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/profiles/">
                                    <div className="circle"><i class="fa-solid fa-user fa-bounce"></i></div>
                                    <h2>Perfiles</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/positions/">
                                    <div className="circle"><i class="fa-solid fa-crosshairs-simple fa-bounce"></i></div>
                                    <h2>Posicion</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/employees/">
                                    <div className="circle"><i class="fa-solid fa-chalkboard-user fa-bounce"></i></div>
                                    <h2>Empleados</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/addresses/">
                                    <div className="circle"><i class="fa-solid fa-address-card fa-bounce"></i></div>
                                    <h2>Direcciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/subjects/">
                                    <div className="circle"><i class="fa-solid fa-book fa-bounce"></i></div>
                                    <h2>Materias</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/grades/">
                                    <div className="circle"><i class="fa-light fa-objects-align-bottom fa-bounce"></i></div>
                                    <h2>Calificaciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/categories/">
                                    <div className="circle"><i class="fa-solid fa-booth-curtain fa-bounce"></i></div>
                                    <h2>Categorías de aulas</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/classrooms/">
                                    <div className="circle"><i class="fa-solid fa-booth-curtain fa-bounce"></i></div>
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
                                    <div className="circle"><i class="fa-solid fa-building fa-bounce"></i></div>
                                    <h2>Edificios</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/groups/">
                                    <div className="circle"><i class="fa-solid fa-layer-group fa-bounce"></i></div>
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

        </React.Fragment>
    );
}

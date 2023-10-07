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
                        <i id="left" className="fa-solid fa-angle-left"></i>
                        <ul className="carousel">
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/students/register">
                                    <img src={Profile} className="img" alt="imagen" />
                                    <h2>Inscripcion</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/calif">
                                    <img src={Calif} className="img" alt="imagen" />
                                    <h2>Calificaciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/users/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Usuarios</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/students/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Estudiantes</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/highschools/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Preparatorias</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/parents/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Padres</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/profiles/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Perfiles</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/positions/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Posicion</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/employees/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Empleados</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/addresses/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Direcciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/subjects/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Materias</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/grades/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Calificaciones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/categories/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Categorías de aulas</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/classrooms/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Salones</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/career/">
                                    <img src={Carreer} className="img" alt="imagen" />
                                    <h2>Carreras</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/buildings/">
                                    <img src={Building} className="img" alt="imagen" />
                                    <h2>Edificios</h2>
                                </Link>
                            }
                            {
                                typeUser == 128 &&
                                <Link className="card" to="/groups/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Grupos</h2>
                                </Link>
                            }
                        </ul>
                        <i id="right" className="fa-solid fa-angle-right"></i>
                    </div>
                </div>


            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
    );
}

import React, { useEffect } from "react";
import '../assets/css/dashboard.css';
import Img from '../assets/img/wallpaper.png';
import Header from "../templates/Header";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


export const Dashboard = () => {

    useEffect(() => {
        try {
            const wrapper = document.querySelector(".wrapper");
            const carousel = document.querySelector(".carousel");
            const firstCardWidth = carousel.querySelector(".card").offsetWidth;
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
                if(!isDragging) return; // if isDragging is false return from here
                carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
            }
            const dragStop = () => {
                isDragging = false;
                carousel.classList.remove("dragging");
            }
            const infiniteScroll = () => {
                // If the carousel is at the beginning, scroll to the end
                if(carousel.scrollLeft === 0) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                    carousel.classList.remove("no-transition");
                }
                // If the carousel is at the end, scroll to the beginning
                else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.offsetWidth;
                    carousel.classList.remove("no-transition");
                }

                // Clear existing timeout & start autoplay if mouse is not hovering over carousel
                clearTimeout(timeoutId);
                if(!wrapper.matches(":hover")) autoPlay();
            }
            const autoPlay = () => {
                if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
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

            <section className="dashboard">
                <Header name={"Inicio"} />

                <div className="dashboard_content d-flex align-items-center">


                    <div className="dash_menu">

                        <div className="wrapper">
                            <i id="left" className="fa-solid fa-angle-left"></i>
                            <ul className="carousel">
                                <Link className="card" to="/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Text 1</h2>
                                </Link>
                                <Link className="card" to="/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Text 2</h2>
                                </Link>
                                <Link className="card" to="/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Text 3</h2>
                                </Link>
                                <Link className="card" to="/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Text 4</h2>
                                </Link>
                                <Link className="card" to="/">
                                    <img src={Img} className="img" alt="imagen" />
                                    <h2>Text 5</h2>
                                </Link>
                            </ul>
                            <i id="right" className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>


                </div>
            </section>
        </React.Fragment>
    );
}

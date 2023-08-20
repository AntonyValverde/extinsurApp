import { FaRegUserCircle, FaFire, FaMapMarked, FaTools, FaSistrix, FaFacebook, FaInstagram, FaFireExtinguisher, FaEnvelopeOpenText, FaWhatsapp, FaPortrait, FaIcons } from 'react-icons/fa'
import Link from "next/link";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Nav_index = ({ }) => {
    return (
        <>
            <nav className="navInfo">
                <h1 className="h1Info">
                    <span className="text">Extinsur</span>
                    <FaFire className="icons"></FaFire>
                </h1>
                <div>
                    <article className="articleInfo">
                        ExtinSur corredores, servicios de mantenimiento y seguridad ciudadana,
                        estamos siempre para usted, mira nuestros productos de mejor calidad y
                        visitanos en nuestros puestos de venta.
                    </article>

                    <article className="articleInfo">
                        Oficinas en San Rafael de ciudad Neily, entrada frente al salon
                        comunal.
                    </article>

                    <article className="articleInfo">
                        Coordenadas exactas:
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 </a>
                    </article>
                </div>
            </nav>

            <nav className="navInfoFotos">

                <div>

                    <article>

                        <Carousel
                            autoPlay={true}
                            interval={4000}
                            infiniteLoop={true}
                            showThumbs={false}

                        >
                            <div>
                                <img src="/indexInicio/extintor_rotulo.png" alt="Imagen 1" />
                            </div>
                            <div>
                                <img src="/indexInicio/varios_extintores.jpg" alt="Imagen 2" />
                            </div>
                            <div>
                                <img src="/indexInicio/extintor-para-incendios-abc.jpg" alt="Imagen 2" />
                            </div>

                        </Carousel>

                    </article>

                </div>
            </nav>

            <nav className="navDireccion">
                <h1 className="h1Info">
                    <span className="text">Puestos de venta</span>
                    <FaMapMarked className="icons"></FaMapMarked>
                </h1>
                <div>
                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">
                        Coordenadas exactas:
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 </a>
                    </article>
                </div>
            </nav>

            <nav className="navServicios">
                <h1 className="h1Info">
                    <span className="text">Servicios</span>
                    <FaTools className="icons"></FaTools>
                </h1>
                <div>
                    <article className="articleInfo">
                        <Link href="/IndexInicioSesion" className="buttonBorder">
                            <span className="text"></span>
                            <FaRegUserCircle className="icons"></FaRegUserCircle>
                        </Link>

                    </article>

                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">
                        Coordenadas exactas:
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 </a>
                    </article>
                </div>
            </nav>

            <nav className="navServiciosImagenes">
                <h1 className="h1Info">Puestos de venta</h1>
                <div>
                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">
                        Coordenadas exactas:
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 </a>
                    </article>
                </div>
            </nav>

            <nav className="navProductos">
                <h1 className="h1Info">
                    <span className="text">Productos</span>
                    <FaFireExtinguisher className="icons"></FaFireExtinguisher>
                </h1>
                <div>
                    <article className="articleInfo">
                        La empresa ExtinSur y sus empleados se encuentran
                        capacitados para ofrecer servicios de mantenimiento,
                        cambio de agen

                    </article>

                    <article className="articleInfo">

                    </article>

                    <article className="articleInfo">
                        Coordenadas exactas:
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 </a>
                    </article>
                </div>
            </nav>


        </>
    );
};
export default Nav_index;
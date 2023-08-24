import { FaStore, FaFire, FaMapMarked, FaBroom, FaBriefcase, FaCogs, FaTools, FaDirections, FaFireExtinguisher, FaEnvelopeOpenText, FaWhatsapp, FaPortrait, FaIcons } from 'react-icons/fa'
import Link from "next/link";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";

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
                        <a className="linkMaps" href=" https://maps.app.goo.gl/h9W78QoU8gpUr5uR9 "> Oficinas ExtinSur </a>
                    </article>
                    <article className='caruselResponsive'>

                        <Carousel
                            autoPlay={true}
                            interval={4000}
                            infiniteLoop={true}
                            showThumbs={false}

                        >
                            <div>

                                <Image width="300" height="300" className="fotos" src="/indexInicio/extintor_rotulo.png" alt="11" />
                            </div>
                            <div>

                                <Image width="300" height="300" className="fotos" src="/indexInicio/varios_extintores.jpg" alt="11" />
                            </div>
                            <div>

                                <Image width="300" height="300" className="fotos" src="/indexInicio/extintor-para-incendios-abc.jpg" alt="11" />
                            </div>

                        </Carousel>

                    </article>



                </div>
            </nav>

            <nav className="navInfoFotos">



                <article>

                    <Carousel
                        autoPlay={true}
                        interval={4000}
                        infiniteLoop={true}
                        showThumbs={false}

                    >
                        <div>

                            <Image width="300" height="300" className="fotos" src="/indexInicio/extintor_rotulo.png" alt="11" />
                        </div>
                        <div>

                            <Image width="300" height="300" className="fotos" src="/indexInicio/varios_extintores.jpg" alt="11" />
                        </div>
                        <div>

                            <Image width="300" height="300" className="fotos" src="/indexInicio/extintor-para-incendios-abc.jpg" alt="11" />
                        </div>

                    </Carousel>

                </article>


            </nav>

            <nav className="navDireccion">
                <h1 className="h1Info">
                    <span className="text">Puestos de venta</span>
                    <FaMapMarked className="icons"></FaMapMarked>
                </h1>
                <div>
                    <article className="articleInfo">
                        <table className="tablaUbication">
                            <thead>
                                <tr>
                                    <th>Ubicación</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='filas'><a className='textUbicacion' href=' https://maps.app.goo.gl/Lpd7S5KN3sxP4FcD7'> Ciudad Neily frente al instituto cated </a> </td>
                                </tr>
                                <tr>

                                    <td className='filas'><a className='textUbicacion' href=' https://maps.app.goo.gl/8HDRTyBW89rJ3KKq6'> Rio claro frente la bomba </a> </td>
                                </tr>
                            </tbody>
                        </table>

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
                            <span className="textOpcionesPro">Mantenimiento</span>
                            <FaCogs className="iconsPro"></FaCogs>
                        </Link>
                    </article>

                    <article className="articleInfo">
                        <Link href="/IndexInicioSesion" className="buttonBorder">
                            <span className="textOpcionesPro">Recarga</span>
                            <FaBroom className="iconsPro"></FaBroom>
                        </Link>
                    </article>

                    <article className="articleInfo">
                        <Link href="/IndexInicioSesion" className="buttonBorder">
                            <span className="textOpcionesPro">Revisión</span>
                            <FaBriefcase className="iconsPro"></FaBriefcase>
                        </Link>
                    </article>
                </div>
            </nav>



            <nav className="navProductos">
                <h1 className="h1Info">
                    <span className="text">Productos</span>
                    <FaStore className="icons"></FaStore>
                </h1>
                <div>
                    <article className="articleInfo">
                        <Link href="/IndexInicioSesion" className="buttonBorder">
                            <span className="textOpcionesPro">Extintores</span>
                            <FaFireExtinguisher className="iconsPro"></FaFireExtinguisher>
                        </Link>

                    </article>
                    <article className='articleInfo'>
                        <Link href="/IndexInicioSesion" className="buttonBorder">
                            <span className="textOpcionesPro">Rotulos</span>
                            <FaDirections className="iconsPro"></FaDirections>
                        </Link>
                    </article>
                </div>
            </nav>

        </>
    );
};
export default Nav_index;
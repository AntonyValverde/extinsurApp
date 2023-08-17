import Link from "next/link";
import { FaRegUserCircle, FaFire, FaMapMarked, FaTools, FaSistrix, FaFacebook, FaInstagram, FaEnvelopeOpenText, FaWhatsapp, FaPortrait, FaIcons } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <div className="body">
        <header>
          <div className="Header">

            <h1 className="nombreEmpresa">ExtinSurr</h1>

            <div className="contenedorBusqueda">
              <input className="barraBusqueda" type="text" />
              <FaSistrix className="lupa" ></FaSistrix>
            </div>

            <nav className="navegation">
              <Link href="/IndexInicioSesion" className="buttonBorder">
                <span className="text">Iniciar Secion</span>
                <FaRegUserCircle className="icons"></FaRegUserCircle>
              </Link>
            </nav>

          </div>
        </header>

        <nav>
          <div>

          </div>
        </nav>

        <nav className="navInfo">
          <h1 className="h1Info">
          <span className="text">Extinsur</span>
            <FaFire className="icons"></FaFire>
          </h1>
          <div>
            <article className="articleInfo">
              ExtinSur corredores, servicios de mantenimiento y seguridad ciudadana,
              estamos siempre para usted, mira nuestros productos de mejor calidad y
              visitanos en nuestro puestos de venta.
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

        <footer className="footerInicio">
          <div>
            <div>
              <h2>Contactos <FaPortrait className="icons"></FaPortrait></h2>
              <div>
                <h3>8324-4323</h3>
                <h3>4342-5924</h3>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2>WhatsApp <FaWhatsapp className="icons"></FaWhatsapp></h2>
              <div>
                <h3>8484-3323</h3>
                <h3>7483-4934</h3>
              </div>
            </div>
          </div>

          <div>
            <h1>Correos <FaEnvelopeOpenText className="icons"></FaEnvelopeOpenText></h1>
            <div>
              <h3>extinsurdigital@gmail.com</h3>
            </div>
          </div>

          <div>
            <h1>Redes Sociales <FaIcons className="icons"></FaIcons></h1>
            <div>
              <h2>Instagram <FaInstagram className="icons"></FaInstagram></h2>
              <div>

                <a className="linkMaps" href=" https://instagram.com/extinsurextintores?igshid=MzRlODBiNWFlZA== ">extinsurextintores</a>

              </div>
              <h2>Facebook <FaFacebook className="icons"></FaFacebook></h2>
              <div>
                <a className="linkMaps" href=" https://www.facebook.com/extinsur.extintores ">Extinsur Extintores </a>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </>

  )
}

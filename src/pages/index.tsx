import Link from "next/link";
import{ FaRegUserCircle, FaFire, FaMapMarked, FaTools } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <div className="body">
        <header>
          <div className="Header">

            <h1 className="nombreEmpresa">ExtinSurr</h1>

            <div className="contenedorBusqueda">
              <input className="barraBusqueda" type="text" />
              <img src="/indexInicio/lupa.png" alt="lupa" className="lupa" />
            </div>

            <nav className="navegation">
              <Link href="/IndexInicioSesion" className="buttonBorder">
                Iniciar Secion.
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
            Extinsur.
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
            Puestos de venta. 
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
            Servicios.
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
          <h1 className="contactos">Contactanos</h1>
          <div>
            <div>
              <h2>WhatsApp</h2>
              <div>
                <h3>8484-3323</h3>
                <h3>7483-4934</h3>
              </div>  
            </div>
          </div>

          <div>
            <h1>Correos</h1>
            <div>
              <h3>extinsurdigital@gmail.com</h3>
            </div>
          </div>

          <div>
            <h1>Redes Sociales</h1>
            <div>
              <h2>Instagram</h2>
              <div>
                
                <a className="linkMaps" href=" https://instagram.com/extinsurextintores?igshid=MzRlODBiNWFlZA== ">extinsurextintores</a>
                
              </div>
              <h2>Facebook</h2>
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

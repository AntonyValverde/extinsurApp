import {
  FaStore,
  FaFire,
  FaMapMarked,
  FaBroom,
  FaBriefcase,
  FaCogs,
  FaTools,
  FaDirections,
  FaFireExtinguisher,
} from "react-icons/fa";
import {
  collection,
  getDocs,
  getFirestore,

} from "firebase/firestore";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";

interface NavProps {
  UbicacionDatas: {
    Descripcion: string;
    enlace: string;
    HoraInicio: string;
    HoraCierre: string;
  }[];
  handleRecargaClick: () => void;
  handleRevisionClick: () => void;
  handleModalClick: () => void;
  handleModalCloseClick: () => void;
  handleModalCloseDoss: () => void;
}

const Nav_index: React.FC<NavProps> = ({
  UbicacionDatas,
  handleRecargaClick,
  handleRevisionClick,
  handleModalClick,
  handleModalCloseClick,
  handleModalCloseDoss

}) => {
  //Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);

  const [UbicacionData, setUbicacionData] = useState<any[]>([]);

  const [IsMantenimiento, setMantenimiento] = useState(false);
  const [IsRevision, setRevision] = useState(false);
  const [IsRecarga, setRecarga] = useState(false);

  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
    document.body.classList.add("modal-open");
  };
  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
    document.body.classList.remove("modal-open");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  const handleMantenimientoOpen = () => {
    setMantenimiento(true);
    document.body.classList.add("modal-open");
  };
  const handleMantenimientoClose = () => {
    setMantenimiento(false);
    document.body.classList.remove("modal-open");
  };

  const handleRecargaOpen = () => {
    setRecarga(true);
    document.body.classList.add("modal-open");
  };
  const handleRecargaClose = () => {
    setRecarga(false);
    document.body.classList.remove("modal-open");
  };

  const handleRevisionOpen = () => {
    setRevision(true);
    document.body.classList.add("modal-open");
  };
  const handleRevisionClose = () => {
    setRevision(false);
    document.body.classList.remove("modal-open");
  };

  //Consume fireBase
  useEffect(() => {
    const ubicacionData = async () => {
      try {
        const queryDB = await getDocs(collection(db, "Ubicacion"));
        const data: React.SetStateAction<any[]> = [];
        queryDB.forEach((doc) => {
          data.push(doc.data());
        });
        setUbicacionData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    ubicacionData();
  }, []);

  return (
    <>
      <div className="Center" data-testid="div-principal">
        <nav className="navInfo" data-testid="nav-info">
          <h1 className="h1Info" title="Titulo Inicio" data-testid="h1-titulo-inicio">
            <span className="text" title="Titulo Inicio" data-testid="span-titulo-inicio">Extinsur</span>
            <FaFire className="icons" data-testid="icons-fire"></FaFire>
          </h1>
          <div data-testid="div-articulos">
            <article title="InfoArticulo" className="articleInfo" data-testid="article-info1">
              ExtinSur corredores, servicios de mantenimiento y seguridad
              ciudadana, estamos siempre para usted, mira nuestros productos de
              mejor calidad y visítanos en nuestros puestos de venta.
            </article>

            <article className="articleInfo" data-testid="article-info2">
              Oficinas en San Rafael de Ciudad Neily, entrada frente al salón
              comunal.
            </article>

            <article className="articleInfo" data-testid="article-info3">
              Coordenadas exactas:
              <a
                className="linkMaps"
                href="https://maps.app.goo.gl/h9W78QoU8gpUr5uR9"
                data-testid="link-maps"
              >
                {" "}
                Oficinas ExtinSur{" "}
              </a>
            </article>

            <article className="articleInfo" data-testid="article-info">
              <h1 className="h1Info" data-testid="h1-puestos-venta">
                <span className="text" data-testid="span-puestos-venta">Puestos de venta</span>
                <FaMapMarked className="icons" data-testid="icons-map"></FaMapMarked>
              </h1>

              <div className="ContenedorUbicacion" data-testid="ContenedorUbicacion">
                <article className="articleInfoTres" data-testid="article-info-tres">
                  <table className="tablaUbication" data-testid="table-ubicacion">
                    <thead>
                      <tr>
                        <th>Ubicación</th>
                        <th>Link</th>
                        <th>Horario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UbicacionData.map((user, index) => (
                        <tr key={index} data-testid={'ubicacion-row-${index}'}>
                          <td className="textU" data-testid={`ubicacion-descripcion-${index}`}>
                            {user.Descripcion ?? "-"}
                          </td>
                          <td className="textU" data-testid={`ubicacion-enlace-${index}`}>
                            {user.enlace ?? "-"}
                          </td>
                          <td className="textU" data-testid={`ubicacion-horario-${index}`}>
                            {user.HoraInicio ?? "-"} / {user.HoraCierre ?? "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              </div>
            </article>
            <article className="articleDos" data-testid="article-servicios">
              <h1 className="h1Info">
                <span className="text" data-testid="span-servicios">Servicios</span>
                <FaTools className="icons" data-testid="icons-servicios"></FaTools>
              </h1>
              <div>
                <article className="articleInfo" data-testid="article-mantenimiento">
                  <button
                    onClick={handleMantenimientoOpen}
                    className="buttonBorderDos"
                    data-testid="button-mantenimiento"
                  >
                    <span className="textOpcionesPro" data-testid="span-mantenimiento">Mantenimiento</span>
                    <FaCogs className="iconsPro" data-testid="icons-mantenimiento"></FaCogs>
                  </button>
                </article>

                <article className="articleInfo" data-testid="article-recarga">
                  <button
                    onClick={handleRecargaOpen}
                    className="buttonBorderDos"
                    data-testid="button-recarga"
                  >
                    <span className="textOpcionesPro" data-testid="span-recarga">Recarga</span>
                    <FaBroom className="iconsPro" data-testid="icons-recarga"></FaBroom>
                  </button>
                </article>

                <article className="articleInfo" data-testid="article-revision">
                  <button
                    onClick={handleRevisionOpen}
                    className="buttonBorderDos"
                    data-testid="button-revision"
                  >
                    <span className="textOpcionesPro" data-testid="span-revision">Revisión</span>
                    <FaBriefcase className="iconsPro" data-testid="icons-revision"></FaBriefcase>
                  </button>
                </article>
              </div>
            </article>

            <article className="articleDos" data-testid="article-productos">
              <h1 className="h1Info">
                <span className="text">Productos</span>
                <FaStore className="icons"></FaStore>
              </h1>
              <div>
                <article className="articleInfo" data-testid="article-extintores">
                  <button
                    onClick={handleModalOpenDos}
                    className="buttonBorderDos"
                    data-testid="button-extintores"
                  >
                    <span className="textOpcionesPro">Extintores</span>
                    <FaFireExtinguisher className="iconsPro"></FaFireExtinguisher>
                  </button>
                </article>
                <article className="articleInfo" data-testid="article-rotulos">
                  <button
                    onClick={handleModalOpen}
                    className="buttonBorderDos"
                    data-testid="button-rotulos"
                  >
                    <span className="textOpcionesPro">Rotulos</span>
                    <FaDirections className="iconsPro"></FaDirections>
                  </button>
                </article>
              </div>
              <section data-testid="modal-section">
                {isModalOpenDos && (
                  <div className="modalNavExtintor ">
                    <div
                      className="modalDivExtintor"
                      style={{
                        background: "#f7f7f7",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <button
                        className="icon-close"
                        onClick={handleModalCloseDos}
                        style={{
                          background: "none",
                          borderRadius: "10px",
                          border: "1px solid",
                          color: "#555",
                          fontSize: "16px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        SALIR
                      </button>
                      <article style={{ textAlign: "center" }}>
                        <h2
                          style={{
                            fontSize: "24px",
                            marginBottom: "20px",
                            color: "#333",
                          }}
                        >
                          Imágenes de Extintores
                        </h2>
                        <Carousel
                          autoPlay={true}
                          interval={4000}
                          infiniteLoop={true}
                          showThumbs={false}
                        >
                          <div>
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/extintor_rotulo.png"
                              alt="Extintor con rótulo"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                          <div>
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/varios_extintores.jpg"
                              alt="Varios extintores"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                          <div>
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/extintor-para-incendios-abc.jpg"
                              alt="Extintor para incendios ABC"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                        </Carousel>
                      </article>
                    </div>
                  </div>
                )}
              </section>

              <section data-testid="modal-section">
                {isModalOpen && (
                  <div className="modalNavExtintor " data-testid="modal-container">
                    <div
                      className="modalDivExtintor"
                      style={{
                        background: "#f7f7f7",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <button
                        className="icon-close"
                        onClick={handleModalClose}
                        style={{
                          background: "none",
                          borderRadius: "10px",
                          border: "1px solid",
                          color: "#555",
                          fontSize: "16px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                        data-testid="close-button"
                      >
                        SALIR
                      </button>
                      <article style={{ textAlign: "center" }} data-testid="rotulos-article">
                        <h2
                          style={{
                            fontSize: "24px",
                            marginBottom: "20px",
                            color: "#333",
                          }}
                        >
                          Imágenes de Rotulos
                        </h2>
                        <Carousel
                          autoPlay={true}
                          interval={4000}
                          infiniteLoop={true}
                          showThumbs={false}
                        >
                          <div data-testid="image-div1">
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/extintor_rotulo.png"
                              alt="Extintor con rótulo"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                          <div data-testid="image-div2">
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/varios_extintores.jpg"
                              alt="Varios extintores"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                          <div data-testid="image-div3">
                            <img
                              width="300"
                              height="300"
                              className="fotos"
                              src="/indexInicio/extintor-para-incendios-abc.jpg"
                              alt="Extintor para incendios ABC"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                        </Carousel>
                      </article>

                    </div>
                  </div>
                )}
              </section>
              <section data-testid="mantenimiento-section2">
                {IsMantenimiento && (
                  <div className="modalNavExtintor " data-testid="mantenimiento-container">
                    <div
                      className="modalDivExtintor"
                      style={{
                        background: "#f7f7f7",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <button
                        className="icon-close"
                        onClick={handleMantenimientoClose}
                        style={{
                          background: "none",
                          borderRadius: "10px",
                          border: "1px solid",
                          color: "#555",
                          fontSize: "18px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                        data-testid="close-button-mantenimiento"
                      >
                        SALIR
                      </button>
                      <article style={{ textAlign: "center" }} data-testid="mantenimiento-article">
                        <h1
                          style={{
                            fontSize: "35px",
                            marginBottom: "10px",
                            color: "#ff0000",
                          }}
                        >
                          Servicios de Mantenimiento
                        </h1>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Ofrecemos un servicio integral de mantenimiento
                          diseñado para empresas, instituciones, locales
                          comerciales y tiendas que adquieran extintores en
                          grandes cantidades y estén obligadas por ley a
                          someterlos a revisiones anuales.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Nuestro servicio de mantenimiento especializado
                          garantiza que sus extintores estén en condiciones
                          óptimas para responder eficazmente en caso de
                          emergencia. Trabajamos con negocios que comprenden la
                          importancia de contar con equipos de seguridad
                          confiables y funcionales.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Al optar por nuestro servicio, no solo adquiere
                          extintores de alta calidad en cantidad, sino que
                          también asegura su tranquilidad a lo largo del tiempo.
                          Realizamos revisiones exhaustivas anualmente para
                          asegurarnos de que cada extintor cumpla con los
                          estándares y regulaciones requeridos.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Nuestro equipo de técnicos altamente capacitados se
                          encargará de todo el proceso, desde la entrega inicial
                          de los extintores hasta la planificación y ejecución
                          de las revisiones anuales. Además, entendemos que las
                          necesidades pueden variar con el tiempo, por lo que
                          puede cancelar el servicio en cualquier momento si así
                          lo desea.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Invierta en la seguridad de su negocio con nuestro
                          servicio de mantenimiento de extintores. Garantizamos
                          un ambiente más seguro para sus empleados, clientes y
                          propiedades, cumpliendo con las obligaciones legales
                          de revisión anual. Contáctenos para conocer más sobre
                          cómo podemos adaptarnos a las necesidades específicas
                          de su negocio y proporcionarle un servicio confiable y
                          eficiente.
                        </h2>
                      </article>
                    </div>
                  </div>
                )}
              </section>
              <section data-testid="recarga-section">
                {IsRecarga && (
                  <div className="modalNavExtintor " data-testid="recarga-container">
                    <div
                      className="modalDivExtintor"
                      style={{
                        background: "#f7f7f7",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <button
                        className="icon-close"
                        onClick={handleRecargaClose}
                        style={{
                          background: "none",
                          borderRadius: "10px",
                          border: "1px solid",
                          color: "#555",
                          fontSize: "16px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                        data-testid="close-button-recarga"
                      >
                        SALIR
                      </button>
                      <article style={{ textAlign: "center" }} data-testid="recarga-article">
                        <h1
                          style={{
                            fontSize: "35px",
                            marginBottom: "20px",
                            color: "#ff0000",
                          }}
                        >
                          Servicios de Recarga
                        </h1>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Ofrecemos servicios de recarga de extintores disponibles en diversos puntos de venta para empresas, personas y cualquier entidad que adquiera extintores.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Nuestro servicio de recarga garantiza que sus
                          extintores estén siempre en óptimas condiciones y
                          listos para actuar en caso de emergencia. Estamos
                          comprometidos con la seguridad de su negocio, hogar o
                          institución.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Contamos con puntos de venta estratégicamente ubicados
                          para brindarle la conveniencia de recargar sus
                          extintores de manera rápida y eficiente. Nuestros
                          técnicos altamente capacitados se encargan de todo el
                          proceso, asegurando que sus extintores cumplan con los
                          estándares de seguridad necesarios.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          No importa si necesita recargar un solo extintor o
                          varios, estamos aquí para satisfacer sus necesidades.
                          La seguridad no debe comprometerse, y con nuestros
                          servicios de recarga, puede estar seguro de que su
                          equipo de extintores funcionará de manera confiable en
                          todo momento.
                        </h2>
                      </article>
                    </div>
                  </div>
                )}
              </section>
              <section  data-testid="revision-section">
                {IsRevision && (
                  <div className="modalNavExtintor" data-testid="revision-container">
                    <div
                      className="modalDivExtintor"
                      style={{
                        background: "#f7f7f7",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <button
                        className="icon-close"
                        onClick={handleRevisionClose}
                        style={{
                          background: "none",
                          borderRadius: "10px",
                          border: "1px solid",
                          color: "#555",
                          fontSize: "16px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                        data-testid="close-button-revision"
                      >
                        SALIR
                      </button>
                      <article style={{ textAlign: "center" }} data-testid="revision-article"> 
                        <h1
                          style={{
                            fontSize: "35px",
                            marginBottom: "20px",
                            color: "#ff0000",
                          }}
                        >
                          Servicios de Recarga
                        </h1>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Ofrecemos un servicio de revisión de extintores
                          dirigido a empresas, individuos y diversas entidades
                          que adquieran extintores.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Nuestro servicio de revisión tiene como objetivo
                          verificar el estado de uno o varios extintores. En
                          caso de detectarse algún error o deterioro durante la
                          revisión, nuestro equipo brindará soluciones precisas.
                          Estas soluciones pueden involucrar el reemplazo o
                          reparación de empaques, contenido, gas, mangueras,
                          fuga u otros problemas detectados, siempre que sean
                          problemas solucionables por nuestros técnicos.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          Entendemos la importancia de contar con extintores
                          plenamente funcionales para garantizar la seguridad en
                          su entorno. Nuestros expertos altamente capacitados se
                          aseguran de que cada extintor cumpla con los
                          estándares de seguridad necesarios y esté preparado
                          para actuar en situaciones críticas.
                        </h2>
                        <h2
                          style={{
                            fontSize: "25px",
                            marginBottom: "10px",
                            color: "#000000",
                          }}
                        >
                          No importa si es una empresa grande o un individuo
                          preocupado por la seguridad de su hogar, nuestro
                          servicio de revisión de extintores está diseñado para
                          satisfacer diversas necesidades. Mantener sus
                          extintores en condiciones óptimas es esencial, y
                          estamos aquí para proporcionar un servicio confiable y
                          eficiente.
                        </h2>
                      </article>
                    </div>
                  </div>
                )}
              </section>
            </article>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Nav_index;

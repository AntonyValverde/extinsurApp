import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import IndexGerenteInicioUno from "../IndexGerenteInicioUno";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Ubicacion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);

  const [Descripcion, setDescripcion] = useState("");
  const [HoraCierre, setHoraCierre] = useState("");
  const [HoraInicio, setHoraInicio] = useState("");
  const [Id, setId] = useState("");
  const [enlace, setEnlace] = useState("");
   
  //Modals Eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //Tablas
  const [UbicationData, setUbicationData] = useState<any[]>([]);
  //Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpenDos) {
    }
  }, [isModalOpenDos]);
  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
  };
  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
  };

  useEffect(() => {
    if (isModalOpenTres) {
    }
  }, [isModalOpenTres]);
  const handleModalOpenTres = () => {
    setIsModalOpenTres(true);
  };
  const handleModalCloseTres = () => {
    setIsModalOpenTres(false);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleModalClose;
  };

  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const colors = ["white", "lightblue", "lightgreen", "lightpink"];

  const changeBackgroundColor = (selectedColor: string) => {
    setBackgroundColor(selectedColor);

    if (typeof window !== "undefined") {
      localStorage.setItem("backgroundColor", selectedColor);
    }
  };

  useEffect(() => {
    document
      .querySelector(".containerSidebar")
      ?.setAttribute("style", `background: ${backgroundColor}`);
  }, [backgroundColor]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBackgroundColor = localStorage.getItem("backgroundColor");
      if (storedBackgroundColor) {
        setBackgroundColor(storedBackgroundColor);
      }
    }
  }, []);

  //Consume tabla de Ubicacion
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const querydb = await getDocs(collection(db, "Ubicacion"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setUbicationData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    fetchDates();
  }, []);

  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioUno />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Ubicación</h1>
              <div className="linea"></div>
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                  />
                </div>
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Descipcion</th>
                      <th>Horario</th>
                      <th>Dirección</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UbicationData.map((Id, index) => {
                      const userDataIndex =
                        index < UbicationData.length ? index : null;

                      return (
                        <tr key={index}>
                          <td>
                            {userDataIndex !== null
                              ? UbicationData[userDataIndex].Descripcion
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? UbicationData[userDataIndex].HoraInicio
                              : ""}{" "}
                            /{" "}
                            {userDataIndex !== null
                              ? UbicationData[userDataIndex].HoraCierre
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? UbicationData[userDataIndex].enlace
                              : ""}
                          </td>
                           
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <button className="icon-close" onClick={handleModalClose}>
                      SALIR
                    </button>
                  </div>
                </div>
              )}
            </section>
            <section>
              {isModalOpenDos && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="icon-close"
                      onClick={handleModalCloseDos}
                    >
                      SALIR
                    </button>
                  </div>
                </div>
              )}
            </section>
            <section>
              {isModalOpenTres && (
                <div className="modal">
                  <div className="modal-content">
                    <div>
                      <button
                        className="icon-close"
                        onClick={handleModalCloseTres}
                      >
                        <FaDoorOpen></FaDoorOpen>
                      </button>
                    </div>

                    <form className="contenedorUbicacion">
                      <h1 className="tituloUbicacion">Ubicación</h1>
                      <h2 className="textColocar">Colocar Dirección</h2>
                      <input className="inputColocar" type="text" />
                      <h2 className="textColocar">Colocar Descripción</h2>
                      <input className="inputColocar" type="text" />
                      <button className="btnAgregar">Agregar</button>
                    </form>
                  </div>
                </div>
              )}
            </section>
            <div className="linea"></div>
            <section>
              <div className="containerButton">
              <Link className="sidebar_linkTres" href="/Empleados/ProductosEm">
                  Productos
                </Link>
                <Link
                  className="sidebar_linkTres"
                  href="/Empleados/MantenimientoEm"
                >
                  Mantenimiento
                </Link>
                <Link className="sidebar_linkTres" href="/Empleados/MovimientosEm">
                  Movimientos
                </Link>
                 
                <Link className="sidebar_linkTres" href="/">
                  Inicio
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import Link from "next/link";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import firebaseConfig from "@/firebase/config";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/compat/firestore";
import TimePicker from "react-time-picker";

export default function Ubicacion() {
  //Variables
  const [Descripcion, setDescripcion] = useState("");
  const [HoraCierre, setHoraCierre] = useState("");
  const [HoraInicio, setHoraInicio] = useState("");
  const [Id, setId] = useState("");
  const [enlace, setEnlace] = useState("");
  //Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
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
    setEnlace("");
    setDescripcion("");
    setHoraInicio("");
    setHoraCierre("");
  };

  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const colors = [
    "#294D61",
    "#6DA5C0",
    "#0F9690",
    "#0C7075",
    "#072E33",
    "#26425A",
    "#AAAAAA",
    "#808080",
    "#555555",
  ];

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
  const [showColors, setShowColors] = useState(false);
  const toggleColorVisibility = () => {
    setShowColors(!showColors);
  };

  //Agregar ubicacion
  const handleFormSubmitUbication = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Ubicacion");
      const queryDB = await getDocs(
        query(usersRef, where("Link", "==", enlace))
      );
      if (!queryDB.empty) {
        return;
      }

      const ubicationData = {
        enlace,
        HoraInicio,
        HoraCierre,
        Descripcion,
      };

      await addDoc(collection(db, "Ubicacion"), ubicationData);

      handleModalCloseTres();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

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
            <IndexGerenteInicioDos />
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
                  <button
                    onClick={handleModalOpenTres}
                    className="RegistrarButton"
                  >
                    Registrar
                  </button>
                  <div className="RegistrarButton">
                    <button onClick={toggleColorVisibility}>
                      {showColors ? "Ocultar colores" : "Mostrar colores"}
                    </button>
                    <div
                      className={`colorPalette ${
                        showColors ? "visible" : "hidden"
                      }`}
                    >
                      {colors.map((color) => (
                        <div
                          key={color}
                          className="colorBox"
                          style={{ backgroundColor: color }}
                          onClick={() => changeBackgroundColor(color)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Descipcion</th>
                      <th>Horario</th>
                      <th>Dirección</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {UbicationData.map((users, index) => {
                      const userDataIndex =
                        index < UbicationData.length ? index : null;

                      return (
                        <tr key={users.enlace}>
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
                          <td>
                            <FaTrash
                              className="iconsEliminar"
                              title="Eliminar."
                            />
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
                        <FaDoorOpen className="iconsClose"></FaDoorOpen>
                      </button>
                    </div>

                    <form
                      className="contenedorUbicacion"
                      onSubmit={handleFormSubmitUbication}
                    >
                      <h1 className="tituloUbicacion">Ubicación</h1>
                      <h2 className="textColocar">Colocar Dirección</h2>
                      <input
                        className="inputColocar"
                        type="text"
                        placeholder="Link"
                        value={enlace}
                        onChange={(e) => setEnlace(e.target.value)}
                      />

                      <h2 className="textColocar">Colocar hora</h2>
                      <h2 className="textColocarHora">Hora Inicio:</h2>
                      <input
                        className="inputColocarHora"
                        type="text"
                        placeholder="7:00 am"
                        value={HoraInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                      <h2 className="textColocarHora">Hora Cierre:</h2>
                      <input
                        className="inputColocarHora"
                        type="text"
                        placeholder="5:00 pm"
                        value={HoraCierre}
                        onChange={(e) => setHoraCierre(e.target.value)}
                      />

                      <h2 className="textColocar">Colocar Descripción</h2>
                      <input
                        className="inputColocar"
                        type="text"
                        placeholder="Detalle"
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />

                      <button className="btnAgregar" type="submit">
                        Agregar
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </section>
            <div className="linea"></div>
            <section>
              <div className="containerButton">
                <Link className="sidebar_linkTres" href="/Gerentes/Empleados">
                  Empleados
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Productos">
                  Productos
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Movimientos">
                  Movimientos
                </Link>
                <Link
                  className="sidebar_linkTres"
                  href="/Gerentes/Mantenimiento"
                >
                  Mantenimiento
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Ubicacion">
                  Ubicación
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">
                  Gráficas
                </Link>

                <div className="sidebar_linkTres center-button">
                  <a href="./RegistrarEmpleados"> Agregar</a>
                </div>

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

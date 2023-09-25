import { FaInfo, FaTrash, FaPenSquare, FaEdit } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import Link from "next/link";
import router from "next/router";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import React, { useState, useEffect } from "react";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "@/firebase/config";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/compat/firestore";

export default function Empleados() {
  const [isModalOpen, setIsEditarOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);

  const [borrarConfirmado, setBorrarConfirmado] = useState(false);

  const [userData, setUserData] = useState<any[]>([]);
  const [dataCaja, setDataCaja] = useState<any[]>([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);

  const EditarOpen = () => {
    setIsEditarOpen(true);
  };

  const handleModalClose = () => {
    setIsEditarOpen(false);
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

  const confirmarBorrar = () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas borrar esto? Esta acción no se puede deshacer."
    );

    if (confirmacion) {
      // Si el usuario confirma, realizar la acción de borrado aquí
      // Puedes ejecutar tu lógica de borrado o hacer una llamada a una API aquí
      // Ejemplo: eliminarItem(id);
      setBorrarConfirmado(true);
    } else {
      // Si el usuario cancela, no hagas nada
    }

    <div>
      {borrarConfirmado ? (
        <p>El elemento ha sido borrado.</p>
      ) : (
        <div>
          <button onClick={confirmarBorrar}>Borrar</button>
        </div>
      )}
    </div>;
  };

  const [backgroundColor, setBackgroundColor] = useState<string>("#6DA5C0");
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
    const fetchUserData = async () => {
      try {
        const queryDB = await getDocs(collection(db, "Empleados"));
        const data: React.SetStateAction<any[]> = [];
        queryDB.forEach((doc) => {
          data.push(doc.data());
        });
        setUserData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const fetchData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Usuarios"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setDataCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    fetchData();
    fetchUserData();
  }, []);

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

  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Empleados</h1>

              <div className="linea"></div>
              <div className="tabla-container">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                  />
                  <Link className="RegistrarButton" href="./RegistrarEmpleados">
                    Registrar
                  </Link>
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
                      <th>Nombre</th>
                      <th>Primer Apellido</th>
                      <th>Segundo Apellido</th>
                      <th>Sexo</th>
                      <th>Estado</th>
                      <th>Tipo</th>
                      <th>Correo</th>
                      <th>Contraseña</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((users, index) => (
                      <tr key={users.Id}>
                        <td>{users.Nombre}</td>
                        <td>{users.ApellidoUno}</td>
                        <td>{users.ApellidoDos}</td>
                        <td>{users.Sexo}</td>
                        <td>{users.Estado}</td>

                        {index < dataCaja.length ? (
                          <>
                            <td>{dataCaja[index].Tipo}</td>
                            <td>{dataCaja[index].Email}</td>
                            <td>
                              {dataCaja[index].Contrasena?.length
                                ? "*".repeat(dataCaja[index].Contrasena.length)
                                : "*"}
                            </td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td></td>
                            <td></td>
                          </>
                        )}
                        <td>
                          <FaEdit className="iconsEdit" title="Editar." />
                          <IoInformationCircleSharp
                            className="iconsInfo"
                            title="Más Información."
                          />
                          <FaTrash
                            className="iconsEliminar"
                            title="Eliminar."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              {isModalOpen && (
                <div className="modal ">
                  <button
                    className="icon-close"
                    onClick={handleModalClose}
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
                  >
                    SALIR
                  </button>
                  <div
                    className="modal-content"
                    style={{
                      background: "#f7f7f7",
                      padding: "20px",

                      top: "10px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="linea" style={{ marginTop: "27px" }}></div>
                    <section className="tabla-container">
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Fecha Nacimientos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              10
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Carlos
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Flores
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Rojas
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              23/01/1963
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                    <div className="linea"></div>
                    <div className="linea" style={{ marginTop: "27px" }}></div>
                    <section className="tabla-container">
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Contraseña</th>
                            <th>Tipo</th>
                            <th>Tipo de Cédula</th>
                            <th>Cédula</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Carlos/-/flores1990@gmail.com
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Kisaa90
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Gerente
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              Nacional
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                            <td>
                              102317282
                              <FaPenSquare
                                onClick={EditarOpen}
                                className="iconsEdit"
                                title="Editar."
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                    <div className="linea"></div>
                  </div>
                </div>
              )}
            </section>
            <section>
              {isModalOpenDos && (
                <div className="modal ">
                  <div
                    className="modal-content"
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
                        fontSize: "18px",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      SALIR
                    </button>
                  </div>
                </div>
              )}
            </section>
            <section>
              {isModalOpenTres && (
                <div className="modal ">
                  <button
                    className="icon-close"
                    onClick={handleModalCloseTres}
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
                  >
                    SALIR
                  </button>
                  <div
                    className="modal-content"
                    style={{
                      background: "#f7f7f7",
                      padding: "20px",
                      top: "10px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="linea" style={{ marginTop: "27px" }}></div>
                    <section className="tabla-container">
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Fecha Nacimientos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10 </td>
                            <td>Carlos </td>
                            <td>Flores </td>
                            <td>Rojas</td>
                            <td>23/01/1963</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                    <div className="linea"></div>
                    <div className="linea" style={{ marginTop: "27px" }}></div>
                    <section className="tabla-container">
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Contraseña</th>
                            <th>Tipo</th>
                            <th>Tipo de Cédula</th>
                            <th>Cédula</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Carlos/-/flores1990@gmail.com </td>
                            <td>Kisaa90 </td>
                            <td>Gerente </td>
                            <td>Nacional </td>
                            <td>102317282 </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                    <div className="linea"></div>
                  </div>
                </div>
              )}
            </section>
            <div className="linea"></div>
            <section>
              <div className="containerButton">
                <Link className="sidebar_linkDos" href="/Gerentes/Empleados">
                  Empleados
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Productos">
                  Productos
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Movimientos">
                  Movimientos
                </Link>
                <Link
                  className="sidebar_linkDos"
                  href="/Gerentes/Mantenimiento"
                >
                  Mantenimiento
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Ubicacion">
                  Ubicación
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Graficas">
                  Gráficas
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

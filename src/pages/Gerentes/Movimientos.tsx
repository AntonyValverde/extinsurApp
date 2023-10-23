import { FaDumpsterFire, FaEdit, FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";

export default function Movimientos() {
  //Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [isModalOpenCuatro, setIsModalOpenCuatro] = useState(false);
  //Leer tablas
  const [productData, setProductData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [fechData, setDataFech] = useState<any[]>([]);
  const [detalle, setDetalleData] = useState<any[]>([]);
  //Variables
  const [Codigo, setCodigo] = useState("");
  const [IdDetalle, setIdDetalle] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Empleado, setEmpleado] = useState("");
  const [Cedula, setCedula] = useState("");
  //Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //Modals
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
  //Modals 2
  useEffect(() => {
    if (isModalOpenDos) {
    }
  }, [isModalOpenDos]);
  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
  };
  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
    setEmpleado("");
    setCodigo("");
    setDescripcion("");
  };
  //Modals 3
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
  //Modals 4
  useEffect(() => {
    if (isModalOpenCuatro) {
    }
  }, [isModalOpenCuatro]);
  const handleModalOpenCuatro = () => {
    setIsModalOpenCuatro(true);
  };
  const handleModalCloseCuatro = () => {
    setIsModalOpenCuatro(false);
  };
  //Modal delete
  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    handleDeleteUser(Cedula);
    setShowDeleteModal(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  //Eliminar de la fireBase.
  const handleDeleteUser = async (Cedula: string) => {
    try {
      const employeesQuery = await getDocs(
        query(collection(db, "Usuarios"), where("Cedula", "==", Cedula))
      );

      if (!employeesQuery.empty) {
        // Si se encuentra un empleado con la misma cédula, eliminamos el documento del empleado
        const employeeDoc = employeesQuery.docs[0];
        const userId = employeeDoc.data().Cedula;

        // Eliminamos el documento del empleado
        const employeeRef = doc(db, "Usuarios", employeeDoc.id);
        await deleteDoc(employeeRef);

        // Buscamos el documento del usuario relacionado al empleado
        const usersQuery = await getDocs(
          query(collection(db, "Usuarios"), where("Cedula", "==", userId))
        );
      } else {
        console.log(
          "No se encontró ningún empleado con la cédula especificada."
        );
      }
    } catch (error) {
      console.log("No se elimino.");
    }
  };
  //Alert
  function mostrarAlertaTemporal(mensaje: string, tiempoVisible: number): void {
    const alertaDiv = document.createElement("div");
    alertaDiv.innerText = mensaje;
    alertaDiv.style.position = "fixed";
    alertaDiv.style.top = "20px";
    alertaDiv.style.left = "50%";
    alertaDiv.style.transform = "translateX(-50%)";
    alertaDiv.style.backgroundColor = "lightgray";
    alertaDiv.style.padding = "10px";
    alertaDiv.style.border = "1px solid black";
    alertaDiv.style.borderRadius = "5px";
    document.body.appendChild(alertaDiv);

    // Oculta la alerta después del tiempo especificado en milisegundos
    setTimeout(() => {
      document.body.removeChild(alertaDiv); // Elimina la alerta
    }, tiempoVisible);
  }
  //Colors
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

  //Numero ram
  const asignarNumeroAleatorio = () => {
    const numeroAleatorio = Math.floor(Math.random() * 99999);
    setIdDetalle(numeroAleatorio.toString());
    console.log(IdDetalle);
    setCodigo("");
  };

  //Add movimientos
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const usersRef = collection(db, "Movimientos");
      const queryDB = await getDocs(
        query(usersRef, where("IdDetalle", "==", IdDetalle))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Descripcion,
        Empleado,
        IdDetalle,
      };

      const extintoresData = {
        IdDetalle,
        Anno,
        Mes,
        Dia,
      };

      await addDoc(collection(db, "Movimientos"), productosData);
      await addDoc(collection(db, "FechaMovimiento"), extintoresData);

      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos :", error);
    }
  };
  //Add detalle
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const otraColeccionQuery = query(
        collection(db, "Productos"),
        where("Codigo", "==", Codigo) // Cambia "Codigo" por el nombre del campo que contiene el código en "OtraColeccion"
      );

      const otraColeccionSnapshot = await getDocs(otraColeccionQuery);

      if (!otraColeccionSnapshot.empty) {
        const fechaData = {
          IdDetalle,
          Codigo,
        };
        await addDoc(collection(db, "Detalle"), fechaData);
        setCodigo("");
        const tiempoVisibleEnMilisegundos = 5000;
        mostrarAlertaTemporal("Se agrego código.", tiempoVisibleEnMilisegundos);
      } else {
        const tiempoVisibleEnMilisegundos = 8000;
        mostrarAlertaTemporal(
          "No se encontro el producto",
          tiempoVisibleEnMilisegundos
        );
      }
    } catch (error) {
      console.error("Error al agregar datos :", error);
    }
  };
  //Obtiene las variables de fecha
  function obtenerFechaActual(): Date {
    return new Date();
  }

  const fechaActual: Date = obtenerFechaActual();

  const Anno: number = fechaActual.getFullYear();
  const Mes: number = fechaActual.getMonth() + 1; // El mes es zero-indexed, por eso sumamos 1
  const Dia: number = fechaActual.getDate();

  const handleOnClick = () => {
    handleModalOpenDos();
    asignarNumeroAleatorio(); // Llama a otra función aquí
  };
  //Consume firebase
  useEffect(() => {
    const UsertData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Movimientos"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setUserData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    const fetchData = async () => {
      try {
        const querydb = await getDocs(collection(db, "FechaMovimiento"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setDataFech(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const ProductData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Detalle"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setProductData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    ProductData();
    fetchData();
    UsertData();
  }, []);

  //Consume firebase detalle
  useEffect(() => {
    const DetalleData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Detalle"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.IdDetalle === IdDetalle) {
            data.push(detalle);
          }
        });
        setDetalleData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    DetalleData();
  }, [IdDetalle]); // Asegúrate de incluir codigoElegido en las dependencias

  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Movimientos</h1>
              <div className="linea"></div>
              {showDeleteModal && (
                <div className="modal">
                  <div className="modal-content">
                    <p className="textDos">
                      <FaDumpsterFire className="iconsClose" />
                      ¿Estás seguro de qué quieres eliminar este usuario?
                    </p>
                    <button className="botonRes" onClick={handleConfirmDelete}>
                      Sí
                    </button>
                    <button className="botonRes" onClick={handleCancelDelete}>
                      No
                    </button>
                  </div>
                </div>
              )}

              {/*Modals add movimiento */}
              <section>
                {isModalOpenDos && (
                  <div className="modal">
                    <div className="modal-content">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseDos}
                      />
                      <form onSubmit={handleFormSubmitOtro}>
                        <label className="textDos">Codigo:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                        />
                        <button
                          className="RegistrarButton"
                          type="submit"
                          id="mas"
                        >
                          Más
                        </button>
                      </form>
                      <form onSubmit={handleFormSubmitExtintor}>
                        <label className="textDos">Empleado:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Empleado}
                          placeholder="Nombre"
                          onChange={(e) => setEmpleado(e.target.value)}
                          required
                        />
                        <label className="textDos">Descripción:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Descripcion}
                          placeholder="Descripción"
                          onChange={(e) => setDescripcion(e.target.value)}
                          required
                        />

                        <button
                          className="RegistrarButton"
                          type="submit"
                          id="add"
                        >
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                  />
                  <button onClick={handleOnClick} className="RegistrarButton">
                    Movimiento
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
                      <th>Usuario</th>
                      <th>Id</th>
                      <th>Fecha Movimiento</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((users, index) => {
                      const userDataIndex =
                        index < userData.length ? index : null;

                      const dataTerceraTablaIndex =
                        index < fechData.length ? index : null;

                      return (
                        <tr key={users.IdDetalle}>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].Empleado
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].IdDetalle
                              : ""}
                          </td>
                          <td>
                            {dataTerceraTablaIndex !== null
                              ? fechData[dataTerceraTablaIndex].Dia
                              : " "}
                            /
                            {dataTerceraTablaIndex !== null
                              ? fechData[dataTerceraTablaIndex].Mes
                              : ""}
                            /
                            {dataTerceraTablaIndex !== null
                              ? fechData[dataTerceraTablaIndex].Anno
                              : ""}
                          </td>

                          <td>
                            <IoInformationCircleSharp
                              className="iconsInfo"
                              title="Más Información."
                              onClick={() => {
                                handleModalOpen();
                                setIdDetalle(users.IdDetalle);
                              }}
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
                    <FaRegTimesCircle
                      className="iconsClose"
                      onClick={handleModalClose}
                    />
                    <table className="TablaEmpleados">
                      <thead>
                        <tr>
                          <th>Usuario</th>
                          <th>Id</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalle.map((users, index) => {
                          const userDataIndex =
                            index < detalle.length ? index : null;

                          return (
                            <tr key={users.IdDetalle}>
                              <td className="code">
                                {userDataIndex !== null
                                  ? detalle[userDataIndex].Codigo
                                  : ""}
                              </td>
                              <td>
                                {userDataIndex !== null
                                  ? detalle[userDataIndex].IdDetalle
                                  : ""}
                              </td>

                              <td>
                                <IoInformationCircleSharp
                                  onClick={handleModalOpen}
                                  className="iconsInfo"
                                  title="Más Información."
                                />
                              </td>
                              <FaTrash
                                className="iconsEliminar"
                                title="Eliminar."
                                onClick={() => {
                                  handleDeleteModal();
                                  setCedula(users.Codigo);
                                }}
                              />
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            <section>
              {isModalOpenTres && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="icon-close"
                      onClick={handleModalCloseTres}
                    >
                      SALIR
                    </button>
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

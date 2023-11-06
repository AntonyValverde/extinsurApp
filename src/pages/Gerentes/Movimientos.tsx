import {
  FaDumpsterFire,
  FaEdit,
  FaRegTimesCircle,
  FaTrash,
} from "react-icons/fa";
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
  updateDoc,
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
  const [otro, setOtroData] = useState<any[]>([]);
  const [extintor, setExtintorData] = useState<any[]>([]);
  const [rotulos, setRotulosData] = useState<any[]>([]);
  //Variables
  const [Codigo, setCodigo] = useState("");
  const [IdDetalle, setIdDetalle] = useState("");
  const [IdMovimiento, setIdMovimiento] = useState("");
  const [Detalle, setDetalle] = useState("");
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
    setDetalle("");
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
    handleDeleteUser(Cedula, IdDetalle);
    setShowDeleteModal(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async (Codigo: string, IdDetalle: string) => {
    try {
      // Realiza una consulta compuesta para buscar documentos que cumplan con ambas condiciones
      const collectionRef = collection(db, "Detalle");
      const condition1 = where("Codigo", "==", Codigo);
      const condition2 = where("IdDetalle", "==", IdDetalle);

      const combinedQuery = query(collectionRef, condition1, condition2);

      const employeesQuery = await getDocs(combinedQuery);

      if (!employeesQuery.empty) {
        // Itera sobre los resultados para eliminar los documentos
        employeesQuery.forEach(async (employeeDoc) => {
          const employeeRef = doc(db, "Detalle", employeeDoc.id);
          await deleteDoc(employeeRef);
        });

        // A continuación, puedes buscar el documento del usuario relacionado al empleado, si es necesario.
      } else {
        console.log(
          "No se encontró ningún empleado con las condiciones especificadas."
        );
      }
    } catch (error) {
      console.log("No se eliminó el documento.", error);
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
    setIdMovimiento(numeroAleatorio.toString());
    console.log(IdMovimiento);
    setCodigo("");
  };

  //Add movimientos
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const usersRef = collection(db, "Movimiento");
      const queryDB = await getDocs(
        query(usersRef, where("IdMovimiento", "==", IdMovimiento))
      );
      if (!queryDB.empty) {
        return;
      }
      
      const productosData = {
        Anno,
        Dia,
        Mes,
        Detalle,
        IdMovimiento,
      };

      await addDoc(collection(db, "Movimiento"), productosData);
       

      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos :", error);
    }
  };
  //Add detalle
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();

    event.preventDefault();
    try {
      const sourceCollectionRef = collection(db, "Producto");
      const targetCollectionRef = collection(db, "Detalle");
      const querySnapshot = await getDocs(query(sourceCollectionRef, where("Codigo", "==", Codigo)));
  
      if (querySnapshot.empty) {
        setCodigo("");
        const tiempoVisibleEnMilisegundos = 5000;
        mostrarAlertaTemporal("No se encuentra el producto.", tiempoVisibleEnMilisegundos);
        return;
      }
  
      // Recuperar los datos de la consulta
      const sourceData = querySnapshot.docs[0].data();
  
       
      const detalleDato ={
          Anno: sourceData.Anno,
          Bodega: sourceData.Bodega,
          Cantidad: sourceData.Cantidad,
          Codigo: sourceData.Codigo,
          Detalle: sourceData.Detalle,
          Dia: sourceData.Dia,
          Mes: sourceData.Mes,
          PrecioCompra: sourceData.PrecioCompra,
          PrecioVenta: sourceData.PrecioVenta,
          Tipo: sourceData.Tipo,
          IdMovimiento: IdMovimiento,
      };
  
      // Agregar los datos a la colección de destino
      await addDoc(targetCollectionRef, detalleDato);
      setCodigo("");
        const tiempoVisibleEnMilisegundos = 5000;
        mostrarAlertaTemporal("Se agrego código.", tiempoVisibleEnMilisegundos);
        const employeesQuery = await getDocs(
          query(collection(db, "Producto"), where("Codigo", "==", Codigo))
        );
  
        if (!employeesQuery.empty) {
          const employeeDoc = employeesQuery.docs[0];
          const userId = employeeDoc.data().Cantidad;
  
          if (userId > 0) {
            // Si la cantidad actual es mayor que 1, disminuye la cantidad en 1
            await updateDoc(employeeDoc.ref, { Cantidad: userId - 1 });
          } else {
            const employeeRef = doc(db, "Producto", employeeDoc.id);
            await deleteDoc(employeeRef);
            console.log(`No se puede disminuir la cantidad, ya es 1 o menos.`);
          }
        } else {
          console.log(
            `El producto con código ${Codigo} no existe en la base de datos.`
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
  //-----------------------------------------------------Consume firebase
  useEffect(() => {
    const UsertData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Movimiento"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setUserData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const productoData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Producto"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setExtintorData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    productoData();
    UsertData();
  }, []);

  //------------------------------------------------------Consume firebase detalle
  useEffect(() => {
    const DetalleData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Detalle"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.IdMovimiento === IdMovimiento) {
            data.push(detalle);
          }
        });
        setDetalleData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    DetalleData();
  }, [IdMovimiento]); // Asegúrate de incluir codigoElegido en las dependencias

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
                <div className="modalDelete">
                  <div className="modal-contentDelete">
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
              <section>
                {isModalOpen && (
                  <div className="modalInfo">
                    <div className="modal-contentInfoDos">
                      <FaRegTimesCircle
                        className="iconsCloseInfo"
                        onClick={handleModalClose}
                      />
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Codigo</th>
                            <th>Detalle</th>
                            <th>P.Compra</th>
                            <th>P.Venta</th>
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
                                    ? detalle[userDataIndex].Detalle
                                    : ""}
                                </td>
                                 
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].PrecioCompra
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].PrecioVenta
                                    : ""}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>

              {/*Modals add movimiento */}
              <section>
                {isModalOpenDos && (
                  <div className="modalAdd">
                    <div className="modal-contentAdd">
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
                        <label className="textDos">Detalle:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Detalle}
                          placeholder="Descripción"
                          onChange={(e) => setDetalle(e.target.value)}
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
                      <th>Movimiento</th>
                      <th>Detalle</th>
                      <th>F.Movimiento</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((users, index) => {
                      const userDataIndex =
                        index < userData.length ? index : null;
                      return (
                        <tr key={users.IdMovimiento}>
                          <td className="code">
                            {userDataIndex !== null
                              ? userData[userDataIndex].IdMovimiento
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].Detalle
                              : ""}
                          </td>
                           
                          <td>
                            {userDataIndex !== null
                              ?  userData[userDataIndex].Dia
                              : " "}
                            /
                            {userDataIndex !== null
                              ?  userData[userDataIndex].Mes
                              : ""}
                            /
                            {userDataIndex !== null
                              ?  userData[userDataIndex].Anno
                              : ""}
                          </td>
                          <td>
                            <IoInformationCircleSharp
                              className="iconsInfo"
                              title="Más Información."
                              onClick={() => {
                                handleModalOpen();
                                setIdMovimiento(users.IdMovimiento);
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

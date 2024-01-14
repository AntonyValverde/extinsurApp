import {
  FaDumpsterFire,
  FaEdit,
  FaRegPlusSquare,
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
import IndexGerenteInicioUno from "../IndexGerenteInicioUno";

export default function Mantenimiento() {
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
  const [AnnoEntrega, setAnnoEntrega] = useState("");
  const [AnnoRevision, setAnnoRevision] = useState("");
  const [ApellidoUno, setApellidoUno] = useState("");
  const [ApellidoDos, setApellidoDos] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Nombre, setNombre] = useState("");
  const [IdMantenimiento, setMantenimiento] = useState("");
  const [DiaEntrega, setDiaEntrega] = useState("");
  const [MesEntrega, setMesEntrega] = useState("");
  const [MesRevision, setMesRevision] = useState("");
  const [DiaRevision, setDiaRevision] = useState("");
  const [NombreNegocio, setNombreNegocio] = useState("");
  const [Codigo, setCodigo] = useState("");
  const [Detalle, setDetalle] = useState("");
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
    setAnnoEntrega("");
    setAnnoRevision("");
    setApellidoDos("");
    setApellidoUno("");
    setDiaEntrega("");
    setDiaRevision("");
    setDireccion("");
    setMesEntrega("");
    setMesRevision("");
    setNombre("");
    setNombreNegocio("");
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
    handleDeleteUser(IdMantenimiento);
    setShowDeleteModal(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async (IdMantenimiento: string) => {
    try {
      // Realiza una consulta compuesta para buscar documentos que cumplan con ambas condiciones
      const collectionRef = collection(db, "Mantenimiento");
      const condition2 = where("IdMantenimiento", "==", IdMantenimiento);

      const combinedQuery = query(collectionRef, condition2);

      const employeesQuery = await getDocs(combinedQuery);

      if (!employeesQuery.empty) {
        // Itera sobre los resultados para eliminar los documentos
        employeesQuery.forEach(async (employeeDoc) => {
          const employeeRef = doc(db, "Mantenimiento", employeeDoc.id);
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
    setMantenimiento(numeroAleatorio.toString());
    console.log(IdMantenimiento);
  };

  //Add movimientos
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const usersRef = collection(db, "Mantenimiento");
      const queryDB = await getDocs(
        query(usersRef, where("IdMovimiento", "==", IdMantenimiento))
      );
      if (!queryDB.empty) {
        return;
      }

      const productosData = {
        AnnoEntrega,
        AnnoRevision,
        MesEntrega,
        MesRevision,
        DiaEntrega,
        DiaRevision,
        Nombre,
        NombreNegocio,
        ApellidoUno,
        ApellidoDos,
        IdMantenimiento,
        Direccion,
      };

      await addDoc(collection(db, "Mantenimiento"), productosData);

      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos :", error);
    }
  };
  //Editar
  //Editar tabla Usuarios
  const [formData, setFormData] = useState({
    Codigo: "",
    Cantidad: "",
  });

  interface User {
    Codigo?: string;
    Cantidad?: string;
  }

  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleEditClick = (user: User) => {
    setFormData({
      Codigo: user.Codigo ?? "",
      Cantidad: user.Cantidad ?? "",
    });
    setShowModalEdit(true);
  };
  //Add detalle
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const sourceCollectionRef = collection(db, "Producto");
      const targetCollectionRef = collection(db, "DetalleMantenimiento");

      const querySnapshot = await getDocs(
        query(sourceCollectionRef, where("Codigo", "==", Codigo))
      );

      const querySnapshotTwo = await getDocs(
        query(targetCollectionRef, where("Codigo", "==", Codigo))
      );

      if (!querySnapshotTwo.empty) {
        setCodigo("");
        const tiempoVisibleEnMilisegundos = 5000;
        mostrarAlertaTemporal(
          "Se sumo un producto.",
          tiempoVisibleEnMilisegundos
        );

        return;
      }

      if (querySnapshot.empty) {
        setCodigo("");
        const tiempoVisibleEnMilisegundos = 5000;
        mostrarAlertaTemporal(
          "No se encuentra el producto.",
          tiempoVisibleEnMilisegundos
        );
        return;
      }

      // Recuperar los datos de la consulta
      const sourceData = querySnapshot.docs[0].data();

      const detalleDato = {
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
        IdMantenimiento: IdMantenimiento,
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

  const handleOnClick = () => {
    handleModalOpenDos();
    asignarNumeroAleatorio(); // Llama a otra función aquí
  };
  //-----------------------------------------------------Consume firebase
  useEffect(() => {
    const UsertData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Mantenimiento"));
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
        const querydb = await getDocs(collection(db, "DetalleMantenimiento"));
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
        const querydb = await getDocs(collection(db, "DetalleMantenimiento"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.IdMantenimiento === IdMantenimiento) {
            data.push(detalle);
          }
        });
        setDetalleData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    DetalleData();
  }, [IdMantenimiento]); // Asegúrate de incluir codigoElegido en las dependencias

  //Fecha entrega
  const handleFechaNacimientoChange = (event: { target: { value: any } }) => {
    const fecha = event.target.value;
    const partesFecha = fecha.split(" ");

    if (partesFecha.length === 3) {
      setAnnoEntrega(partesFecha[0]);
      setMesEntrega(partesFecha[1]);
      setDiaEntrega(partesFecha[2]);
    }
  };

  //Fecha revision
  const handleFechaNacimientoDos = (event: { target: { value: any } }) => {
    const fecha = event.target.value;
    const partesFecha = fecha.split(" ");

    if (partesFecha.length === 3) {
      setAnnoRevision(partesFecha[0]);
      setMesRevision(partesFecha[1]);
      setDiaRevision(partesFecha[2]);
    }
  };
  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioUno />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Mantenimiento</h1>
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
                            <th>Cantidad</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalle.map((users, index) => {
                            const userDataIndex =
                              index < detalle.length ? index : null;

                            return (
                              <tr key={users.IdMantenimiento}>
                                <td className="code">
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Codigo
                                    : ""}
                                </td>

                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Cantidad
                                    : ""}
                                </td>

                                <td>
                                  <FaTrash
                                    className="iconsEliminar"
                                    title="Eliminar."
                                    onClick={() =>
                                      handleDeleteUser(users.Codigo)
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Detalle</th>
                            <th>Tipo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalle.map((users, index) => {
                            const userDataIndex =
                              index < detalle.length ? index : null;

                            return (
                              <tr key={users.IdMantenimiento}>
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Dia
                                    : ""}
                                  /{" "}
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Mes
                                    : ""}
                                  /{" "}
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Anno
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Tipo
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Detalle
                                    : ""}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Bodega</th>
                            <th>P.Compra</th>
                            <th>P.Venta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalle.map((users, index) => {
                            const userDataIndex =
                              index < detalle.length ? index : null;

                            return (
                              <tr key={users.IdMantenimiento}>
                                <td>
                                  {userDataIndex !== null
                                    ? detalle[userDataIndex].Bodega
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
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>T.Compra</th>
                            <th>T.Venta</th>
                            <th>T.IVA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalle.map((users, index) => {
                            const userDataIndex =
                              index < detalle.length ? index : null;

                            const cantidad =
                              userDataIndex !== null
                                ? detalle[userDataIndex].Cantidad
                                : 0;
                            const precioVenta =
                              userDataIndex !== null
                                ? detalle[userDataIndex].PrecioVenta
                                : 0;

                            const precioCompra =
                              userDataIndex !== null
                                ? detalle[userDataIndex].PrecioCompra
                                : 0;
                            const total = cantidad * precioVenta;
                            const totalCompra = cantidad * precioCompra;
                            const totalVentaIva = Math.round(cantidad * precioVenta * 1.14);

                            return (
                              <tr key={users.IdMantenimiento}>
                                <td>{totalCompra}</td>
                                <td>{total}</td>
                                <td>{totalVentaIva}</td>
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
                        title="Agregar."
                      />
                      <form onSubmit={handleFormSubmitOtro}>
                        <label className="textDos">Codigo:</label>

                        <input
                          className="inputRes"
                          type="text"
                          value={Codigo}
                          placeholder="Codigo"
                          title="Siempre presionar agregar para agregar."
                          onChange={(e) => setCodigo(e.target.value)}
                        />
                        <button
                          className="RegistrarButton"
                          type="submit"
                          id="mas"
                        >
                          Más
                          <IoInformationCircleSharp
                            className="iconsInfo"
                            title="Darle (más) para agregar el código."
                          />
                        </button>
                      </form>
                      <form onSubmit={handleFormSubmitExtintor}>
                        <label className="textDos">Nombre:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                        <label className="textDos">Primer Apellido:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={ApellidoUno}
                          placeholder="Primer Apellido"
                          onChange={(e) => setApellidoUno(e.target.value)}
                          required
                        />
                        <label className="textDos">Segundo Apellido:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={ApellidoDos}
                          placeholder="Segundo Apellido"
                          onChange={(e) => setApellidoDos(e.target.value)}
                          required
                        />
                        <label className="textDos">Nombre Negocio:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={NombreNegocio}
                          placeholder="Nombre del Negocio"
                          onChange={(e) => setNombreNegocio(e.target.value)}
                          required
                        />
                        <label className="textDos">Fecha de entrega:</label>
                        <input
                          type="date"
                          className="inputRes"
                          id="fechaNacimiento"
                          name="fechaNacimiento"
                          onChange={handleFechaNacimientoChange}
                          required
                        ></input>
                        <label className="textDos">Fecha de revisión:</label>
                        <input
                          type="date"
                          className="inputRes"
                          id="fechaRevision"
                          name="fechaRevision"
                          onChange={handleFechaNacimientoDos}
                          required
                        ></input>
                        <label className="textDos">Dirección:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Direccion}
                          placeholder="Dirección"
                          onChange={(e) => setDireccion(e.target.value)}
                          required
                        />
                        <label className="textDos">Detalle:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Detalle}
                          placeholder="Detalle"
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
                    Mantenimiento
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
                      <th>N°</th>
                      <th>Negocio</th>
                      <th>Encargado</th>
                      <th>Dirección</th>
                      <th>F. Revisión</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((users, index) => {
                      const userDataIndex =
                        index < userData.length ? index : null;
                      return (
                        <tr key={users.IdMantenimiento}>
                          <td className="code">
                            {userDataIndex !== null
                              ? userData[userDataIndex].IdMantenimiento
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].NombreNegocio
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].Nombre
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].Direccion
                              : ""}
                          </td>

                          <td>
                            {userDataIndex !== null
                              ? userData[userDataIndex].DiaRevision
                              : " "}
                            /
                            {userDataIndex !== null
                              ? userData[userDataIndex].MesRevision
                              : ""}
                            /
                            {userDataIndex !== null
                              ? userData[userDataIndex].AnnoRevision
                              : ""}
                          </td>
                          <td>
                            <IoInformationCircleSharp
                              className="iconsInfo"
                              title="Más Información."
                              onClick={() => {
                                handleModalOpen();
                                setMantenimiento(users.IdMantenimiento);
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
              <Link className="sidebar_linkTres" href="/Empleados/ProductosEm">
                  Productos
                </Link>
                <Link
                  className="sidebar_linkTres"
                  href="/Empleados/MovimientosEm"
                >
                  Movimientos
                </Link>
                <Link className="sidebar_linkTres" href="/Empleados/UbicacionEm">
                  Ubicación
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

import {
  FaInfo,
  FaTrash,
  FaPenSquare,
  FaEdit,
  FaRegTimesCircle,
  FaRegPlusSquare,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function Productos() {
  //-----------------------------------------------------------------Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isModalOpenCuatro, setIsModalOpenCuatro] = useState(false);
  //----------------------------------------------------------------Variables
  const [Codigo, setCodigo] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [Bodega, setBodega] = useState("");
  const [PrecioCompra, setPrecioCompra] = useState("");
  const [PrecioVenta, setPrecioVenta] = useState("");
  const [Agente, setAgente] = useState("");
  const [Clase, setClase] = useState("");
  const [Peso, setPeso] = useState("");
  const [Tipo, setTipo] = useState("");
  const [NumeroAleatorio, setNumeroAleatorio] = useState("");
  //----------------------------------------------------------------Tablas
  const [productData, setProductData] = useState<any[]>([]);
  const [extintorData, setExtCaja] = useState<any[]>([]);
  const [fechaData, setFechCaja] = useState<any[]>([]);
  const [rotulacionData, setRotCaja] = useState<any[]>([]);
  const [otrosData, setOtrosCaja] = useState<any[]>([]);
  const [infoData, setInfoData] = useState<any[]>([]);
  //------------------------------------------------------------Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //-----------------------------------------------------------------Buscador
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterValue2, setFilterValue2] = useState("");
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  //--------------------------------------------------------------Modals Eliminar

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  //------------------------------------------------------------Modals one show detalle
  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setCantidad("");
    setIsModalOpen(false);
  };
  //----------------------------------------------------------Modals dos extintor
  useEffect(() => {
    if (isModalOpenDos) {
    }
  }, [isModalOpenDos]);

  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
  };

  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
    setCantidad("");
    setCodigo("");
    setNombre("");
    setAgente("");
    setClase("");
    setBodega("");
    setPeso("");
    setPrecioCompra("");
    setPrecioVenta("");
  };
  //-------------------------------------------------------Modals tres add rotulo
  useEffect(() => {
    if (isModalOpenTres) {
    }
  }, [isModalOpenTres]);
  const handleModalOpenTres = () => {
    setIsModalOpenTres(true);
  };
  const handleModalCloseTres = () => {
    setIsModalOpenTres(false);
    setCantidad("");
    setCodigo("");
    setNombre("");
    setBodega("");
    setPrecioCompra("");
    setPrecioVenta("");
  };
  //--------------------------------------------------Modals cuatro add rotulo
  useEffect(() => {
    if (isModalOpenCuatro) {
    }
  }, [isModalOpenCuatro]);

  const handleModalOpenCuatro = () => {
    setIsModalOpenCuatro(true);
  };
  const handleModalCloseCuatro = () => {
    setIsModalOpenCuatro(false);
    setTipo("");
    setCantidad("");
    setCodigo("");
    setNombre("");
    setBodega("");
    setPrecioCompra("");
  };
  //-------------------------------------------------------------Color de fondo
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
  //---------------------------------------------------------Eliminar de la fireBase.
  const handleDeleteUser = async (Codigo: string) => {
    try {
      const employeesQuery = await getDocs(
        query(collection(db, "Producto"), where("Codigo", "==", Codigo))
      );

      if (!employeesQuery.empty) {
        const employeeDoc = employeesQuery.docs[0];
        const userId = employeeDoc.data().Cantidad;

        if (userId > 1) {
          // Si la cantidad actual es mayor que 1, disminuye la cantidad en 1
          await updateDoc(employeeDoc.ref, { Cantidad: userId - 1 });
          const updateData = [...infoData];
          setInfoData(updateData);
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
      console.error(`Error al disminuir la cantidad del producto: ${error}`);
    }
  };
  //---------------------------------------------------------Eliminar de la fireBase.
  const handleAddUser = async (Codigo: string) => {
    try {
      const employeesQuery = await getDocs(
        query(collection(db, "Producto"), where("Codigo", "==", Codigo))
      );

      if (!employeesQuery.empty) {
        const employeeDoc = employeesQuery.docs[0];
        const userId = employeeDoc.data().Cantidad;

        if (userId > 0) {
          // Si la cantidad actual es mayor que 1, disminuye la cantidad en 1
          await updateDoc(employeeDoc.ref, { Cantidad: userId + 1 });
          const updateData = [...infoData];
          setInfoData(updateData);
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
      console.error(`Error al disminuir la cantidad del producto: ${error}`);
    }
  };

  //-----------------------------------------------------------Consume firebase detalle
  useEffect(() => {
    const DetalleData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Producto"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          //-------------------------------------Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });

        setInfoData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    DetalleData();
  }, [Codigo]);
  //----------------------------------------------------------Agregar extintor
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Producto");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Anno,
        Bodega,
        Cantidad,
        Codigo,
        Detalle,
        Dia,
        Mes,
        PrecioCompra,
        PrecioVenta,
        Tipo,
      };
      await addDoc(collection(db, "Producto"), productosData);

      const updateData = [...productData];
      setProductData(updateData);
      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
    handleModalCloseDos();
  };

  //----------------------------------------------------Obtiene las variables de fecha
  function obtenerFechaActual(): Date {
    return new Date();
  }

  const fechaActual: Date = obtenerFechaActual();

  const Anno: number = fechaActual.getFullYear();
  const Mes: number = fechaActual.getMonth() + 1;
  const Dia: number = fechaActual.getDate();

  //---------------------------------------------------------------Consume fireBase
  useEffect(() => {
    const productData = async () => {
      try {
        const queryDB = await getDocs(collection(db, "Producto"));
        const data: React.SetStateAction<any[]> = [];
        queryDB.forEach((doc) => {
          data.push(doc.data());
        });
        setProductData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    productData();
  }, []);

  //-------------------------------------------------------------Buscador
  useEffect(() => {
    const filtered = productData.filter((data) =>
      Object.keys(data).some((key) =>
        data[key].toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [filterValue, productData]);

  useEffect(() => {
    const filtered = fechaData.filter((data) =>
      Object.keys(data).some((key) =>
        data[key].toString().toLowerCase().includes(filterValue2.toLowerCase())
      )
    );
    setFilteredData2(filtered);
  }, [filterValue2, fechaData]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setFilterValue(value);
    setFilterValue2(value);
  };
  //-----------------------------------------------------Buscador

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };
  //-----------------------------------------------------Actualizar
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Producto"),
      async (querySnapshot) => {
        const employeesData: { id: string; Codigo: string }[] = [];
        const employeesDataTwo: { id: string; Codigo: string }[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          employeesData.push({ id: doc.id, Codigo, ...data });
          const dataTwo = doc.data();
          employeesDataTwo.push({ id: doc.id, Codigo, ...dataTwo });
        });

        const combinedData = employeesData.map((employee) => {
          const relatedUser = productData.find(
            (user) => user.Codigo === employee.Codigo
          );
          return { ...employee, ...relatedUser };
        });
        const combinedDataTwo = employeesDataTwo.map((employee) => {
          const relatedUserTwo = infoData.find(
            (user) => user.Codigo === employee.Codigo
          );
          return { ...employee, ...relatedUserTwo };
        });
        setInfoData(combinedDataTwo);
        setProductData(combinedData); // Actualiza el estado local con los datos combinados
      }
    );
    // Retorna una función de limpieza para detener la suscripción cuando el componente se desmonte
    return () => {
      unsubscribe();
    };
  }, []);
  //---------------------------------------------------------------Return
  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyProductos">
            <section>
              <h1 className="tituloEmpleados">Productos</h1>
              <div className="linea"></div>
              {/*-------------------------------------------Modals add extintor */}
              <section>
                {isModalOpenDos && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseDos}
                      />
                      <form onSubmit={handleFormSubmitExtintor}>
                        <label className="textDos">Cantidad:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />

                        <label className="textDos">Codigo:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Tipo:</label>
                        <select
                          className="inputResDos"
                          value={Tipo}
                          onChange={(e) => setTipo(e.target.value)}
                          required
                        >
                          <option value="Extintor">Extintor</option>
                          <option value="Rotulo">Rotulo</option>
                          <option value="Otro">Otro</option>
                        </select>

                        <label className="textDos">Detalle:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Detalle}
                          placeholder="Detalle"
                          onChange={(e) => setDetalle(e.target.value)}
                          required
                        />

                        <label className="textDos">Bodega:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />

                        <label className="textDos">Precio Compra:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />

                        <label className="textDos">Precio Venta:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={PrecioVenta}
                          placeholder="Precio Venta"
                          onChange={(e) => setPrecioVenta(e.target.value)}
                          required
                        />

                        <button className="RegistrarButton" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>

              {/*-----------------------------------------Modals detalles*/}
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
                          {infoData.map((users, index) => {
                            const userDataIndex =
                              index < infoData.length ? index : null;

                            return (
                              <tr key={users.Codigo}>
                                <td className="code">
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Codigo
                                    : ""}
                                </td>

                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Cantidad
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
                                  <FaRegPlusSquare
                                    className="iconsInfo"
                                    title="Agregar."
                                    onClick={() => handleAddUser(users.Codigo)}
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
                          {infoData.map((users, index) => {
                            const userDataIndex =
                              index < infoData.length ? index : null;

                            return (
                              <tr key={users.Codigo}>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Dia
                                    : ""}
                                  /{" "}
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Mes
                                    : ""}
                                  /{" "}
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Anno
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Tipo
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Detalle
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
                          {infoData.map((users, index) => {
                            const userDataIndex =
                              index < infoData.length ? index : null;

                            return (
                              <tr key={users.Codigo}>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Bodega
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].PrecioCompra
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].PrecioVenta
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
                          {infoData.map((users, index) => {
                            const userDataIndex =
                              index < infoData.length ? index : null;

                            const cantidad =
                              userDataIndex !== null
                                ? infoData[userDataIndex].Cantidad
                                : 0;
                            const precioVenta =
                              userDataIndex !== null
                                ? infoData[userDataIndex].PrecioVenta
                                : 0;

                            const precioCompra =
                              userDataIndex !== null
                                ? infoData[userDataIndex].PrecioCompra
                                : 0;
                            const total = cantidad * precioVenta;
                            const totalCompra = cantidad * precioCompra;
                            const totalVentaIva = cantidad * precioVenta * 1.14;

                            return (
                              <tr key={users.Codigo}>
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
              {/*---------------------------------------------Estructura principal*/}
              {/*---------------------------------------------Principal structure*/}
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                    value={searchQuery}
                    name="Buscar"
                    onChange={handleSearchChange}
                  />
                  <button
                    onClick={handleModalOpenDos}
                    className="RegistrarButton"
                  >
                    Producto
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
                {/*--------------------------------------------------Tabla*/}
                {/*--------------------------------------------------Board*/}
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Detalle</th>
                      <th>Cantidad</th>
                      <th>Tipo</th>
                      <th>Ingresó</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData
                      .filter(
                        (user) =>
                          user.Codigo.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          ) ||
                          user.Detalle.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          ) ||
                          user.Tipo.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          )
                      )
                      .map((user, index) => {
                        return (
                          <tr key={user.Codigo}>
                            <td className="code">{user.Codigo}</td>
                            <td>{user.Detalle}</td>
                            <td>{user.Cantidad}</td>
                            <td>{user.Tipo}</td>
                            <td>{`${user.Dia}/${user.Mes}/${user.Anno}`}</td>
                            <td>
                              <IoInformationCircleSharp
                                onClick={() => {
                                  handleModalOpen();
                                  setCodigo(user.Codigo);
                                  setTipo(user.Tipo);
                                }}
                                className="iconsInfo"
                                title="Más Información."
                              />
                              <FaTrash
                                    className="iconsEliminar"
                                    title="Eliminar."
                                    onClick={() =>
                                      handleDeleteUser(user.Codigo)
                                    }
                                  />
                                  <FaRegPlusSquare
                                    className="iconsInfo"
                                    title="Agregar."
                                    onClick={() => handleAddUser(user.Codigo)}
                                  />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="linea"></div>
            </section>
            {/*--------------------------------------------------Responsive para telefono*/}
            {/*----------------------------------------------------Responsive for phone*/}
            <section>
              <div className="containerButton">
                <div className="sidebar_linkTres" onClick={handleModalOpenTres}>
                  <h1>Agregar</h1>
                </div>
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
                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">
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

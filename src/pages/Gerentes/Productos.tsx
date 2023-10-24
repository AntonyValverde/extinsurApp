import {
  FaInfo,
  FaTrash,
  FaPenSquare,
  FaEdit,
  FaRegTimesCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function Productos() {
  //Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [isModalOpenCuatro, setIsModalOpenCuatro] = useState(false);
  //Variables
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
  //Tablas
  const [productData, setProductData] = useState<any[]>([]);
  const [extintorData, setExtCaja] = useState<any[]>([]);
  const [fechaData, setFechCaja] = useState<any[]>([]);
  const [rotulacionData, setRotCaja] = useState<any[]>([]);
  const [otrosData, setOtrosCaja] = useState<any[]>([]);
  const [infoData, setInfoData] = useState<any[]>([]);
  //Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //Buscador
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterValue2, setFilterValue2] = useState("");
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
  //Modals uno
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
  //Modals dos
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
  //Modals tres
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
  //Modals cuatro
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
  //Color de fondo
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
  //Agregar extintor
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const cantidad = parseInt(Cantidad, 10); // Convierte la cantidad a un número

      for (let i = 0; i < cantidad; i++) {
        const productosData = {
          Cantidad,
          Codigo,
          Tipo,
        };

        const extintoresData = {
          Agente,
          Bodega,
          Clase,
          Codigo,
          Peso,
          Tipo,
          PrecioCompra,
          PrecioVenta,
        };
        const fechaData = {
          Anno,
          Mes,
          Dia,
          Tipo,
          Codigo,
        };

        await addDoc(collection(db, "Productos"), productosData);
        await addDoc(collection(db, "Extintores"), extintoresData);
        await addDoc(collection(db, "FechaEntrada"), fechaData);
      }

      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };
  //Agregar Rotulo
  const handleFormSubmitRotulos = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Tipo,
      };

      const rotulosData = {
        Bodega,
        Codigo,
        Nombre,
        PrecioCompra,
        Tipo,
      };

      const fechaData = {
        Anno,
        Mes,
        Dia,
        Codigo,
        Tipo,
      };

      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Rotulos"), rotulosData);
      await addDoc(collection(db, "FechaEntrada"), fechaData);
      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
    handleModalCloseTres();
  };
  //Agregar Otro
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Tipo,
      };

      const extintoresData = {
        Agente,
        Bodega,
        Clase,
        Codigo,
        Peso,
        PrecioCompra,
        PrecioVenta,
        Tipo,
      };
      const fechaData = {
        Anno,
        Mes,
        Dia,
        Codigo,
        Tipo,
      };

      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Extintores"), extintoresData);
      await addDoc(collection(db, "FechaEntrada"), fechaData);
      handleModalCloseCuatro();
      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
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

  console.log("Fecha actual:", fechaActual);
  console.log(`Año: ${Anno}, Mes: ${Mes}, Día: ${Dia}`);
  //Consume fireBase
  useEffect(() => {
    const productData = async () => {
      try {
        const queryDB = await getDocs(collection(db, "Productos"));
        const data: React.SetStateAction<any[]> = [];
        queryDB.forEach((doc) => {
          data.push(doc.data());
        });
        setProductData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const fetchData = async () => {
      try {
        const querydb = await getDocs(collection(db, "FechaEntrada"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setFechCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const RotulacionData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Rotulos"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setRotCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const otroData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Otros"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setOtrosCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const extintorData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Extintores"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setExtCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    fetchData();
    RotulacionData();
    otroData();
    productData();
    extintorData();
  }, []);
  //Consume firebase detalle
  useEffect(() => {
    const DetalleData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Extintores"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });

        const querydbTwo = await getDocs(collection(db, "Rotulos"));
        querydbTwo.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });

        const querydbThree = await getDocs(collection(db, "Otros"));
        querydbThree.forEach((doc) => {
          const detalle = doc.data();
          // Aquí, verifica si el detalle tiene el código que deseas
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
  }, [Codigo]); // Asegúrate de incluir codigoElegido en las dependencias
  //Buscador
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
              {/*Modals add extintor */}
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
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Tipo:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Tipo}
                          placeholder="Tipo"
                          onChange={(e) => setTipo(e.target.value)}
                          required
                        />
                        <label className="textDos">Agente:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Agente}
                          placeholder="Agente"
                          onChange={(e) => setAgente(e.target.value)}
                          required
                        />
                        <label className="textDos">Clase:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Clase}
                          placeholder="Clase"
                          onChange={(e) => setClase(e.target.value)}
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
                        <label className="textDos">Peso:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Peso}
                          placeholder="Peso"
                          onChange={(e) => setPeso(e.target.value)}
                          required
                        />

                        <label className="textDos">Precio Compra:</label>
                        <input
                          className="inputRes"
                          type="text"
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

              {/*Modals add rotulo */}
              <section>
                {isModalOpenTres && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseTres}
                      />
                      <form onSubmit={handleFormSubmitRotulos}>
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
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Nombre:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
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
                          type="text"
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
              {/*Modals add otro*/}
              <section>
                {isModalOpenCuatro && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseCuatro}
                      />
                      <form onSubmit={handleFormSubmitOtro}>
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
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Nombre:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
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
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
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
              {/*Modals detalles*/}
              <section>
                {isModalOpen && (
                  <div className="modalInfo">
                    <div className="modal-contentInfo">
                      <FaRegTimesCircle
                        className="iconsCloseInfo"
                        onClick={handleModalClose}
                      />
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Codigo</th>
                            <th>Tipo</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {infoData.map((users, index) => {
                            const userDataIndex =
                              index < infoData.length ? index : null;

                            return (
                              <tr key={users.IdDetalle}>
                                <td className="code">
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Codigo
                                    : ""}
                                </td>
                                <td>
                                  {userDataIndex !== null
                                    ? infoData[userDataIndex].Tipo
                                    : ""}
                                </td>

                                <FaTrash
                                  className="iconsEliminar"
                                  title="Eliminar."
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
              {/*Estructura principal*/}
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                    value={filterValue}
                    name="Buscar"
                    onChange={handleFilterChange}
                  />
                  <button
                    onClick={handleModalOpenDos}
                    className="RegistrarButton"
                  >
                    Extintor
                  </button>
                  <button
                    onClick={handleModalOpenTres}
                    className="RegistrarButton"
                  >
                    Rotulo
                  </button>
                  <button
                    onClick={handleModalOpenCuatro}
                    className="RegistrarButton"
                  >
                    Otro
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
                {/*Tabla*/}
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cantidad</th>
                      <th>Tipo</th>
                      <th>Ingresó</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((user, index) => {
                      const userDataIndex =
                        index < productData.length ? index : null;
                      const dataTerceraTablaIndex =
                        index < fechaData.length ? index : null;

                      return (
                        <tr key={user.Codigo}>
                          <td className="code">
                            {userDataIndex !== null
                              ? productData[userDataIndex].Codigo
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? productData[userDataIndex].Cantidad
                              : ""}
                          </td>
                          <td>
                            {userDataIndex !== null
                              ? productData[userDataIndex].Tipo
                              : ""}
                          </td>
                          <td>
                            {dataTerceraTablaIndex !== null
                              ? `${fechaData[dataTerceraTablaIndex].Dia}/
                                  ${fechaData[dataTerceraTablaIndex].Mes}/
                                  ${fechaData[dataTerceraTablaIndex].Anno}`
                              : " "}
                          </td>
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="linea"></div>
            </section>
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

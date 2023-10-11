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
  //Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
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
      };
      const fechaData = {
        Anno,
        Mes,
        Dia,
        Codigo,
      };

      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Extintores"), extintoresData);
      await addDoc(collection(db, "FechaEntrada"), fechaData);
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
      };

      const fechaData = {
        Anno,
        Mes,
        Dia,
        Codigo,
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
      };
      const fechaData = {
        Anno,
        Mes,
        Dia,
        Codigo,
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
                  <div className="modal">
                    <div className="modal-content">
                      <FaRegTimesCircle
                        className="icon-closed"
                        onClick={handleModalCloseDos}
                      />
                      <form onSubmit={handleFormSubmitExtintor}>
                        <label className="inputForm">Cantidad:</label>
                        <input
                          className="inputForm"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="inputForm">Codigo:</label>
                        <input
                          className="inputForm"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="inputForm">Tipo:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Tipo}
                          placeholder="Tipo"
                          onChange={(e) => setTipo(e.target.value)}
                          required
                        />
                        <label className="inputForm">Agente:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Agente}
                          placeholder="Agente"
                          onChange={(e) => setAgente(e.target.value)}
                          required
                        />
                        <label className="inputForm">Clase:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Clase}
                          placeholder="Clase"
                          onChange={(e) => setClase(e.target.value)}
                          required
                        />
                        <label className="inputForm">Bodega:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />
                        <label className="inputForm">Peso:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Peso}
                          placeholder="Peso"
                          onChange={(e) => setPeso(e.target.value)}
                          required
                        />

                        <label className="inputForm">Precio Compra:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label className="inputForm">Precio Venta:</label>
                        <input
                          className="inputForm"
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
                  <div className="modal">
                    <div className="modal-content">
                      <FaRegTimesCircle
                        className="icon-closed"
                        onClick={handleModalCloseTres}
                      />
                      <form onSubmit={handleFormSubmitRotulos}>
                        <label className="textForm">Cantidad:</label>
                        <input
                          className="inputForm"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="textForm">Codigo:</label>
                        <input
                          className="inputForm"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textForm">Nombre:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />

                        <label className="textForm">Bodega:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />

                        <label className="textForm">Precio Compra:</label>
                        <input
                          className="inputForm"
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label className="textForm">Precio Venta:</label>
                        <input
                          className="inputForm"
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
                  <div className="modal">
                    <div className="modal-content">
                      <FaRegTimesCircle
                        className="icon-closed"
                        onClick={handleModalCloseCuatro}
                      />
                      <form onSubmit={handleFormSubmitOtro}>
                        <label className="textForm">Cantidad:</label>
                        <input
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="textForm">Codigo:</label>
                        <input
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textForm">Nombre:</label>
                        <input
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />

                        <label className="textForm">Bodega:</label>
                        <input
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />

                        <label className="textForm">Precio Compra:</label>
                        <input
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
              {/*Estructura principal*/}
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
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
                    {productData.map((users, index) => {
                      const userDataIndex =
                        index < productData.length ? index : null;

                      const dataTerceraTablaIndex =
                        index < fechaData.length ? index : null;

                      return (
                        <tr key={users.Codigo}>
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
                              ? fechaData[dataTerceraTablaIndex].Dia
                              : " "}
                            /
                            {dataTerceraTablaIndex !== null
                              ? fechaData[dataTerceraTablaIndex].Mes
                              : ""}
                            /
                            {dataTerceraTablaIndex !== null
                              ? fechaData[dataTerceraTablaIndex].Anno
                              : ""}
                          </td>

                          <td>
                            <IoInformationCircleSharp
                              onClick={handleModalOpen}
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
          </div>
        </div>
      </div>
    </>
  );
}

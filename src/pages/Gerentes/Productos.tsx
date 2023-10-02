import { FaInfo, FaTrash, FaPenSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";

export default function Productos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [isModalOpenCuatro, setIsModalOpenCuatro] = useState(false);

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

  //Agregar 
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(
          usersRef,
          where("Codigo", "==", Codigo)
        )
      );
      if (!queryDB.empty) {
         
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Detalle,
        Nombre
      };

      const extintoresData = {
        Agente,
        Bodega,
        Clase,
        Codigo,
        Peso,
        PrecioCompra,
        PrecioVenta
      };

      const rotulosData = {
        Codigo,
        Detalle,
        Bodega,
        PrecioCompra,
        PrecioVenta
      };
       
      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Extintores"), extintoresData);
      await addDoc(collection(db, "Rotulos"), rotulosData);
      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

  //Agregar extintor
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(
          usersRef,
          where("Codigo", "==", Codigo)
        )
      );
      if (!queryDB.empty) {
         
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Detalle,
        Nombre
      };

      const extintoresData = {
        Agente,
        Bodega,
        Clase,
        Codigo,
        Peso,
        PrecioCompra,
        PrecioVenta
      };

      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Extintores"), extintoresData);
       
      handleModalClose();
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
        query(
          usersRef,
          where("Codigo", "==", Codigo)
        )
      );
      if (!queryDB.empty) {
         
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Detalle,
        Nombre
      };

      const rotulosData= {
        Bodega,
        Codigo,
        Nombre,
        PrecioCompra
      };

       
       
      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Rotulos"), rotulosData);
       
      handleModalClose();
      
      
      
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };
  //Agregar Otro
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(
          usersRef,
          where("Codigo", "==", Codigo)
        )
      );
      if (!queryDB.empty) {
         
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Detalle,
        Nombre
      };

      const extintoresData = {
        Agente,
        Bodega,
        Clase,
        Codigo,
        Peso,
        PrecioCompra,
        PrecioVenta
      };

      await addDoc(collection(db, "Productos"), productosData);
      await addDoc(collection(db, "Extintores"), extintoresData);
       
      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
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
              <section>
                {isModalOpenDos && (
                  <div className="modal">
                    <div className="modal-content">
                      <FaPenSquare
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
                        <label className="inputForm" >Codigo:</label>
                        <input
                        className="inputForm"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label  className="inputForm" >Nombre:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                        <label  className="inputForm" >Agente:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={Agente}
                          placeholder="Agente"
                          onChange={(e) => setAgente(e.target.value)}
                          required
                        />
                        <label  className="inputForm" >Clase:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={Clase}
                          placeholder="Clase"
                          onChange={(e) => setClase(e.target.value)}
                          required
                        />
                        <label  className="inputForm" >Bodega:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />
                        <label  className="inputForm" >Peso:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={Peso}
                          placeholder="Peso"
                          onChange={(e) => setPeso(e.target.value)}
                          required
                        />

                        <label  className="inputForm" >Precio Compra:</label>
                        <input
                         className="inputForm" 
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label  className="inputForm" >Precio Venta:</label>
                        <input
                         className="inputForm" 
                          type="number"
                          value={PrecioVenta}
                          placeholder="Precio Venta"
                          onChange={(e) => setPrecioVenta(e.target.value)}
                          required
                        />
                         
                        <button className="submit" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>
              <section>
                {isModalOpenTres && (
                  <div className="modal">
                    <div className="modal-content">
                      <FaPenSquare
                        className="icon-closed"
                        onClick={handleModalCloseTres}
                      />
                      <form onSubmit={handleFormSubmitRotulos}>
                        <label>Cantidad:</label>
                        <input
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label>Codigo:</label>
                        <input
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label>Nombre:</label>
                        <input
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                         
                        <label>Bodega:</label>
                        <input
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />
                         

                        <label>Precio Compra:</label>
                        <input
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label>Precio Venta:</label>
                        <input
                          type="number"
                          value={PrecioVenta}
                          placeholder="Precio Venta"
                          onChange={(e) => setPrecioVenta(e.target.value)}
                          required
                        />
                         
                        <button className="submit" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>
              <section>
                {isModalOpenCuatro && (
                  <div className="modal">
                    <div className="modal-content">
                      <FaPenSquare
                        className="icon-closed"
                        onClick={handleModalCloseCuatro}
                      />
                      <form onSubmit={handleFormSubmitOtro}>
                        <label>Cantidad:</label>
                        <input
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label>Codigo:</label>
                        <input
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label>Nombre:</label>
                        <input
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                         
                        <label>Bodega:</label>
                        <input
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />
                         
                        <label>Precio Compra:</label>
                        <input
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                         
                         
                        <button className="submit" type="submit">
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
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cantidad</th>
                      <th>Tipo</th>
                      <th>Nombre</th>
                      <th>Bodega</th>
                      <th>Ingresó</th>
                      <th>Precio compra</th>
                      <th>Precio venta</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="code">623144</td>
                      <td>4</td>
                      <td>Rotulo</td>
                      <td>Salida de emergencia</td>
                      <td>4</td>
                      <td>24/03/2022</td>
                      <td>500</td>
                      <td>1500</td>

                      <td>
                        <FaPenSquare className="iconsEdit" title="Editar." />
                        <FaInfo
                          className="iconsInfo"
                          title="Más Información."
                        />
                        <FaTrash className="iconsEliminar" title="Eliminar." />
                      </td>
                    </tr>
                    <tr>
                      <td className="code">392630</td>
                      <td>14</td>
                      <td>Extintor</td>
                      <td>Extintor de tipo abc</td>
                      <td>2</td>
                      <td>14/04/2021</td>
                      <td>5000</td>
                      <td>15000</td>
                      <td>
                        <FaPenSquare className="iconsEdit" title="Editar." />
                        <FaInfo
                          className="iconsInfo"
                          title="Más Información."
                        />
                        <FaTrash className="iconsEliminar" title="Eliminar." />
                      </td>
                    </tr>
                    <tr>
                      <td className="code">592834</td>
                      <td>11</td>
                      <td>Pieza</td>
                      <td>Anillos de sello</td>
                      <td>1</td>
                      <td>04/11/2020</td>
                      <td>500</td>
                      <td>1500</td>
                      <td>
                        <FaPenSquare className="iconsEdit" title="Editar." />
                        <FaInfo
                          className="iconsInfo"
                          title="Más Información."
                        />
                        <FaTrash className="iconsEliminar" title="Eliminar." />
                      </td>
                    </tr>
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

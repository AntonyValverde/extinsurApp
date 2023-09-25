import { FaInfo, FaTrash, FaPenSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";

export default function Productos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);

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
                    Agregar
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
            <section>
              {isModalOpenDos && (
                <div className="modalNavExtintor">
                  <div
                    className="modalDivExtintor"
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
                    >
                      SALIR
                    </button>
                    <div className="contenedorRegistro">
                      <h2 className="textUno">Paso 1: Email y contraseña</h2>
                      <div className="contenedorInput">
                        <h3 className="textDos">
                          Email<input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Contraseña
                          <input type="password" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Código<input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Tipo<input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Nombre<input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Bodega<input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Ingresó
                          <input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Precio compra
                          <input type="text" className="inputRes"></input>
                        </h3>
                        <h3 className="textDos">
                          Precio venta<input></input>
                        </h3>
                        <button type="submit">Agregar Producto</button>
                      </div>
                    </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

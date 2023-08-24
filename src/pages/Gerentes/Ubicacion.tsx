import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";

export default function Ubicacion() {
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

    return (
        <>
            <div className="bodySidebar">
                <div className="containerSidebar">
                    <div><IndexGerenteInicioDos /></div>


                    <div className="bodyEmpleados">


                        <section>

                            <h1 className="tituloEmpleados">Ubicación</h1>
                            <h1 className="botonAgregar" onClick={handleModalOpenTres}>Agregar</h1>
                            <div className="linea"></div>
                            <div className="contenedorTabla">
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
                                            <th>Botones</th>

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
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                                <FaEdit onClick={handleModalOpenDos} className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp onClick={handleModalOpen} className="iconsInfo" title="Más Información." />
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
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                                <FaEdit onClick={handleModalOpenDos} className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp onClick={handleModalOpen} className="iconsInfo" title="Más Información." />
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
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                                <FaEdit onClick={handleModalOpenDos} className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp onClick={handleModalOpen} className="iconsInfo" title="Más Información." />
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
                                                <FaEdit onClick={handleModalOpenDos} className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp onClick={handleModalOpen} className="iconsInfo" title="Más Información." />
                                                <FaTrash className="iconsEliminar" title="Eliminar." />
                                            </td>
                                        </tr>

                                    </tbody>


                                </table>


                            </div>



                        </section>
                        <section>
                            {isModalOpen && (

                                <div className="modal">
                                    <div className="modal-content">
                                        <button
                                            className="icon-close"
                                            onClick={handleModalClose}
                                        >SALIR</button>

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
                                        >SALIR</button>

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
                                            ><FaDoorOpen></FaDoorOpen></button>
                                        </div>

                                        <form className="contenedorUbicacion">

                                            <h1 className="tituloUbicacion">Ubicación</h1>
                                            <h2 className="textColocar">Colocar Dirección</h2>
                                            <input className="inputColocar" type="text" />
                                            <h2 className="textColocar">Colocar Descripción</h2>
                                            <input className="inputColocar" type="text" />
                                            <button className="btnAgregar">Agregar</button>

                                        </form>

                                    </div>
                                </div>

                            )}
                        </section>
                        <div className="linea"></div>
                    </div>
                </div>
            </div>

        </>
    )
}
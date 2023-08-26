import { FaInfo, FaTrash, FaPenSquare } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";

export default function Empleados() {
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

                            <h1 className="tituloEmpleados">Mantenimiento</h1>

                            <div className="linea"></div>
                            <div className="tabla-container">
                                <table className="TablaEmpleados">


                                    <thead>
                                        <tr>
                                            <th>Cédula</th>
                                            <th>Nombre</th>
                                            <th>Primer Apellido</th>
                                            <th>Segundo Apellido</th>
                                            <th>Email</th>
                                            <th>Contraseña</th>
                                            <th>Tipo</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>623145890</td>
                                            <td>Antony</td>
                                            <td>Valverde</td>
                                            <td>Rojas</td>
                                            <td>antony.valverde@gmail.com</td>
                                            <td>Tgas3839</td>
                                            <td>Empleado</td>

                                            <td>
                                                <FaPenSquare className="iconsEdit" title="Editar." />
                                                <FaInfo className="iconsInfo" title="Más Información." />
                                                <FaTrash className="iconsEliminar" title="Eliminar." />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>234515830</td>
                                            <td>Ronaldo</td>
                                            <td>Perez</td>
                                            <td>Rivas</td>
                                            <td>ronaldo_rivas425@gmail.com</td>
                                            <td>ksas2672</td>
                                            <td>Empleado</td>
                                            <td>
                                                <FaPenSquare className="iconsEdit" title="Editar." />
                                                <FaInfo className="iconsInfo" title="Más Información." />
                                                <FaTrash className="iconsEliminar" title="Eliminar." />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>105594530</td>
                                            <td>Carlos</td>
                                            <td>Flores</td>
                                            <td>Flores</td>
                                            <td>Carlos/-/flores1990@gmail.com</td>
                                            <td>Kisaa90</td>
                                            <td>Gerente</td>
                                            <td>
                                                <FaPenSquare className="iconsEdit" title="Editar." />
                                                <FaInfo className="iconsInfo" title="Más Información." />
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
                                        <button
                                            className="icon-close"
                                            onClick={handleModalCloseTres}
                                        >SALIR</button>

                                    </div>
                                </div>

                            )}
                        </section>
                        <div className="linea"></div>
                        <section>
                            <div className="containerButton">
                                <Link className="sidebar_linkTres" href="/Gerentes/Empleados">Empleados</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Productos">Productos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Movimientos">Movimientos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Mantenimiento">Mantenimiento</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Ubicacion">Ubicación</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">Gráficas</Link>

                                <div className="sidebar_linkTres center-button" >
                                    <a href="./RegistrarEmpleados"> Registrar</a>
                                </div>

                                <Link className="sidebar_linkTres" href="/">Inicio</Link>

                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}
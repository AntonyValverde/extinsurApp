import Link from "next/link";
import router from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Empleados() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const handleFormSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        handleModalClose;
    };

    return (
        <>
            <div className="fondo">
                <div className="fondoEmpleados">
                    <nav>
                        <h1 className="tituloEmpleados">Empleados</h1>
                    </nav>
                    <nav>
                        {/* <button className="addbuttonE" onClick={handleModalOpen}>
                            Agregar Usuario
                        </button> */}
                        <a href="./RegistrarEmpleados"> Registrar</a>
                    </nav>
                    <section>
                        <nav>
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
                                            <FaEdit className="iconsEdit" title="Editar." />
                                            <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                            <FaEdit className="iconsEdit" title="Editar." />
                                            <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                                            <FaEdit className="iconsEdit" title="Editar." />
                                            <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
                                            <FaTrash className="iconsEliminar" title="Eliminar." />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </nav>
                    </section>
                    <section>
                        {isModalOpen && (
                            <div className="FondoModal">
                                <div className="modal">
                                    <div className="modal-content">
                                        <button
                                            className="icon-close"
                                            onClick={handleModalClose}
                                        >SALIR</button>

                                    </div>
                                </div>
                            </div>

                        )}
                    </section>
                </div>
            </div>
        </>
    )
}
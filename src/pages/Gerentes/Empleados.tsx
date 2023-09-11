import { FaInfo, FaTrash, FaPenSquare } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";

export default function Empleados() {
    const [isModalOpen, setIsEditarOpen] = useState(false);
    const [isModalOpenDos, setIsModalOpenDos] = useState(false);
    const [isModalOpenTres, setIsModalOpenTres] = useState(false);


    useEffect(() => {
        if (isModalOpen) {

        }
    }, [isModalOpen]);
    const EditarOpen = () => {
        setIsEditarOpen(true);
    };
    const handleModalClose = () => {
        setIsEditarOpen(false);

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

    const [borrarConfirmado, setBorrarConfirmado] = useState(false);

    const confirmarBorrar = () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esto? Esta acción no se puede deshacer.');

        if (confirmacion) {
            // Si el usuario confirma, realizar la acción de borrado aquí
            // Puedes ejecutar tu lógica de borrado o hacer una llamada a una API aquí
            // Ejemplo: eliminarItem(id);
            setBorrarConfirmado(true);
        } else {
            // Si el usuario cancela, no hagas nada
        }

        <div>
            {borrarConfirmado ? (
                <p>El elemento ha sido borrado.</p>
            ) : (
                <div>
                    <button onClick={confirmarBorrar}>Borrar</button>
                </div>
            )}
        </div>
    };


    const [backgroundColor, setBackgroundColor] = useState<string>('white');
    const colors = ['white', 'lightblue', 'lightgreen', 'lightpink'];  

    const changeBackgroundColor = (selectedColor: string) => {
        setBackgroundColor(selectedColor);
         
        if (typeof window !== 'undefined') {
            localStorage.setItem('backgroundColor', selectedColor);
        }
    };

    useEffect(() => {
         
        document.querySelector('.containerSidebar')?.setAttribute('style', `background: ${backgroundColor}`);
    }, [backgroundColor]);

    useEffect(() => {
         
        if (typeof window !== 'undefined') {
            const storedBackgroundColor = localStorage.getItem('backgroundColor');
            if (storedBackgroundColor) {
                setBackgroundColor(storedBackgroundColor);
            }
        }
    }, []);

    return (
        <>
            <div className="bodySidebar">

                <div className="containerSidebar">
                    <div><IndexGerenteInicioDos /></div>

                    <div className="bodyEmpleados">


                        <section>

                            <h1 className="tituloEmpleados">Empleados</h1>

                            <div className="linea"></div>
                            <div className="tabla-container">
                                <div className="buscadorContainer">
                                    <input type="text" className="BuscadorInput" placeholder="Buscar..." />
                                    <Link className="RegistrarButton" href="./RegistrarEmpleados">Registrar</Link>
                                    <div className="RegistrarButton">
                                        <div className="colorPalette">
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
                                                <FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." />
                                                <FaInfo onClick={handleModalOpenTres} className="iconsInfo" title="Más Información." />
                                                <FaTrash onClick={confirmarBorrar} className="iconsEliminar" title="Eliminar." />
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
                                                <FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." />
                                                <FaInfo onClick={handleModalOpenDos} className="iconsInfo" title="Más Información." />
                                                <FaTrash onClick={handleModalOpenTres} className="iconsEliminar" title="Eliminar." />
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
                                                <FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." />
                                                <FaInfo onClick={handleModalOpenDos} className="iconsInfo" title="Más Información." />
                                                <FaTrash onClick={handleModalOpenTres} className="iconsEliminar" title="Eliminar." />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>


                        </section>
                        <section>
                            {isModalOpen && (

                                <div className="modal ">
                                    <button
                                        className="icon-close"
                                        onClick={handleModalClose}
                                        style={{
                                            background: "none",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            color: "#555",
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px"

                                        }}
                                    >
                                        SALIR
                                    </button>
                                    <div className="modal-content" style={{
                                        background: "#f7f7f7",
                                        padding: "20px",

                                        top: "10px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                                    }}>

                                        <div className="linea" style={{ marginTop: "27px" }}></div>
                                        <section className="tabla-container">
                                            <table className="TablaEmpleados">


                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                        <th>Primer Apellido</th>
                                                        <th>Segundo Apellido</th>
                                                        <th>Fecha Nacimientos</th>



                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>10<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Carlos<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Flores<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Rojas<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>23/01/1963<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                        <div className="linea"></div>
                                        <div className="linea" style={{ marginTop: "27px" }}></div>
                                        <section className="tabla-container">
                                            <table className="TablaEmpleados">


                                                <thead>
                                                    <tr>
                                                        <th>Email</th>
                                                        <th>Contraseña</th>
                                                        <th>Tipo</th>
                                                        <th>Tipo de Cédula</th>
                                                        <th>Cédula</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Carlos/-/flores1990@gmail.com<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Kisaa90<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Gerente<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>Nacional<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>
                                                        <td>102317282<FaPenSquare onClick={EditarOpen} className="iconsEdit" title="Editar." /></td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                        <div className="linea"></div>

                                    </div>

                                </div>

                            )}
                        </section>
                        <section>
                            {isModalOpenDos && (

                                <div className="modal ">
                                    <div className="modal-content" style={{
                                        background: "#f7f7f7",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                                    }}>
                                        <button
                                            className="icon-close"
                                            onClick={handleModalCloseDos}
                                            style={{
                                                background: "none",
                                                borderRadius: "10px",
                                                border: "1px solid",
                                                color: "#555",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px"
                                            }}
                                        >
                                            SALIR
                                        </button>

                                    </div>

                                </div>

                            )}
                        </section>
                        <section>
                            {isModalOpenTres && (

                                <div className="modal ">
                                    <button
                                        className="icon-close"
                                        onClick={handleModalCloseTres}
                                        style={{
                                            background: "none",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            color: "#555",
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px"

                                        }}
                                    >
                                        SALIR
                                    </button>
                                    <div className="modal-content" style={{
                                        background: "#f7f7f7",
                                        padding: "20px",
                                        top: "10px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                                    }}>

                                        <div className="linea" style={{ marginTop: "27px" }}></div>
                                        <section className="tabla-container">
                                            <table className="TablaEmpleados">


                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                        <th>Primer Apellido</th>
                                                        <th>Segundo Apellido</th>
                                                        <th>Fecha Nacimientos</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>10 </td>
                                                        <td>Carlos </td>
                                                        <td>Flores </td>
                                                        <td>Rojas</td>
                                                        <td>23/01/1963</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                        <div className="linea"></div>
                                        <div className="linea" style={{ marginTop: "27px" }}></div>
                                        <section className="tabla-container">
                                            <table className="TablaEmpleados">


                                                <thead>
                                                    <tr>
                                                        <th>Email</th>
                                                        <th>Contraseña</th>
                                                        <th>Tipo</th>
                                                        <th>Tipo de Cédula</th>
                                                        <th>Cédula</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Carlos/-/flores1990@gmail.com </td>
                                                        <td>Kisaa90 </td>
                                                        <td>Gerente </td>
                                                        <td>Nacional </td>
                                                        <td>102317282 </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                        <div className="linea"></div>

                                    </div>

                                </div>

                            )}
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}
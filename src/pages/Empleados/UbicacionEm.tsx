import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import Link from "next/link";

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

                            <h1 className="tituloEmpleados">Ubicación</h1>
                            <div className="linea"></div>
                            <div className="contenedorTabla">
                                <div className="buscadorContainer">
                                    <input type="text" className="BuscadorInput" placeholder="Buscar..." />
                                    <button onClick={handleModalOpenTres} className="RegistrarButton">Registrar</button>
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
                                            <th>Fecha</th>
                                            <th>Ubicación</th>
                                            <th>Dirección</th>
                                            <th>Tiempo</th>
                                            <th></th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >24/03/2022</td>
                                            <td>Ciudad Neily frente al instituto cated</td>
                                            <td>https://maps.app.goo.gl/Lpd7S5KN3sxP4FcD7</td>
                                            <td>4 Horas</td>


                                            <td>
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
                                                <FaTrash className="iconsEliminar" title="Eliminar." />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>14/04/2021</td>
                                            <td>Rio claro frente la bomba</td>
                                            <td>https://maps.app.goo.gl/8HDRTyBW89rJ3KKq6</td>
                                            <td>6 horas</td>

                                            <td>
                                                <FaEdit className="iconsEdit" title="Editar." />
                                                <IoInformationCircleSharp className="iconsInfo" title="Más Información." />
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
                        <section>
                            <div className="containerButton">
                                <Link className="sidebar_linkTres" href="/Gerentes/Empleados">Empleados</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Productos">Productos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Movimientos">Movimientos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Mantenimiento">Mantenimiento</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Ubicacion">Ubicación</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">Gráficas</Link>

                                <div className="sidebar_linkTres center-button" >
                                    <a href="./RegistrarEmpleados"> Agregar</a>
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
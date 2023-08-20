import { FaRegUserCircle,  FaSistrix} from 'react-icons/fa'
import Link from "next/link";
import React from 'react';

const Header_index = ({ }) => {
    return (
        <>
            <div className="Header">

                <h1 className="nombreEmpresa">ExtinSur</h1>

                <div className="contenedorBusqueda">
                    <input className="barraBusqueda" type="text" />
                    <FaSistrix className="lupa" ></FaSistrix>
                </div>

                <nav className="navegation">
                    <Link href="/IndexInicioSesion" className="buttonBorder">
                        <span className="text">Iniciar Secion</span>
                        <FaRegUserCircle className="icons"></FaRegUserCircle>
                    </Link>
                </nav>

            </div>

        </>
    );
};
export default Header_index;
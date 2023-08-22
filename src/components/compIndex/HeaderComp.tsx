import { FaRegUserCircle, FaSistrix } from 'react-icons/fa'
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
                        <span className="textInicio">Iniciar Sesion</span>
                        <FaRegUserCircle className="iconsInicio"></FaRegUserCircle>
                    </Link>
                </nav>

            </div>

        </>
    );
};
export default Header_index;
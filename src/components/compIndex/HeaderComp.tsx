import { FaRegUserCircle, FaSistrix } from 'react-icons/fa'
import Link from "next/link";
import React from 'react';

const Header_index = ({ }) => {
    return (
        <>
            <div className="Header">

                <h1 className="nombreEmpresa">ExtinSur</h1>

                <nav className="navegation">
                    <Link href="/IndexInicioSesion" className="buttonBorder">
                        <span className="textInicio">Iniciar Sesión</span>
                        <FaRegUserCircle className="iconsInicioSesion"></FaRegUserCircle>
                    </Link>
                </nav>

            </div>

        </>
    );
};
export default Header_index;
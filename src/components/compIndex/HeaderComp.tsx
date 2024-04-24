import { FaRegUserCircle } from 'react-icons/fa';
import Link from "next/link";
import React from 'react';

const Header_index = () => {
    return (
        <div className="Header" data-testid="header">
            <h1 className="nombreEmpresa" data-testid="h1-nombreEmpresa">ExtinSur</h1>

            <nav className="navegation" data-testid="nav-navegation">
                <Link href="/IndexInicioSesion" className="buttonBorder" data-testid="login-link">
                    <span className="textInicio" data-testid="span-textInicio">Iniciar Sesión</span>
                    <FaRegUserCircle className="iconsInicioSesion"/>
                </Link>
            </nav>
        </div>
    );
};

export default Header_index;

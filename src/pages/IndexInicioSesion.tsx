import { FaReply, FaEye } from 'react-icons/fa'
import Link from "next/link";
import React, { useState } from 'react';
import router from "next/router";


export default function IndexInicioSesion() {
    const [VerContrasena, setVerContrasena] = useState(false);
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [SelectedOption, setSelectedOption] = useState('Opciones');

    const InicioLinkClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push("/");
    };

    const handleLogin = () => {


        if (!Email.trim() || !Password.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }


        const redirectTo = SelectedOption == 'Gerente' ? '/IndexGerenteInicio' : '/IndexEmpleadoInicio';
        console.log('Iniciar sesión y redireccionar a:', redirectTo);
    };

    const verContraseña = () => {
        setVerContrasena(!VerContrasena);
    };

    const opcionElegida = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="FondoInicioSecion">

                <div className="contenedorInicio">
                    <nav className="navegationSecion">
                        <Link href="#" className="buttonBorderAtras" onClick={InicioLinkClick}>

                            <FaReply className="iconsSalir"></FaReply>
                        </Link>
                    </nav>
                    <form className="contenedorFormulario">
                        <h1 className="titulo">ExtinSur Login</h1>
                        <div className="caja">
                            <h3 className="texto">Email</h3>
                            <input
                                type="text"
                                className="input"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="caja">
                            <h3 className="texto" >Contraseña</h3>
                            <div className="inputContenedor">
                                <input
                                    type={VerContrasena ? 'text' : 'password'}
                                    className="input"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="botonVer" type="button" onClick={verContraseña} >
                                    <FaEye className="ojoPNG"></FaEye>
                                </button>
                            </div>

                        </div>
                        <div className="caja">
                            <div className="contenedorOpcion">
                                <button className="botonOpcion">{SelectedOption} <></> </button>
                                <div className="opcionContenido">
                                    <a href="#" onClick={() => opcionElegida('Empleado')}>Empleado</a>
                                    <a href="#" onClick={() => opcionElegida('Gerente')}>Gerente</a>
                                </div>
                            </div>
                        </div>
                        <div className="cajax">
                            <a className="IniciarSecionLink" href="/IndexGerenteInicio">Iniciar Sesión</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
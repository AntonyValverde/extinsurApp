import Link from "next/link";
import router from "next/router";
import { useState } from 'react';
import{ FaEye, FaReply } from 'react-icons/fa'

const InicioLinkClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/");
};

export default function indexInicioSecion() {
    const [VerContrasena, setVerContrasena] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('Opciones');

    const verContraseña = () => {
        setVerContrasena(!VerContrasena);
    };

    const opcionElegida = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="FondoInicioSecion">
                <nav className="navegationSecion">
                    <Link href="#" className="buttonBorderAtras" onClick={InicioLinkClick}>
                       
                        <FaReply className="icons"></FaReply>
                    </Link>
                    
                </nav>
                <div className="contenedorInicio">
                    <form className="contenedorFormulario">
                        <h1 className="titulo">ExtinSur Login</h1>
                        <div className="caja">
                            <h3 className="texto">Email</h3>
                            <input type="text" className="input" />
                        </div>
                        <div className="caja">
                            <h3 className="texto" >Contraseña</h3>
                            <div className="inputContenedor">
                                <input
                                    type={VerContrasena ? 'text' : 'password'}
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="botonVer" type="button" onClick={verContraseña} >
                                    <FaEye className="ojoPNG"></FaEye>
                                </button>
                            </div>

                        </div>
                        <div className="caja">
                            <div className="contenedorOpcion">
                                <button className="botonOpcion">{selectedOption} <></> </button>
                                <div className="opcionContenido">
                                    <a href="#" onClick={() => opcionElegida('Empleado')}>Empleado</a>
                                    <a href="#" onClick={() => opcionElegida('Gerente')}>Gerente</a>
                                </div>
                            </div>
                        </div>
                        <div className="cajax">
                            <a className="IniciarSecionLink" href={selectedOption === 'Gerente' ? '/indexGerenteInicio' : '/indexEmpleadoInicio'}>Iniciar Sesión</a>
      
                        </div>

                    </form>


                </div>

            </div>
        </>
    );
}
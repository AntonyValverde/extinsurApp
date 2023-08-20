import Link from "next/link";
import router from "next/router";
import {FaUser, FaUserTie, FaReplyAll, FaImages, FaFireExtinguisher, FaBook, FaChartBar, FaMapMarkerAlt, FaWhmcs } from 'react-icons/fa'


export default function IndexGerenteInicio() {
    const InicioLinkClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push("/");
    };

    return (
        <>
            <div className="FondoGerenteInicio">
                <nav className="navegationSecion">
                    <Link href="#" className="buttonBorderAtras" onClick={InicioLinkClick}>
                        <FaReplyAll className="iconsSalir"></FaReplyAll>
                    </Link>
                </nav>
                <h1 className="tituloGerente">Gerencia ExtinSur</h1>

                <nav className="flex" >
                    <div className="column">
                        <FaUser className="iconsGerente"></FaUser>

                        <Link href="/indexCita" className="button">
                            Empleados
                        </Link>
                    </div>
                    <div className="column">
                        <FaUserTie className="iconsGerente"></FaUserTie>

                        <Link href="/indexCita" className="button">
                            Gerentes
                        </Link>
                    </div>
                    <div className="column">
                        <FaBook className="iconsGerente"></FaBook>

                        <Link href="/indexCita" className="button">
                            Movimientos
                        </Link>
                    </div>

                </nav>
                <nav  className="flex" >
                    <div className="column">
                        <FaChartBar className="iconsGerente"></FaChartBar>

                        <Link href="/indexCita" className="button">
                            Graficas
                        </Link>
                    </div>
                    <div className="column">
                        <FaMapMarkerAlt className="iconsGerente"></FaMapMarkerAlt>

                        <Link href="/indexCita" className="button">
                            Ubicaciones
                        </Link>
                    </div>
                    <div className="column">
                        <FaWhmcs className="iconsGerente"></FaWhmcs>

                        <Link href="/indexCita" className="button">
                            Mantenimiento
                        </Link>
                    </div>

                </nav>
                <nav  className="flex" >
                    <div className="column">
                        <FaImages className="iconsGerente2"></FaImages>

                        <Link href="/indexCita" className="button">
                            Rotulos
                        </Link>
                    </div>
                    <div className="column">
                        <FaFireExtinguisher className="iconsGerente2"></FaFireExtinguisher>

                        <Link href="/indexCita" className="button">
                            Extintores
                        </Link>
                    </div>
                     

                </nav>



            </div>

        </>
    )
}
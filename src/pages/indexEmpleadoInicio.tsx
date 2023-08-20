import Link from "next/link";
import router from "next/router";

export default function IndexEmpleadoInicio() {
    const InicioLinkClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push("/");
    };

    return (
        <>
            <div className="FondoGerenteInicio">
                <nav className="navegationSecion">
                    <Link href="#" className="buttonBorderAtras" onClick={InicioLinkClick}>
                        Salir
                    </Link>
                </nav>
                <h1 className="tituloGerente">Empleados ExtinSur</h1>
                <nav>
                    <div className="column">
                        <h3 className="title">Date Units</h3>
                        
                        <Link href="/indexCita" className="button">
                            Citas Unidades
                        </Link>
                    </div>
                </nav>

                <nav className="Botonera">
                    <button>Inventario</button>
                    <button>Graficas</button>
                    <button>Mantenimiento</button>
                </nav>
            </div>

        </>
    )
}
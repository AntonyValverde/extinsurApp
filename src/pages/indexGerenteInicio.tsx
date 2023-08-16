import Link from "next/link";
import router from "next/router";

export default function Home() {
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
                <h1 className="tituloGerente">Gerencia ExtinSur</h1>

                <nav className="Botonera">
                    <button>Empleados</button>
                    <button>Inventario</button>
                    <button>Movimientos</button>
                    <button>Graficas</button>
                    <button>Ubicaciones</button>
                    <button>Mantenimiento</button>
                </nav>
            </div>

        </>
    )
}
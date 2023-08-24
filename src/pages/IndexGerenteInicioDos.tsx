import Link from "next/link";
import router from "next/router";
import { FaUser, FaAngleRight } from 'react-icons/fa'
import Sidebar from "./Gerentes/Sidebar";




export default function IndexGerenteInicioDos() {
    return (
        <div className="bodySidebar">
            <div className="containerSidebar">
                <div className="asideSidebar">
                    <Sidebar/>
                </div>
                
                <div>
                   
                     
                     
                     

                </div>

            </div>
        </div>

        
    )
}


/*<Link href="">Trabajadores</Link><FaUserTie className="iconsGerente"></FaUserTie>
<Link href="">Productos </Link> <FaFireExtinguisher className="iconsGerente2"></FaFireExtinguisher>
<Link href="">Movimientos </Link><FaBook className="iconsGerente"></FaBook>
<Link href="">Mantenimiento</Link><FaWhmcs className="iconsGerente"></FaWhmcs>
<Link href="">Grafica</Link><FaChartBar className="iconsGerente"></FaChartBar>
<Link href="">Ubicación</Link><FaMapMarkerAlt className="iconsGerente"></FaMapMarkerAlt>*/
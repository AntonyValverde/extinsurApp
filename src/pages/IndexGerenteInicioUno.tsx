import Link from "next/link";
import router from "next/router";
import { FaUser, FaAngleRight } from 'react-icons/fa'
import Sidebar from "./Empleados/SidebarEmpleado";




export default function IndexGerenteInicioDos() {
    return (
        <div className="bodySidebar">
            <div className="containerSidebar">
                <div className="asideSidebar">
                    <Sidebar/>
                </div>
            </div>
        </div>

        
    )
}

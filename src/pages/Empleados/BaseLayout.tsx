import {ReactNode} from "react"
import Sidebar from "./SidebarEmpleado";

interface Props{
    children: ReactNode | ReactNode[];
}

export default function BaseLayout({children}: Props) {
    return(
        <div className="layout">
            <Sidebar/>
            {children}
        </div>
    )
}
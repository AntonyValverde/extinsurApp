import Link from "next/link";
import Image from "next/image";
import { FaUser, FaAngleRight, FaHome, FaChartBar, FaIdBadge, FaMapMarkerAlt, FaFireExtinguisher, FaBook, FaWhmcs } from 'react-icons/fa'
import React, { useContext, useState } from 'react';
import { SidebarContext } from "./SidebarContextEm";
 

const sidebarItems = [
    {
        name: "Productos",
        href: "/Empleados/ProductosEm",
        icon: FaFireExtinguisher,
    },
    {
        name: "Movimientos",
        href: "/Empleados/MovimientosEm",
        icon: FaBook,
    },
    {
        name: "Mantenimiento",
        href: "/Empleados/MantenimientoEm",
        icon: FaWhmcs,
    },
    {
        name: "Ubicación",
        href: "/Empleados/UbicacionEm",
        icon: FaMapMarkerAlt,
    },
     
    {
        name: "Inicio",
        href: "/",
        icon: FaHome,
    },


];

 


export default function Sidebar() {

    const { isCollapsedSidebar, toogleSidevarColapseHandler } =
        useContext(SidebarContext)

    return (
        <>
            <button className="btnDos" onClick={toogleSidevarColapseHandler}>
                <FaAngleRight></FaAngleRight>
            </button>
            <div className="sidebar_wrapper">

                <aside className="asideGerente" data-collapse={isCollapsedSidebar}>
                    <button className="btn" onClick={toogleSidevarColapseHandler}>
                        <FaAngleRight></FaAngleRight>
                    </button>

                    <div className="content">
                        <div className="logo">
                            <Image width="300" height="300" className="sidebar_logo" src="/favicon copy.png" alt="11" />
                            <p className="sidebar_logo-name">ExtinSur</p>
                             


                        </div>
                        <ul className="sidebar_list">
                            {sidebarItems.map(({ name, href, icon: Icon }) => (
                                <li className="sidebar_item" key={name}>

                                    <Link href={href} className="sidebar_link">
                                        <span className="sidebar_icon">
                                            <Icon />
                                        </span>
                                        <span className="sidebar_name">{name}</span>
                                    </Link>
                                </li>
                            ))}


                        </ul></div>


                </aside>

            </div>



        </>
    )
}


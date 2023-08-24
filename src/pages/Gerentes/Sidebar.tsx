import Link from "next/link";
import Image from "next/image";
import { FaUser, FaAngleRight, FaHome, FaChartBar, FaIdBadge, FaMapMarkerAlt, FaFireExtinguisher, FaBook, FaWhmcs } from 'react-icons/fa'
import React, { useContext, useState } from 'react';
import { convertTypeAcquisitionFromJson } from "typescript";
import { SidebarContext } from "./SidebarContext";

const sidebarItems = [
    {
        name: "Empleados",
        href: "/Gerentes/Empleados",
        icon: FaIdBadge,
    },
    {
        name: "Productos",
        href: "/Gerentes/Productos",
        icon: FaFireExtinguisher,
    },
    {
        name: "Movimientos",
        href: "/Gerentes/Movimientos",
        icon: FaBook,
    },
    {
        name: "Mantenimiento",
        href: "/",
        icon: FaWhmcs,
    },
    {
        name: "Ubicación",
        href: "/Gerentes/Ubicacion",
        icon: FaMapMarkerAlt,
    },
    {
        name: "Grafica",
        href: "/Grtentes/Grafica",
        icon: FaChartBar,
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
                            <Image width="30" height="30" className="sidebar_logo" src="/favicon copy.png" alt="11" />
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


/*<Link href="">Trabajadores</Link><FaUserTie className="iconsGerente"></FaUserTie>
<Link href="">Productos </Link> <FaFireExtinguisher className="iconsGerente2"></FaFireExtinguisher>
<Link href="">Movimientos </Link><FaBook className="iconsGerente"></FaBook>
<Link href="">Mantenimiento</Link><FaWhmcs className="iconsGerente"></FaWhmcs>
<Link href="">Grafica</Link><FaChartBar className="iconsGerente"></FaChartBar>
<Link href="">Ubicación</Link><FaMapMarkerAlt className="iconsGerente"></FaMapMarkerAlt>*/
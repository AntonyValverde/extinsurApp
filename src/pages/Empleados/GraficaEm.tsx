import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import IndexGerenteInicioDos from "../IndexGerenteInicioUno";
import Link from "next/link";
import { ResponsiveContainer, BarChart, XAxis, YAxis, RadialBar, RadialBarChart, Tooltip, Bar, Legend, PieChart, Pie, CartesianGrid, AreaChart, Line, Area, } from "recharts";




export default function Grafica() {
     



    const datos = [
        { fecha: "23/03/22", Total: 35000, IVA: 4550, Costo: 8000, Ganancias: 22450 }, /*35000 total*/
        { fecha: "12/01/21", Total: 44000, IVA: 5720, Costo: 10030, Ganancias: 28250 }, /*44000total*/
        { fecha: "23/12/20", Total: 23000, IVA: 2990, Costo: 11000, Ganancias: 9010 }, /*23000 total*/
        { fecha: "22/02/22", Total: 54000, IVA: 7020, Costo: 12530, Ganancias: 34450 }, /*54000 total*/
        { fecha: "02/04/23", Total: 33000, IVA: 4290, Costo: 21800, Ganancias: 6910 }, /*33000 total*/
        { fecha: "21/11/21", Total: 23000, IVA: 2990, Costo: 8120, Ganancias: 11890 }, /*23000 total*/
    ];

    const num = [
        { name: 'Rotulos', Cantidad: 400 },
        { name: 'Extintores', Cantidad: 300 },
        { name: 'Otros', Cantidad: 300 },

    ];

    const dates = [
        {
            Mes: 'Ene',
            Ganancias: 454000,
        },
        {
            Mes: 'Feb',
            Ganancias: 2123000,

        },
        {
            Mes: 'Marz',
            Ganancias: 2322300,
        },
        {
            Mes: 'Abr',
            Ganancias: 3332000,
        },
        {
            Mes: 'May',
            Ganancias: 530330,
        },
        {
            Mes: 'Jun',
            Ganancias: 2673000,
        },
        {
            Mes: 'Jul',
            Ganancias: 898300,
        },
        {
            Mes: 'Agos',
            Ganancias: 3978000,
        },
        {
            Mes: 'Sep',
            Ganancias: 778300,
        },
        {
            Mes: 'Oct',
            Ganancias: 1313000,
        },
        {
            Mes: 'Nov',
            Ganancias: 2313000,
        },
        {
            Mes: 'Dic',
            Ganancias: 523000,
        },
    ];

    const [backgroundColor, setBackgroundColor] = useState<string>("white");
    const colors = ["white", "lightblue", "lightgreen", "lightpink"];
  
    const changeBackgroundColor = (selectedColor: string) => {
      setBackgroundColor(selectedColor);
  
      if (typeof window !== "undefined") {
        localStorage.setItem("backgroundColor", selectedColor);
      }
    };
  
    useEffect(() => {
      document
        .querySelector(".containerSidebar")
        ?.setAttribute("style", `background: ${backgroundColor}`);
    }, [backgroundColor]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedBackgroundColor = localStorage.getItem("backgroundColor");
        if (storedBackgroundColor) {
          setBackgroundColor(storedBackgroundColor);
        }
      }
    }, []);


    return (
        <>
            <div className="bodySidebar">
                <div className="containerSidebar">
                    <div><IndexGerenteInicioDos /></div>


                    <div className="bodyGrafica">


                        <section>

                            <h1 className="tituloEmpleados">Graficas</h1>
                             
                            <div className="linea"></div>
                            <div className="contenedorTablaGrafica">

                                <div className="circular">
                                    <div style={{ width: '60%', height: 250 }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie dataKey="Cantidad" data={num} fill="#8884d8" label />

                                            </PieChart>

                                        </ResponsiveContainer>
                                    </div>

                                    <ResponsiveContainer width="100%" aspect={2} >
                                        <BarChart
                                            data={datos}
                                            width={500}
                                            height={300}
                                            margin={{
                                                top: 5,
                                                right: 40,
                                                left: 20,
                                                bottom: 5
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="4 1 2" />
                                            <XAxis dataKey="fecha" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Total" fill="#6b48ff" />
                                            <Bar dataKey="IVA" fill="#1ee3cf" />
                                            <Bar dataKey="Costo" fill="#ff00e6" />
                                            <Bar dataKey="Ganancias" fill="#018509" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="barras">
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <AreaChart
                                                data={dates}
                                                margin={{
                                                    top: 50,
                                                    right: 30,
                                                    left: 50,
                                                    bottom: 0,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="Mes" />
                                                <YAxis />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="Ganancias" stroke="#8884d8" fill="#8884d8" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    


                                </div>
                                

                            </div>

                        </section>

                        <div className="linea"></div>
                        <section>
                            <div className="containerButton">
                                <Link className="sidebar_linkTres" href="/Gerentes/Empleados">Empleados</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Productos">Productos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Movimientos">Movimientos</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Mantenimiento">Mantenimiento</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Ubicacion">Ubicación</Link>
                                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">Gráficas</Link>

                                <div className="sidebar_linkTres center-button" >
                                    <a href="./RegistrarEmpleados"> Agregar</a>
                                </div>

                                <Link className="sidebar_linkTres" href="/">Inicio</Link>

                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}
import { FaEdit, FaTrash, FaDoorOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  RadialBar,
  RadialBarChart,
  Tooltip,
  Bar,
  Legend,
  PieChart,
  Pie,
  CartesianGrid,
  AreaChart,
  Line,
  Area,
} from "recharts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Grafica() {
  const [dataCaja, setDataCaja] = useState<any[]>([]);
  const [dateCaja, setDateCaja] = useState<any[]>([]);
  const [dateCajaFin, setDateCajaFin] = useState<any[]>([]);
  const [Rotulos, setRotulos] = useState(0);
  const [Extintores, setExtintores] = useState(0);
  const [Otros, setOtros] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const colors = [
    "#294D61",
    "#6DA5C0",
    "#0F9690",
    "#0C7075",
    "#072E33",
    "#26425A",
    "#AAAAAA",
    "#808080",
    "#555555",
  ];

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
  useEffect(() => {
    const cajaDataUnsubscribe = onSnapshot(
      collection(db, "Movimiento"),
      (querySnapshot) => {
        const data: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setDateCaja(data);
      }
    );
    const cajaDataFinanzas = onSnapshot(
      collection(db, "Finanzas"),
      (querySnapshot) => {
        const data: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setDateCajaFin(data);
      }
    );
    const cajaDataProduct = onSnapshot(
      collection(db, "Producto"),
      (querySnapshot) => {
        let sumaExtintor = 0;
        let sumaRotulo = 0;
        let sumaOtro = 0;
        const data: React.SetStateAction<any[]> = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          const producto = doc.data();
          if (producto.Tipo === "Extintor") {
            if (!isNaN(producto.Cantidad)) {
              sumaExtintor += Number(producto.Cantidad);
            }
          } else if (producto.Tipo === "Rotulo") {
            if (!isNaN(producto.Cantidad)) {
              sumaRotulo += Number(producto.Cantidad);
            }
          } else if (producto.Tipo === "Otro") {
            if (!isNaN(producto.Cantidad)) {
              sumaOtro += Number(producto.Cantidad);
            }
          }
        });
        setRotulos(sumaRotulo);
        setExtintores(sumaExtintor);
        setOtros(sumaOtro);
        setDataCaja(data);
      }
    );

    return () => {
      cajaDataUnsubscribe();
      cajaDataProduct();
    };
  }, []);

  const datos = dateCajaFin.map((item) => ({
    fecha: item.Dia + "/" + item.Mes + "/" + item.Anno,
    Total: item.Total,
    IVA: item.TIVA,
    Ganancias: item.Ganancias,
  }));

  //------------------

  //--------------------

  const num = dateCaja.map((item) => ({
    name: item.Tipo,
    Cantidad: item.Cantidad,
  }));

  const nume = [
    { name: "Rotulos", Cantidad: Rotulos },
    { name: "Extintores", Cantidad: Extintores },
    { name: "Otros", Cantidad: Otros },
  ];

  const datis = [
    {
      fecha: "23/03/22",
      Total: 35000,
      IVA: 4550,
      Costo: 8000,
      Ganancias: 22450,
    } /*35000 total*/,
    {
      fecha: "12/01/21",
      Total: 44000,
      IVA: 5720,
      Costo: 10030,
      Ganancias: 28250,
    } /*44000total*/,
    {
      fecha: "23/12/20",
      Total: 23000,
      IVA: 2990,
      Costo: 11000,
      Ganancias: 9010,
    } /*23000 total*/,
    {
      fecha: "22/02/22",
      Total: 54000,
      IVA: 7020,
      Costo: 12530,
      Ganancias: 34450,
    } /*54000 total*/,
    {
      fecha: "02/04/23",
      Total: 33000,
      IVA: 4290,
      Costo: 21800,
      Ganancias: 6910,
    } /*33000 total*/,
    {
      fecha: "21/11/21",
      Total: 23000,
      IVA: 2990,
      Costo: 8120,
      Ganancias: 11890,
    } /*23000 total*/,
  ];

  const dates = [
    {
      Mes: "Ene",
      Ganancias: 454000,
    },
    {
      Mes: "Feb",
      Ganancias: 2123000,
    },
    {
      Mes: "Marz",
      Ganancias: 2322300,
    },
    {
      Mes: "Abr",
      Ganancias: 3332000,
    },
    {
      Mes: "May",
      Ganancias: 530330,
    },
    {
      Mes: "Jun",
      Ganancias: 2673000,
    },
    {
      Mes: "Jul",
      Ganancias: 898300,
    },
    {
      Mes: "Agos",
      Ganancias: 3978000,
    },
    {
      Mes: "Sep",
      Ganancias: 778300,
    },
    {
      Mes: "Oct",
      Ganancias: 1313000,
    },
    {
      Mes: "Nov",
      Ganancias: 2313000,
    },
    {
      Mes: "Dic",
      Ganancias: 523000,
    },
  ];

  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Estadísticas</h1>

              <div className="linea"></div>
              <div className="contenedorTablaGrafica">
                <div className="circular">
                  <div
                    style={{
                      width: "60%",
                      height: 270,
                      marginTop: "3rem",
                      marginLeft: "20%",
                    }}
                  >
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          dataKey="Cantidad"
                          data={nume}
                          fill="#8884d8"
                          label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index,
                          }) => {
                            const RADIAN = Math.PI / 180;
                            const radius =
                              25 + innerRadius + (outerRadius - innerRadius);
                            const x =
                              cx + radius * Math.cos(-midAngle * RADIAN);
                            const y =
                              cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#8884d8"
                                textAnchor={x > cx ? "start" : "end"}
                                dominantBaseline="central"
                              >
                                {`${nume[index].name}: ${value}`}
                              </text>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="barras">
                  <div
                    style={{
                      width: "65%",
                      height: 270,
                      marginTop: "3rem",
                      marginLeft: "18%",
                    }}
                  >
                    <ResponsiveContainer width="100%" aspect={2}>
                      <BarChart
                        data={datos}
                        width={500}
                        height={300}
                        margin={{
                          top: 5,
                          right: 40,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Total" fill="#6b48ff" />
                        <Bar dataKey="IVA" fill="#1ee3cf" />
                        <Bar dataKey="Ganancias" fill="#018509" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="barras">
                  <div style={{ width: "100%", height: 300 }}>
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
                        <Area
                          type="monotone"
                          dataKey="Ganancias"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>

            <div className="linea"></div>
            <section>
              <div className="containerButton">
                <Link className="sidebar_linkTres" href="/Gerentes/Empleados">
                  Empleados
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Productos">
                  Productos
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Movimientos">
                  Movimientos
                </Link>
                <Link
                  className="sidebar_linkTres"
                  href="/Gerentes/Mantenimiento"
                >
                  Mantenimiento
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Ubicacion">
                  Ubicación
                </Link>
                 

                <Link className="sidebar_linkTres" href="/">
                  Inicio
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

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
  const [dateMesEne, setMesEne] = useState(0);
  const [dateMesFeb, setMesFeb] = useState(0);
  const [dateMesMar, setMesMar] = useState(0);
  const [dateMesAbr, setMesAbr] = useState(0);
  const [dateMesMay, setMesMay] = useState(0);
  const [dateMesJun, setMesJun] = useState(0);
  const [dateMesJul, setMesJul] = useState(0);
  const [dateMesAgo, setMesAgo] = useState(0);
  const [dateMesSep, setMesSep] = useState(0);
  const [dateMesOct, setMesOct] = useState(0);
  const [dateMesNov, setMesNov] = useState(0);
  const [dateMesDic, setMesDic] = useState(0);
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
      collection(db, "Finanzas"),
      (querySnapshot) => {
        const dat: React.SetStateAction<any[]> = [];
        const data: React.SetStateAction<any[]> = [];
        let Ene = 0;
        let Feb = 0;
        let Mar = 0;
        let Abr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Ago = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dic = 0;
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          dat.push(doc.data());
          const Mess = doc.data();
          if (Mess.Mes == 1){
            if (!isNaN(Mess.Ganancias)) {
              Ene += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 2){
            if (!isNaN(Mess.Ganancias)) {
              Feb += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 3){
            if (!isNaN(Mess.Ganancias)) {
              Mar += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 4){
            if (!isNaN(Mess.Ganancias)) {
              Abr += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 5){
            if (!isNaN(Mess.Ganancias)) {
              May += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 6){
            if (!isNaN(Mess.Ganancias)) {
              Jun += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 7){
            if (!isNaN(Mess.Ganancias)) {
              Jul += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 8){
            if (!isNaN(Mess.Ganancias)) {
              Oct += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 9){
            if (!isNaN(Mess.Ganancias)) {
              Sep += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 10){
            if (!isNaN(Mess.Ganancias)) {
              Ago += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 11){
            if (!isNaN(Mess.Ganancias)) {
              Nov += Number(Mess.Ganancias);
            }
          }else if (Mess.Mes == 12){
            if (!isNaN(Mess.Ganancias)) {
              Dic += Number(Mess.Ganancias);
            }
          }
        });
        
        setMesEne(Ene);
        setMesFeb(Feb);
        setMesAbr(Abr);
        setMesMar(Mar);
        setMesMay(May);
        setMesJun(Jun);
        setMesJul(Jul);
        setMesOct(Oct);
        setMesSep(Sep);
        setMesAgo(Ago);
        setMesNov(Nov);
        setMesDic(Dic);
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

  

  const dates = [
    {
      Mes: "Ene",
      Ganancias: dateMesEne,
    },
    {
      Mes: "Feb",
      Ganancias: dateMesFeb,
    },
    {
      Mes: "Mar",
      Ganancias: dateMesMar,
    },
    {
      Mes: "Abr",
      Ganancias: dateMesAbr,
    },
    {
      Mes: "May",
      Ganancias: dateMesMay,
    },
    {
      Mes: "Jun",
      Ganancias: dateMesJun,
    },
    {
      Mes: "Jul",
      Ganancias: dateMesJul,
    },
    {
      Mes: "Agos",
      Ganancias: dateMesAgo,
    },
    {
      Mes: "Sep",
      Ganancias: dateMesSep,
    },
    {
      Mes: "Oct",
      Ganancias: dateMesOct,
    },
    {
      Mes: "Nov",
      Ganancias: dateMesNov,
    },
    {
      Mes: "Dic",
      Ganancias: dateMesDic,
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
                      width: "70%",
                      height: "15rem",
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
                  <div style={{ width: "100%", height: 300, marginTop: 100 }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={dates}
                        margin={{
                          top: 30,
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

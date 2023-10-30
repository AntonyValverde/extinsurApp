import {
  FaInfo,
  FaTrash,
  FaPenSquare,
  FaEdit,
  FaRegTimesCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";
import { IoInformationCircleSharp } from "react-icons/io5";
import { displayPartsToString } from "typescript";

export default function Productos() {
  //-----------------------------------------------------------------Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isModalOpenCuatro, setIsModalOpenCuatro] = useState(false);
  //----------------------------------------------------------------Variables
  const [Codigo, setCodigo] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [Bodega, setBodega] = useState("");
  const [PrecioCompra, setPrecioCompra] = useState("");
  const [PrecioVenta, setPrecioVenta] = useState("");
  const [Agente, setAgente] = useState("");
  const [Clase, setClase] = useState("");
  const [Peso, setPeso] = useState("");
  const [Tipo, setTipo] = useState("");
  const [NumeroAleatorio, setNumeroAleatorio] = useState("");
  //----------------------------------------------------------------Tablas
  const [productData, setProductData] = useState<any[]>([]);
  const [extintorData, setExtCaja] = useState<any[]>([]);
  const [fechaData, setFechCaja] = useState<any[]>([]);
  const [rotulacionData, setRotCaja] = useState<any[]>([]);
  const [otrosData, setOtrosCaja] = useState<any[]>([]);
  const [infoData, setInfoData] = useState<any[]>([]);
  //------------------------------------------------------------Conexion fireBase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //-----------------------------------------------------------------Buscador
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterValue2, setFilterValue2] = useState("");
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  //--------------------------------------------------------------Modals Eliminar

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
    handleDeleteUser(NumeroAleatorio);
  };

  //------------------------------------------------------------Modals one show detalle
  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  //----------------------------------------------------------Modals dos extintor
  useEffect(() => {
    if (isModalOpenDos) {
    }
  }, [isModalOpenDos]);

  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
  };

  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
    setCantidad("");
    setCodigo("");
    setNombre("");
    setAgente("");
    setClase("");
    setBodega("");
    setPeso("");
    setPrecioCompra("");
    setPrecioVenta("");
  };
  //-------------------------------------------------------Modals tres add rotulo
  useEffect(() => {
    if (isModalOpenTres) {
    }
  }, [isModalOpenTres]);
  const handleModalOpenTres = () => {
    setIsModalOpenTres(true);
  };
  const handleModalCloseTres = () => {
    setIsModalOpenTres(false);
    setCantidad("");
    setCodigo("");
    setNombre("");
    setBodega("");
    setPrecioCompra("");
    setPrecioVenta("");
  };
  //--------------------------------------------------Modals cuatro add rotulo
  useEffect(() => {
    if (isModalOpenCuatro) {
    }
  }, [isModalOpenCuatro]);

  const handleModalOpenCuatro = () => {
    setIsModalOpenCuatro(true);
  };
  const handleModalCloseCuatro = () => {
    setIsModalOpenCuatro(false);
    setTipo("");
    setCantidad("");
    setCodigo("");
    setNombre("");
    setBodega("");
    setPrecioCompra("");
  };
  //-------------------------------------------------------------Color de fondo
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
  const [showColors, setShowColors] = useState(false);
  const toggleColorVisibility = () => {
    setShowColors(!showColors);
  };
  //---------------------------------------------------------Eliminar de la fireBase.
  const handleDeleteUser = async (Cedula: string) => {
    try {
      const employeesQuery = await getDocs(
        query(
          collection(db, "Extintores"),
          where("NumeroAleatorio", "==", NumeroAleatorio)
        )
      );

      if (!employeesQuery.empty) {
        // Si se encuentra un empleado con la misma cédula, eliminamos el documento del empleado
        const employeeDoc = employeesQuery.docs[0];
        const userId = employeeDoc.data().NumeroAleatorio;

        // Eliminamos el documento del empleado
        const employeeRef = doc(db, "Extintores", employeeDoc.id);
        await deleteDoc(employeeRef);

        // Buscamos el documento del usuario relacionado al empleado
        const usersQuery = await getDocs(
          query(
            collection(db, "Extintores"),
            where("NumeroAleatorio", "==", userId)
          )
        );
      } else {
        const employeesQuery = await getDocs(
          query(
            collection(db, "Rotulos"),
            where("NumeroAleatorio", "==", NumeroAleatorio)
          )
        );

        if (!employeesQuery.empty) {
          // Si se encuentra un empleado con la misma cédula, eliminamos el documento del empleado
          const employeeDoc = employeesQuery.docs[0];
          const userId = employeeDoc.data().NumeroAleatorio;

          // Eliminamos el documento del empleado
          const employeeRef = doc(db, "Rotulos", employeeDoc.id);
          await deleteDoc(employeeRef);

          // Buscamos el documento del usuario relacionado al empleado
          const usersQuery = await getDocs(
            query(
              collection(db, "Rotulos"),
              where("NumeroAleatorio", "==", userId)
            )
          );
        } else {
          const employeesQuery = await getDocs(
            query(
              collection(db, "Otros"),
              where("NumeroAleatorio", "==", NumeroAleatorio)
            )
          );

          if (!employeesQuery.empty) {
            // Si se encuentra un empleado con la misma cédula, eliminamos el documento del empleado
            const employeeDoc = employeesQuery.docs[0];
            const userId = employeeDoc.data().NumeroAleatorio;

            // Eliminamos el documento del empleado
            const employeeRef = doc(db, "Otros", employeeDoc.id);
            await deleteDoc(employeeRef);

            // Buscamos el documento del usuario relacionado al empleado
            const usersQuery = await getDocs(
              query(
                collection(db, "Otros"),
                where("NumeroAleatorio", "==", userId)
              )
            );
          } else {
            console.log(
              "No se encontró ningún empleado con la cédula especificada."
            );
          }
        }
      }
    } catch (error) {
      console.log("No se elimino.");
    }
  };
  //----------------------------------------------------------Agregar extintor
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const cantidad = parseInt(Cantidad, 10);
      const productosData = {
        Cantidad,
        Codigo,
        Tipo: "Extintor",
      };
      for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 1000);
        const extintoresData = {
          Agente,
          Bodega,
          Clase,
          Codigo,
          Peso,
          Tipo: "Extintor",
          PrecioCompra,
          PrecioVenta,
          NumeroAleatorio: numeroAleatorio,
        };
        const fechaData = {
          Anno,
          Mes,
          Dia,
          Tipo,
          Codigo,
          NumeroAleatorio: numeroAleatorio,
        };

        await addDoc(collection(db, "Extintores"), extintoresData);
        await addDoc(collection(db, "FechaEntrada"), fechaData);
      }
      await addDoc(collection(db, "Productos"), productosData);

      const updateData = [...extintorData, { ...fechaActual, ...productData }];
      setProductData(updateData);
      handleModalCloseDos();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
    handleModalCloseDos();
  };
  //--------------------------------------------------------Agregar Rotulo
  const handleFormSubmitRotulos = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Tipo: "Rotulo",
      };
      const cantidad = parseInt(Cantidad, 10);
      for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 1000);
        const rotulosData = {
          Bodega,
          Codigo,
          Nombre,
          PrecioCompra,
          Tipo: "Rotulo",
          NumeroAleatorio: numeroAleatorio,
        };
        const fechaData = {
          Anno,
          Mes,
          Dia,
          Codigo,
          Tipo,
          NumeroAleatorio: numeroAleatorio,
        };
        await addDoc(collection(db, "Rotulos"), rotulosData);
        await addDoc(collection(db, "FechaEntrada"), fechaData);
      }

      await addDoc(collection(db, "Productos"), productosData);

      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
    handleModalCloseTres();
  };
  //--------------------------------------------------------------Agregar Otro
  const handleFormSubmitOtro = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Productos");
      const queryDB = await getDocs(
        query(usersRef, where("Codigo", "==", Codigo))
      );
      if (!queryDB.empty) {
        return;
      }
      const productosData = {
        Cantidad,
        Codigo,
        Tipo: "Otro",
      };
      const cantidad = parseInt(Cantidad, 10);
      for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 1000);
        const otrosData = {
          Agente,
          Bodega,
          Clase,
          Codigo,
          Peso,
          PrecioCompra,
          PrecioVenta,
          Tipo: "Otro",
          NumeroAleatorio: numeroAleatorio,
        };
        const fechaData = {
          Anno,
          Mes,
          Dia,
          Codigo,
          Tipo,
          NumeroAleatorio: numeroAleatorio,
        };
        await addDoc(collection(db, "Otros"), otrosData);
        await addDoc(collection(db, "FechaEntrada"), fechaData);
      }

      await addDoc(collection(db, "Productos"), productosData);

      handleModalCloseCuatro();
      handleModalClose();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };
  //----------------------------------------------------Obtiene las variables de fecha
  function obtenerFechaActual(): Date {
    return new Date();
  }

  const fechaActual: Date = obtenerFechaActual();

  const Anno: number = fechaActual.getFullYear();
  const Mes: number = fechaActual.getMonth() + 1;
  const Dia: number = fechaActual.getDate();

  console.log("Fecha actual:", fechaActual);
  console.log(`Año: ${Anno}, Mes: ${Mes}, Día: ${Dia}`);
  //Consume fireBase
  useEffect(() => {
    const productData = async () => {
      try {
        const queryDB = await getDocs(collection(db, "Productos"));
        const data: React.SetStateAction<any[]> = [];
        queryDB.forEach((doc) => {
          data.push(doc.data());
        });
        setProductData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const fetchData = async () => {
      try {
        const querydb = await getDocs(collection(db, "FechaEntrada"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setFechCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const RotulacionData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Rotulos"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setRotCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const otroData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Otros"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setOtrosCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };
    const extintorData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Extintores"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setExtCaja(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    fetchData();
    RotulacionData();
    otroData();
    productData();
    extintorData();
  }, []);
  //-----------------------------------------------------------Consume firebase detalle
  useEffect(() => {
    const DetalleData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Extintores"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          const detalle = doc.data();
          //-------------------------------------Aquí, verifica si el detalle tiene el código que deseas
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });

        const querydbTwo = await getDocs(collection(db, "Rotulos"));
        querydbTwo.forEach((doc) => {
          const detalle = doc.data();
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });

        const querydbThree = await getDocs(collection(db, "Otros"));
        querydbThree.forEach((doc) => {
          const detalle = doc.data();
          if (detalle.Codigo === Codigo && detalle.Tipo === Tipo) {
            data.push(detalle);
          }
        });
        setInfoData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    DetalleData();
  }, [Codigo]);
  //-------------------------------------------------------------Buscador
  useEffect(() => {
    const filtered = productData.filter((data) =>
      Object.keys(data).some((key) =>
        data[key].toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [filterValue, productData]);

  useEffect(() => {
    const filtered = fechaData.filter((data) =>
      Object.keys(data).some((key) =>
        data[key].toString().toLowerCase().includes(filterValue2.toLowerCase())
      )
    );
    setFilteredData2(filtered);
  }, [filterValue2, fechaData]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setFilterValue(value);
    setFilterValue2(value);
  };
  //Buscador
  const countEmployesActiveAndInactive = () => {
    const employeActive = productData.filter(
      (user) => user.estado === "Activo"
    );
    const employeInactive = productData.filter(
      (user) => user.estado === "Inactivo"
    );
    return {
      CountActive: employeActive.length,
      CountInactive: employeInactive.length,
    };
  };
  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };
  //Actualizar
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Productos"),
      async (querySnapshot) => {
        const employeesData: { id: string; Codigo: string }[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          employeesData.push({ id: doc.id, Codigo, ...data });
        });

         

        const combinedData = employeesData.map((employee) => {
          const relatedUser = productData.find(
            (user) => user.Codigo === employee.Codigo
          );
          return { ...employee, ...relatedUser };
        });

        setProductData(combinedData); // Actualiza el estado local con los datos combinados
      }
    );
    // Retorna una función de limpieza para detener la suscripción cuando el componente se desmonte
    return () => {
      unsubscribe();
    };
  }, []);
  //---------------------------------------------------------------Return
  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyProductos">
            <section>
              <h1 className="tituloEmpleados">Productos</h1>
              <div className="linea"></div>
              {/*-------------------------------------------Modals add extintor */}
              <section>
                {isModalOpenDos && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseDos}
                      />
                      <form onSubmit={handleFormSubmitExtintor}>
                        <label className="textDos">Cantidad:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="textDos">Codigo:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Tipo:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Tipo}
                          placeholder="Tipo"
                          onChange={(e) => setTipo(e.target.value)}
                          required
                        />
                        <label className="textDos">Agente:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Agente}
                          placeholder="Agente"
                          onChange={(e) => setAgente(e.target.value)}
                          required
                        />
                        <label className="textDos">Clase:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Clase}
                          placeholder="Clase"
                          onChange={(e) => setClase(e.target.value)}
                          required
                        />
                        <label className="textDos">Bodega:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />
                        <label className="textDos">Peso:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Peso}
                          placeholder="Peso"
                          onChange={(e) => setPeso(e.target.value)}
                          required
                        />
                        <label className="textDos">Precio Compra:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label className="textDos">Precio Venta:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={PrecioVenta}
                          placeholder="Precio Venta"
                          onChange={(e) => setPrecioVenta(e.target.value)}
                          required
                        />

                        <button className="RegistrarButton" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>

              {/*-------------------------------------------Modals add rotulo */}
              <section>
                {isModalOpenTres && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseTres}
                      />
                      <form onSubmit={handleFormSubmitRotulos}>
                        <label className="textDos">Cantidad:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="textDos">Codigo:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Nombre:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />

                        <label className="textDos">Bodega:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />

                        <label className="textDos">Precio Compra:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />
                        <label className="textDos">Precio Venta:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={PrecioVenta}
                          placeholder="Precio Venta"
                          onChange={(e) => setPrecioVenta(e.target.value)}
                          required
                        />

                        <button className="RegistrarButton" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>
              {/*-----------------------------------------------Modals add otro*/}
              <section>
                {isModalOpenCuatro && (
                  <div className="modalOtro">
                    <div className="modal-contentOtro">
                      <FaRegTimesCircle
                        className="iconsClose"
                        onClick={handleModalCloseCuatro}
                      />
                      <form onSubmit={handleFormSubmitOtro}>
                        <label className="textDos">Cantidad:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Cantidad}
                          placeholder="1"
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label className="textDos">Codigo:</label>
                        <input
                          className="inputRes"
                          type="number"
                          value={Codigo}
                          placeholder="Codigo"
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />

                        <label className="textDos">Nombre:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Nombre}
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />

                        <label className="textDos">Bodega:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={Bodega}
                          placeholder="Bodega"
                          onChange={(e) => setBodega(e.target.value)}
                          required
                        />

                        <label className="textDos">Precio Compra:</label>
                        <input
                          className="inputRes"
                          type="text"
                          value={PrecioCompra}
                          placeholder="Precio Compra"
                          onChange={(e) => setPrecioCompra(e.target.value)}
                          required
                        />

                        <button className="RegistrarButton" type="submit">
                          Agregar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </section>
              {/*-----------------------------------------Modals detalles*/}
              <section>
                {isModalOpen && (
                  <div className="modalInfo">
                    <div className="modal-contentInfo">
                      <FaRegTimesCircle
                        className="iconsCloseInfo"
                        onClick={handleModalClose}
                      />
                      <table className="TablaEmpleados">
                        <thead>
                          <tr>
                            <th>Codigo</th>
                            <th>Tipo</th>
                            <th>Bodega</th>
                            <th>P.Venta</th>
                            <th>Unidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {infoData.map((users, index) => {
                            if (Tipo == "Extintor") {
                              const userDataIndex =
                                index < infoData.length ? index : null;
                              const dataTerceraTablaIndex =
                                index < extintorData.length ? index : null;
                              return (
                                <tr key={users.IdDetalle}>
                                  <td className="code">
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Codigo
                                      : ""}
                                  </td>
                                  <td>
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Tipo
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? extintorData[dataTerceraTablaIndex]
                                          .Bodega
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? extintorData[dataTerceraTablaIndex]
                                          .PrecioCompra
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? extintorData[dataTerceraTablaIndex]
                                          .NumeroAleatorio
                                      : ""}
                                  </td>

                                  <td>
                                    <FaTrash
                                      className="iconsEliminar"
                                      title="Eliminar."
                                      onClick={() => {
                                        handleDeleteModal();
                                        setNumeroAleatorio(
                                          users.NumeroAleatorio
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            } else if (Tipo == "Rotulo") {
                              const userDataIndex =
                                index < infoData.length ? index : null;
                              const dataTerceraTablaIndex =
                                index < rotulacionData.length ? index : null;
                              return (
                                <tr key={users.IdDetalle}>
                                  <td className="code">
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Codigo
                                      : ""}
                                  </td>
                                  <td>
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Tipo
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? rotulacionData[dataTerceraTablaIndex]
                                          .Bodega
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? rotulacionData[dataTerceraTablaIndex]
                                          .PrecioCompra
                                      : ""}
                                  </td>

                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? rotulacionData[dataTerceraTablaIndex]
                                          .NumeroAleatorio
                                      : ""}
                                  </td>

                                  <td>
                                    <FaTrash
                                      className="iconsEliminar"
                                      title="Eliminar."
                                      onClick={() => {
                                        handleDeleteModal();
                                        setNumeroAleatorio(
                                          users.NumeroAleatorio
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            } else if (Tipo == "Otro") {
                              const userDataIndex =
                                index < infoData.length ? index : null;
                              const dataTerceraTablaIndex =
                                index < otrosData.length ? index : null;

                              return (
                                <tr key={users.IdDetalle}>
                                  <td className="code">
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Codigo
                                      : ""}
                                  </td>
                                  <td>
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Tipo
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? otrosData[dataTerceraTablaIndex].Bodega
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? otrosData[dataTerceraTablaIndex]
                                          .PrecioCompra
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? otrosData[dataTerceraTablaIndex]
                                          .NumeroAleatorio
                                      : ""}
                                  </td>
                                  <td>
                                    <FaTrash
                                      className="iconsEliminar"
                                      title="Eliminar."
                                      onClick={() => {
                                        handleDeleteModal();
                                        setNumeroAleatorio(
                                          users.NumeroAleatorio
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            } else {
                              const userDataIndex =
                                index < infoData.length ? index : null;
                              const dataTerceraTablaIndex =
                                index < extintorData.length ? index : null;

                              return (
                                <tr key={users.IdDetalle}>
                                  <td className="code">
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Codigo
                                      : ""}
                                  </td>
                                  <td>
                                    {userDataIndex !== null
                                      ? infoData[userDataIndex].Tipo
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? extintorData[dataTerceraTablaIndex]
                                          .Bodega
                                      : ""}
                                  </td>
                                  <td>
                                    {dataTerceraTablaIndex !== null
                                      ? extintorData[dataTerceraTablaIndex]
                                          .PrecioCompra
                                      : ""}
                                  </td>

                                  <td>
                                    <FaTrash
                                      className="iconsEliminar"
                                      title="Eliminar."
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
              {/*---------------------------------------------Estructura principal*/}
              {/*---------------------------------------------Principal structure*/}
              <div className="contenedorTabla">
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                    value={searchQuery}
                    name="Buscar"
                    onChange={handleSearchChange}
                  />
                  <button
                    onClick={handleModalOpenDos}
                    className="RegistrarButton"
                  >
                    Extintor
                  </button>
                  <button
                    onClick={handleModalOpenTres}
                    className="RegistrarButton"
                  >
                    Rotulo
                  </button>
                  <button
                    onClick={handleModalOpenCuatro}
                    className="RegistrarButton"
                  >
                    Otro
                  </button>
                  <div className="RegistrarButton">
                    <button onClick={toggleColorVisibility}>
                      {showColors ? "Ocultar colores" : "Mostrar colores"}
                    </button>
                    <div
                      className={`colorPalette ${
                        showColors ? "visible" : "hidden"
                      }`}
                    >
                      {colors.map((color) => (
                        <div
                          key={color}
                          className="colorBox"
                          style={{ backgroundColor: color }}
                          onClick={() => changeBackgroundColor(color)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*--------------------------------------------------Tabla*/}
                {/*--------------------------------------------------Board*/}
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cantidad</th>
                      <th>Tipo</th>
                      <th>Ingresó</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData
                      .filter(
                        (user) =>
                          user.Codigo.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          ) ||
                          user.Cantidad.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          ) ||
                          user.Tipo.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          )
                      )
                      .map((user, index) => {
                        const userDataIndex =
                          index < productData.length ? index : null;
                        const dataTerceraTablaIndex =
                          index < fechaData.length ? index : null;

                        return (
                          <tr key={user.Codigo}>
                            <td className="code">
                              {userDataIndex !== null
                                ? productData[userDataIndex].Codigo
                                : ""}
                            </td>
                            <td>
                              {userDataIndex !== null
                                ? productData[userDataIndex].Cantidad
                                : ""}
                            </td>
                            <td>
                              {userDataIndex !== null
                                ? productData[userDataIndex].Tipo
                                : ""}
                            </td>
                            <td>
                              {dataTerceraTablaIndex !== null
                                ? `${fechaData[dataTerceraTablaIndex].Dia}/
                                  ${fechaData[dataTerceraTablaIndex].Mes}/
                                  ${fechaData[dataTerceraTablaIndex].Anno}`
                                : " "}
                            </td>
                            <td>
                              <IoInformationCircleSharp
                                onClick={() => {
                                  handleModalOpen();
                                  setCodigo(user.Codigo);
                                  setTipo(user.Tipo);
                                }}
                                className="iconsInfo"
                                title="Más Información."
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="linea"></div>
            </section>
            {/*--------------------------------------------------Responsive para telefono*/}
            {/*----------------------------------------------------Responsive for phone*/}
            <section>
              <div className="containerButton">
                <div className="sidebar_linkTres" onClick={handleModalOpenTres}>
                  <h1>Agregar</h1>
                </div>
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
                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">
                  Gráficas
                </Link>
                <Link className="sidebar_linkTres" href="/Gerentes/Gráficas">
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

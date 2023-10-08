import {
  FaInfo,
  FaTrash,
  FaPenSquare,
  FaEdit,
  FaRegTimesCircle,
  FaDumpsterFire,
} from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import Link from "next/link";
import router from "next/router";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import React, { useState, useEffect } from "react";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseConfig from "@/firebase/config";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/compat/firestore";
import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function Empleados() {
  //Modals
  const [isModalOpen, setIsEditarOpen] = useState(false);
  const [isModalOpenDos, setIsModalOpenDos] = useState(false);
  const [isModalOpenTres, setIsModalOpenTres] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //Variables
  const [Email, setEmail] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [Nombre, setNombre] = useState("");
  const [ApellidoUno, setApellidoUno] = useState("");
  const [ApellidoDos, setApellidoDos] = useState("");
  const [TipoCedula, setTipoCedula] = useState("");
  const [Cedula, setCedula] = useState("");
  const [Tipo, setTipo] = useState("");
  const [TipoUsuario, setTipoUsuario] = useState("");
  const [Estado, setEstado] = useState("");

  const [Ano, setAno] = useState("");
  const [Mes, setMes] = useState("");
  const [Dia, setDia] = useState("");

  const [borrarConfirmado, setBorrarConfirmado] = useState(false);
  //Leer tablas
  const [userData, setUserData] = useState<any[]>([]);
  const [dataCaja, setDataCaja] = useState<any[]>([]);
  //Inicializa firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //Modals editar
  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);

  const EditarOpen = () => {
    setIsEditarOpen(true);
  };

  const handleModalClose = () => {
    setIsEditarOpen(false);
  };
  //Modals Informacion
  useEffect(() => {
    if (isModalOpenDos) {
    }
  }, [isModalOpenDos]);

  const handleModalOpenDos = () => {
    setIsModalOpenDos(true);
  };

  const handleModalCloseDos = () => {
    setIsModalOpenDos(false);
  };
  //Modals Eliminar

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    handleDeleteUser(Cedula);
    setShowDeleteModal(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  //Eliminar de la fireBase.
  const handleDeleteUser = async (Cedula: string) => {
    try {
      const employeesQuery = await getDocs(
        query(collection(db, "Usuarios"), where("Cedula", "==", Cedula))
      );

      if (!employeesQuery.empty) {
        // Si se encuentra un empleado con la misma cédula, eliminamos el documento del empleado
        const employeeDoc = employeesQuery.docs[0];
        const userId = employeeDoc.data().Cedula;

        // Eliminamos el documento del empleado
        const employeeRef = doc(db, "Usuarios", employeeDoc.id);
        await deleteDoc(employeeRef);

        // Buscamos el documento del usuario relacionado al empleado
        const usersQuery = await getDocs(
          query(collection(db, "Usuarios"), where("Cedula", "==", userId))
        );
      } else {
        console.log(
          "No se encontró ningún empleado con la cédula especificada."
        );
      }
    } catch (error) {
      console.log("No se elimino.");
    }
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleModalClose;
  };
  //Cambiar color

  const [backgroundColor, setBackgroundColor] = useState<string>("#6DA5C0");
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
  //Consume tabla de Empleados/Usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querydb = await getDocs(collection(db, "Usuarios"));
        const data: React.SetStateAction<any[]> = [];
        querydb.forEach((doc) => {
          data.push(doc.data());
        });
        setUserData(data);
      } catch (error) {
        console.error("No se pudieron extraer los datos: " + error);
      }
    };

    fetchData();
  }, []);

  //Fecha nacimiento
  const handleFechaNacimientoChange = (event: { target: { value: any } }) => {
    const fecha = event.target.value;
    const partesFecha = fecha.split(" ");

    if (partesFecha.length === 3) {
      setAno(partesFecha[0]);
      setMes(partesFecha[1]);
      setDia(partesFecha[2]);
    }
  };

  //Modal agregar
  const [isModalOpenOtro, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalCloseOtro = () => {
    setIsModalOpen(false);
    setCedula("");
    setNombre("");
    setTipoCedula("");
    setApellidoDos("");
    setApellidoUno("");
    setTipoUsuario("");
    setTipo("");
    setEmail("");
    setContrasena("");
  };
  //Agrega Usuarios/Empleados/Identificacion/FechaNacimiento
  const handleFormSubmitUsers = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Usuarios");
      const queryDB = await getDocs(
        query(
          usersRef,
          where("Email", "==", Email),
          where("Contrasena", "==", Contrasena)
        )
      );
      if (!queryDB.empty) {
        setIsModalOpen(true);
        return;
      }
      const UsersData = {
        Email,
        Contrasena,
        TipoUsuario,
        Cedula,
        Nombre,
        Estado,
        ApellidoUno,
        ApellidoDos,
        Ano,
        Mes,
        Dia,
        TipoCedula,
      };

      await createUserWithEmailAndPassword(auth, Email, Contrasena);
      await addDoc(collection(db, "Usuarios"), UsersData);
      handleModalCloseOtro();
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };
  //Editar tabla Usuarios
  const [formData, setFormData] = useState({
    Email: "",
    Contrasena: "",
    TipoCedula: "",
    Cedula: "",
    Nombre: "",
    Estado: "",
    ApellidoUno: "",
    ApellidoDos: "",
    Ano: "",
    Mes: "",
    Dia: "",
    TipoUsuario: "",
  });
  const handleModalCloseEdit = () => {
    setShowModalEdit(false);
    setCedula("");
    setNombre("");
    setTipoCedula("");
    setApellidoDos("");
    setApellidoUno("");
    setTipoUsuario("");
    setTipo("");
    setEmail("");
    setContrasena("");
  };
  interface User {
    Email?: string;
    Contrasena?: string;
    TipoCedula?: string;
    Cedula?: string;
    Nombre?: string;
    Estado?: string;
    ApellidoUno?: string;
    ApellidoDos?: string;
    Ano?: string;
    Mes?: string;
    Dia?: string;
    TipoUsuario?: string;
  }

  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleEditClick = (user: User) => {
    setFormData({
      Email: user.Email ?? "",
      Contrasena: user.Contrasena ?? "",
      TipoCedula: user.TipoCedula ?? "",
      Cedula: user.Cedula ?? "",
      Nombre: user.Nombre ?? "",
      Estado: user.Estado ?? "",
      ApellidoUno: user.ApellidoUno ?? "",
      ApellidoDos: user.ApellidoDos ?? "",
      Ano: user.Ano ?? "",
      Mes: user.Mes ?? "",
      Dia: user.Dia ?? "",
      TipoUsuario: user.TipoUsuario ?? "",
    });
    setShowModalEdit(true);
  };
  const handleEdit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const employeesQuery = await getDocs(
        query(
          collection(db, "Usuarios"),
          where("Cedula", "==", formData.Cedula)
        )
      );

      if (!employeesQuery.empty) {
        console.log("Cedula hallada");
        const usersQuery = await getDocs(
          query(
            collection(db, "Usuarios"),
            where("Cedula", "==", formData.Cedula)
          )
        );

        if (!usersQuery.empty) {
          const userDoc = usersQuery.docs[0];
          const userId = userDoc.id;

          // Creamos un objeto con los campos actualizados para el usuario
          const updatedUserData = {
            Email: formData.Email,
            Contrasena: formData.Contrasena,
            TipoCedula: formData.TipoCedula,
            Cedula: formData.Cedula,
            Nombre: formData.Nombre,
            Estado: formData.Estado,
            ApellidoUno: formData.ApellidoUno,
            ApellidoDos: formData.ApellidoDos,
            Ano: formData.Ano,
            Mes: formData.Mes,
            Dia: formData.Dia,
            TipoUsuario: formData.TipoUsuario,
          };

          // Actualizamos el documento de usuario
          await updateDoc(doc(db, "Usuarios", userId), updatedUserData);

          //Actualizará la información si se cambió el correo
          if (formData.Email && formData.Email !== formData.Email) {
            const user = auth.currentUser;
            if (user) {
              // Aquí reautenciamos al usuario antes de cambiar el correo
              const credential = EmailAuthProvider.credential(
                user.email!,
                formData.Contrasena // No sea nulo
              );

              try {
                await reauthenticateWithCredential(user, credential);
                await updateEmail(user, formData.Email);
              } catch (error) {
                console.error(
                  "Error al reautenticar o actualizar el correo electrónico:",
                  error
                );
              }
            }
          }
        }
       
      }
    } catch (error) {
      console.error("Error al editar empleado y usuario:", error);
    }
    setShowModalEdit(false);
  };

  return (
    <>
      <div className="bodySidebar">
        <div className="containerSidebar">
          <div>
            <IndexGerenteInicioDos />
          </div>

          <div className="bodyEmpleados">
            <section>
              <h1 className="tituloEmpleados">Empleados</h1>

              <div className="linea"></div>
              <div className="contenedorTabla">
                {/*Buscador y contenedor*/}
                <div className="buscadorContainer">
                  <input
                    type="text"
                    className="BuscadorInput"
                    placeholder="Buscar..."
                  />
                  {/*Boton de registrar*/}
                  <button className="RegistrarButton" onClick={handleModalOpen}>
                    Registrar
                  </button>
                  {/*Pide un color*/}
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
                <table className="TablaEmpleados">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Primer Apellido</th>
                      <th>Segundo Apellido</th>

                      <th>Estado</th>
                      <th>Tipo</th>
                      <th>Correo</th>
                      <th>Contraseña</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <tr key={user.Cedula}>
                        <td>{user.Nombre ?? "-"}</td>
                        <td>{user.ApellidoUno ?? "-"}</td>
                        <td>{user.ApellidoDos ?? "-"}</td>
                        <td>{user.TipoUsuario ?? "-"}</td>
                        <td>{user.Email ?? "-"}</td>
                        <td>{user.Estado ?? "-"}</td>
                        <td>
                          {user.Contrasena?.length
                            ? "*".repeat(user.Contrasena.length)
                            : "*"}
                        </td>
                        <td>
                          <FaEdit
                            className="iconsEdit"
                            title="Editar."
                            onClick={() => handleEditClick(user)}
                          />
                          <IoInformationCircleSharp
                            className="iconsInfo"
                            title="Más Información."
                          />
                          <FaTrash
                            className="iconsEliminar"
                            title="Eliminar."
                            onClick={() => {
                              handleDeleteModal();
                              setCedula(user.Cedula);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              {isModalOpenDos && (
                <div className="modal ">
                  <div
                    className="modal-content"
                    style={{
                      background: "#f7f7f7",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <button
                      className="icon-close"
                      onClick={handleModalCloseDos}
                      style={{
                        background: "none",
                        borderRadius: "10px",
                        border: "1px solid",
                        color: "#555",
                        fontSize: "18px",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      SALIR
                    </button>
                  </div>
                </div>
              )}
            </section>
            <div className="linea"></div>
            <section>
              <div className="containerButton">
                <Link className="sidebar_linkDos" href="/">
                  Salir
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Productos">
                  Productos
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Movimientos">
                  Movimientos
                </Link>
                <Link
                  className="sidebar_linkDos"
                  href="/Gerentes/Mantenimiento"
                >
                  Mantenimiento
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Ubicacion">
                  Ubicación
                </Link>
                <Link className="sidebar_linkDos" href="/Gerentes/Graficas">
                  Gráficas
                </Link>
              </div>
            </section>
          </div>
        </div>
        {isModalOpenOtro && (
          <div className="modal">
            <div className="modal-content">
              <FaRegTimesCircle
                className="iconsClose"
                onClick={handleModalCloseOtro}
              />

              <form onSubmit={handleFormSubmitUsers}>
                <div>
                  <h3 className="textDos">
                    Email
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </h3>
                  <h3 className="textDos">
                    Contraseña
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Contraseña"
                      value={Contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                  </h3>
                  <h3 className="textDos">
                    Nombre
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Nombre"
                      value={Nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </h3>
                  <h3 className="textDos">
                    Estado
                    <select
                      value={Estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="inputRes"
                      id="Estado"
                      name="Estado"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </h3>
                  <h3 className="textDos">
                    Primer Apellido
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Primer Apellido"
                      value={ApellidoUno}
                      onChange={(e) => setApellidoUno(e.target.value)}
                      required
                    />
                  </h3>
                  <h3 className="textDos">
                    Segundo Apellido
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Segundo Apellido"
                      value={ApellidoDos}
                      onChange={(e) => setApellidoDos(e.target.value)}
                      required
                    />
                  </h3>
                  <h3 className="textDos">
                    Fecha Nacimiento
                    <input
                      type="date"
                      className="textTres"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      onChange={handleFechaNacimientoChange}
                      required
                    ></input>
                  </h3>
                  <h3 className="textDos">
                    Tipo de cédula
                    <select
                      className="inputRes"
                      id="Tipo"
                      name="Tipo"
                      value={TipoCedula}
                      onChange={(e) => setTipoCedula(e.target.value)}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Cédula nacional"> Cédula nacional</option>
                      <option value="Cédula de Indígena">
                        Cédula de Indígena
                      </option>
                      <option value="Cédula de Residencia">
                        Cédula de Residencia
                      </option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="Carné de estudiante">
                        Carné de estudiante
                      </option>
                    </select>
                  </h3>
                  <h3 className="textDos">
                    Cédula
                    <input
                      type="text"
                      className="inputRes"
                      placeholder="Cédula"
                      value={Cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </h3>
                  <h3 className="textDos">
                    Rol Del Usuario
                    <select
                      value={TipoUsuario}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                      className="inputRes"
                      id="rol"
                      name="rol"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Gerente">Gerente</option>
                    </select>
                  </h3>
                  <button className="botonRes" type="submit">
                    Agregar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showModalEdit && (
          <div className="modal">
            <div className="modal-content">
              <FaRegTimesCircle
                className="iconsClose"
                onClick={handleModalCloseEdit}
              />
              <form onSubmit={handleEdit}>
                <h3 className="textDos">Cédula:</h3>
                <input
                  type="number"
                  className="inputRes"
                  value={formData.Cedula}
                  onChange={(e) =>
                    setFormData({ ...formData, Cedula: e.target.value })
                  }
                  required
                />
                <h3 className="textDos">Tipo De Cédula:</h3>
                <select
                  className="inputRes"
                  value={formData.TipoCedula}
                  onChange={(e) =>
                    setFormData({ ...formData, TipoCedula: e.target.value })
                  }
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Cédula nacional"> Cédula nacional</option>
                  <option value="Cédula de Indígena">Cédula de Indígena</option>
                  <option value="Cédula de Residencia">
                    Cédula de Residencia
                  </option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Carné de estudiante">
                    Carné de estudiante
                  </option>
                </select>

                <h3 className="textDos">Nombre:</h3>
                <input
                  type="text"
                  className="inputRes"
                  value={formData.Nombre}
                  placeholder="Nombre"
                  onChange={(e) =>
                    setFormData({ ...formData, Nombre: e.target.value })
                  }
                  required
                />
                <h3 className="textDos">Primer Apellido:</h3>
                <input
                  type="text"
                  value={formData.ApellidoUno}
                  className="inputRes"
                  placeholder="Apellido"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ApellidoUno: e.target.value,
                    })
                  }
                  required
                />
                <h3 className="textDos">Segundo Apellido:</h3>
                <input
                  type="text"
                  className="inputRes"
                  value={formData.ApellidoDos}
                  placeholder="Apellido"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ApellidoDos: e.target.value,
                    })
                  }
                  required
                />
                <h3 className="textDos">
                  Fecha Nacimiento
                  <input
                    type="date"
                    className="textTres"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    onChange={handleFechaNacimientoChange}
                    required
                  ></input>
                </h3>
                <h3 className="textDos">Estado:</h3>
                <select
                  className="inputRes"
                  value={formData.Estado}
                  onChange={(e) =>
                    setFormData({ ...formData, Estado: e.target.value })
                  }
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>

                <h3 className="textDos">Correo:</h3>
                <input
                  type="text"
                  className="inputRes"
                  value={formData.Email}
                  onChange={(e) =>
                    setFormData({ ...formData, Email: e.target.value })
                  }
                  required
                />
                <h3 className="textDos">Contraseña:</h3>
                <input
                  type="password"
                  className="inputRes"
                  value={formData.Contrasena}
                  onChange={(e) =>
                    setFormData({ ...formData, Contrasena: e.target.value })
                  }
                  required
                />
                <h3 className="textDos">Tipo De Usuario:</h3>
                <select
                  className="inputRes"
                  value={formData.TipoUsuario}
                  onChange={(e) =>
                    setFormData({ ...formData, TipoUsuario: e.target.value })
                  }
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Gerente">Gerente</option>
                </select>
                <button className="botonRes" type="submit">
                  Editar Usuario
                </button>
              </form>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <p className="textDos">
                <FaDumpsterFire className="iconsClose" />
                ¿Estás seguro de qué quieres eliminar este usuario?
              </p>
              <button className="botonRes" onClick={handleConfirmDelete}>
                Sí
              </button>
              <button className="botonRes" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

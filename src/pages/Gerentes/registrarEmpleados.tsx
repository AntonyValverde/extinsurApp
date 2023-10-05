"use client";

import { FaReplyAll } from "react-icons/fa";

import { useEffect, useState } from "react";
import Link from "next/link";
import IndexGerenteInicioDos from "../IndexGerenteInicioDos";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/config";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  updateCurrentUser,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { db, auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

export default function RegistrarEmpleados() {
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

  const [Ano, setAno] = useState("");
  const [Mes, setMes] = useState("");
  const [Dia, setDia] = useState("");

  //Agregar Usuario
  const handleFormSubmitExtintor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const usersRef = collection(db, "Usuarios");
      const queryDB = await getDocs(
        query(usersRef, where("Email", "==", Email))
      );
      if (!queryDB.empty) {
        return;
      }
      const UsersData = {
        Email,
        Contrasena,
        Tipo,
      };

      const empleadosData = {
        Nombre,
        ApellidoUno,
        ApellidoDos,
        TipoUsuario,
      };
      const fechaData = {
        Ano,
        Mes,
        Dia,
      };

      await addDoc(collection(db, "Productos"), UsersData);
      await addDoc(collection(db, "Extintores"), empleadosData);
      await addDoc(collection(db, "FechaEntrada"), fechaData);
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  //
  const handleFechaNacimientoChange = (event: { target: { value: any } }) => {
    const fecha = event.target.value;
    const partesFecha = fecha.split(" ");

    // Asignar a las variables correspondientes
    if (partesFecha.length === 3) {
      setAno(partesFecha[0]);
      setMes(partesFecha[1]);
      setDia(partesFecha[2]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="contenedorRegistro">
            <div className="formReg">
              <h2 className="textUno">Paso 1: Email y contraseña</h2>
              <form action="">
                <div className="contenedorInput">
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
                      type="password"
                      className="inputRes"
                      value={Contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                  </h3>
                </div>
                <a className="botonRes" href="./Empleados">
                  Atrás
                </a>
                <button className="botonRes" onClick={nextStep}>
                  Siguiente
                </button>
              </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="contenedorRegistro">
            <div className="formReg">
              <h2 className="textUno">Paso 2: Nombres y Apellidos</h2>
              <div className="contenedorInput">
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
              </div>
              <button className="botonRes" onClick={prevStep}>
                Anterior
              </button>
              <button className="botonRes" onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="contenedorRegistro">
            <div className="formReg">
              <h2 className="textUno">Paso 3: Cédula y Rol</h2>
              <div className="contenedorInput">
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
              </div>
              <button className="botonRes" onClick={prevStep}>
                Anterior
              </button>
              <a className="botonRes" href="./Empleados">
                Finalizar
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="FondoModal">
        <div>{renderStep()}</div>
      </div>
    </>
  );
}

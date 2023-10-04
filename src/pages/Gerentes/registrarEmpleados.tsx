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
  const [Sexo, setSexo] = useState("");
  const [Estado, setEstado] = useState("");

  //Obtiene las variables de fecha
  function obtenerFechaActual(): Date {
    return new Date();
  }

  const fechaActual: Date = obtenerFechaActual();

  const Ano: number = fechaActual.getFullYear();
  const Mes: number = fechaActual.getMonth() + 1; // El mes es zero-indexed, por eso sumamos 1
  const Dia: number = fechaActual.getDate();

  console.log("Fecha actual:", fechaActual);
  console.log(`Año: ${Ano}, Mes: ${Mes}, Día: ${Dia}`);

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
        Sexo,
        ApellidoUno,
        ApellidoDos,
        Estado,
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="contenedorRegistro">
            <div className="formReg">
              <h2 className="textUno">Paso 1: Email y contraseña</h2>
              <div className="contenedorInput">
                <h3 className="textDos">
                  Email
                  <input type="text" className="inputRes" placeholder=""/>
                </h3>
                <h3 className="textDos">
                  Contraseña
                  <input type="password" className="inputRes" />
                </h3>
              </div>
              <a className="botonRes" href="./Empleados">
                Atrás
              </a>
              <button className="botonRes" onClick={nextStep}>
                Siguiente
              </button>
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
                  <input type="text" className="inputRes" placeholder=""/>
                </h3>
                <h3 className="textDos">
                  Primer Apellido
                  <input type="text" className="inputRes" />
                </h3>
                <h3 className="textDos">
                  Segundo Apellido
                  <input type="text" className="inputRes" />
                </h3>
                <h3 className="textDos">
                  Fecha Nacimiento
                  <input
                    type="date"
                    className="textTres"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
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
                  <input type="text" className="inputRes" />
                </h3>
                <h3 className="textDos">
                  Cédula
                  <input type="text" className="inputRes" />
                </h3>
                <h3 className="textDos">
                  Rol
                  <select className="rol" id="rol" name="rol">
                    <option value="gerente">Gerente</option>
                    <option value="empleado">Empleado</option>
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

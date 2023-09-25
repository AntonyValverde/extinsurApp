"use client";
import React, { useState } from "react";
import { FaReplyAll } from "react-icons/fa";

export default function RegistrarEmpleados() {
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
                  <input type="text" className="inputRes" />
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
                  <input type="text" className="inputRes" />
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

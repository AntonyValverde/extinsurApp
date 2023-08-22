import React, { useState } from 'react';
import { FaReplyAll } from 'react-icons/fa'


export default function registrarEmpleado() {



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
                    <div className='contenedorRegistro'>
                        <h2 className='textUno'>Paso 1: Email y contraseña</h2>
                        <div className='contenedorInput'>
                            <h3 className='textDos'>Email<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Contraseña<input type="password" className='inputRes' /></h3>
                            
                        </div>

                        <button className='botonRes' onClick={nextStep}>Siguiente</button>
                    </div>
                );
            case 2:
                return (
                    <div className='contenedorRegistro'>
                        <h2 className='textUno'>Paso 2: Nombres y Apellidos</h2>
                        <div className='contenedorInput'>
                            <h3 className='textDos'>Nombre<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Primer Apellido<input type="text" className='inputRes' /></h3>
                            <h3 className='textDos'>Segundo Apellido<input type="text" className='inputRes' /></h3>
                        </div>
                        <button className='botonRes' onClick={prevStep}>Anterior</button>
                        <button className='botonRes' onClick={nextStep}>Siguiente</button>
                    </div>
                );
            case 3:
                return (
                    <div className='contenedorRegistro'>
                        <h2 className='textUno'>Paso 3: Fecha de Nacimiento</h2>
                        <div className='contenedorInput'>
                            <h3 className='textDos'>Día<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Mes<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Año<input type="text" className='inputRes'/></h3>
                            
                        </div>
                        <button className='botonRes' onClick={prevStep}>Anterior</button>
                        <button className='botonRes' onClick={nextStep}>Siguiente</button>
                    </div>
                );
            case 4:
                return (
                    <div className='contenedorRegistro'>
                        <h2 className='textUno'>Paso 4: Cédula y Rol</h2>
                        <div className='contenedorInput'>
                        <h3 className='textDos'>Día<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Tipo de cédula<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Cédula<input type="text" className='inputRes'/></h3>
                            <h3 className='textDos'>Rol<input type="text" className='inputRes'/></h3>
                        </div>
                        <button className='botonRes' onClick={prevStep}>Anterior</button>
                        <a className='botonRes' href="./Empleados">Siguiente</a>
                    </div>
                );

            default:

                return null;
        }
    };


    return (
        <>
            <div className="FondoModal">
                <div className='line'></div>
                <div className='line2'></div>
                <div className='line3'></div>
                <div>
                    <a href="./Empleados" className='buttonBorderAtrasRegister'><FaReplyAll className="iconsSalirRegistro"></FaReplyAll></a>

                    {renderStep()}


                </div>

            </div>
        </>
    )

};


import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Esto importa todos los matchers de jest-dom incluyendo toBeInTheDocument
import Empleados from '@/pages/Gerentes/Empleados'; // Importa tu componente

 
describe('Empleados', () => {
    const addDocMock = jest.fn();
    const collectionMock = jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
            add: addDocMock,
        }),
    });

    const dbMock = {
        collection: jest.fn(() => collectionMock),
    };

    jest.mock("@/firebase/firebase", () => ({
        __esModule: true,
        ...jest.requireActual("@/firebase/firebase"),
        db: dbMock,
    }));

    it('debería renderizar correctamente', () => {
        const UserData = [
            {
                Email: "1234",
                Contrasena: "12345678",
                TipoEmpleado: "Gerente",
                Cedula: "12345678",
                Nombre: "Hola",
                Estado: "Activo",
                ApellidoUno: "Valverde",
                ApellidoDos: "Rojas",
                Ano: "2020",
                Mes: "20",
                Dia: "02",
                TipoCedula: "Nacional",
            },
        ];


        // Renderizamos el componente con los datos de prueba
        const { container } = render(<Empleados UserData={UserData} />);
        // Encuentra y simula el formulario de agregar una venta
        const Email = container.querySelector('input[id="email"]');
        const Contrasena = container.querySelector('input[id="contra"]');
        const Nombre = container.querySelector(
            'input[id="nombre"]'
        );
        const ApellidoUno = container.querySelector(
            'input[id="apeUno"]'
        );
        const ApellidoDos = container.querySelector('input[id="apeDos"]');
        const Fecha = container.querySelector('input[id="fechaNacimiento"]');
        const TipoCedula = container.querySelector('input[id="cedula"]');
        const Tipo = container.querySelector(
            'input[id="Tipo"]'
        );
        const rol = container.querySelector(
            'input[id="rol"]'
        );
        const submitButton = container.querySelector('button[type="submit"]');
        // Válidamos si los elementos se encontraron antes de continuar
        if (
            Email &&
            Contrasena &&
            Tipo &&
            TipoCedula &&
            Nombre &&
            rol &&
            ApellidoUno &&
            ApellidoDos &&
            Fecha &&
            submitButton
        ) {
            fireEvent.change(Email, { target: { value: "123" } });
            fireEvent.change(Contrasena, { target: { value: "Nombre" } });
            fireEvent.change(Nombre, { target: { value: "Apellido" } });
            fireEvent.change(ApellidoUno, { target: { value: "Apellido" } });
            fireEvent.change(ApellidoDos, { target: { value: "2024-04-04" } });
            fireEvent.change(Fecha, { target: { value: "100" } });
            fireEvent.change(Tipo, { target: { value: "1" } });
            fireEvent.change(TipoCedula, { target: { value: "1" } });
            fireEvent.change(rol , { target: { value: "1" } });
            fireEvent.submit(submitButton);

            // Agregamos las validaciones de los llamados a las funciones de firebase
            expect(dbMock.collection).toHaveBeenCalledWith("Usuario");
            expect(addDocMock).toHaveBeenCalledWith({
                Email: "1234",
                Contrasena: "12345678",
                TipoEmpleado: "Gerente",
                Cedula: "12345678",
                Nombre: "Hola",
                Estado: "Activo",
                ApellidoUno: "Valverde",
                ApellidoDos: "Rojas",
                Ano: "2020",
                Mes: "20",
                Dia: "02",
                TipoCedula: "Nacional",
            });
        }
    });
});

     

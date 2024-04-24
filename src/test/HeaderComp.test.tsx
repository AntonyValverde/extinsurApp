import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Esto importa todos los matchers de jest-dom incluyendo toBeInTheDocument
import Header_index from '@/components/compIndex/HeaderComp'; // Importa tu componente

jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    }),
}));

describe('Header_index', () => {
    it('debería renderizar correctamente', () => {
        const { getByTestId } = render(<Header_index />);
        // Verificar que el componente se renderice correctamente
        const header = getByTestId('header');
        // Verificar que el enlace de inicio de sesión esté presente
        const loginlink = getByTestId('login-link');
        const h1Nombre = getByTestId('h1-nombreEmpresa');
        const navegation = getByTestId('nav-navegation');
        const span = getByTestId('span-textInicio');
        
        expect(loginlink).toBeInTheDocument();
        expect(h1Nombre).toBeInTheDocument();
        expect(navegation).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(span).toBeInTheDocument();
         
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Esto importa todos los matchers de jest-dom incluyendo toBeInTheDocument
import Home from '@/pages/index'; // Importa tu componente

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

describe('Home', () => {
    it('debería renderizar correctamente', () => {
        const { getByTestId } = render(<Home />);
        // Verificar que el componente se renderice correctamente
        const headerElement = getByTestId('div');
        // Verificar que el enlace de inicio de sesión esté presente
        const loginLinkElement = getByTestId('navCompIndex');
        const loginLinkEleme = getByTestId('article');
        const loginLinkElem = getByTestId('footer');
        const loginLinkEle = getByTestId('header-index');
        
        expect(loginLinkEle).toBeInTheDocument();
        expect(loginLinkElement).toBeInTheDocument();
        expect(loginLinkEleme).toBeInTheDocument();
        expect(loginLinkElem).toBeInTheDocument();
        expect(headerElement).toBeInTheDocument();
         
    });
});

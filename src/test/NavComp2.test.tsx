import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa todos los matchers de jest-dom incluyendo toBeInTheDocument
import Nav_index from '@/components/compIndex/NavComp'; // Importa tu componente

// Mock para useRouter de Next.js
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

describe('Nav_index', () => {
    it('should render Nav_index component correctly', () => {

        // Mock de las funciones de clic
        const handleMantenimientoClick = jest.fn();
        const handleRecargaClick = jest.fn();
        const handleRevisionClick = jest.fn();
        const handleModalOpen = jest.fn();
        const handleModalClose = jest.fn();
        // Mock de la función de abrir modal
        const handleModalOpenDos = jest.fn();

        // Renderizar el componente con las funciones mock y los datos necesarios
        const { getByTestId } = render(
            <Nav_index
                UbicacionDatas={[]}
                handleRecargaClick={() => { }}
                handleRevisionClick={() => { }}
                handleModalClick={function (): void { }}
                handleModalCloseClick={function (): void { }}
                handleModalCloseDoss={function (): void { }}
            />
        );

        const divInfoElement = getByTestId('div-principal');
        expect(divInfoElement).toBeInTheDocument();

        // Verificar elementos importantes en tu componente Nav_index
        const navInfoElement = getByTestId('nav-info');
        expect(navInfoElement).toBeInTheDocument();

        const h1InfoElement = getByTestId('h1-titulo-inicio');
        expect(h1InfoElement).toBeInTheDocument();

        const spanInfoElement = getByTestId('span-titulo-inicio');
        expect(spanInfoElement).toBeInTheDocument();

        const iconInfoElement = getByTestId('icons-fire');
        expect(iconInfoElement).toBeInTheDocument();

        const divArtiInfoElement = getByTestId('div-articulos');
        expect(divArtiInfoElement).toBeInTheDocument();

        const arInfoElement = getByTestId('article-info1');
        expect(arInfoElement).toBeInTheDocument();

        const ar2InfoElement = getByTestId('article-info2');
        expect(ar2InfoElement).toBeInTheDocument();

        const ar3InfoElement = getByTestId('article-info3');
        expect(ar3InfoElement).toBeInTheDocument();


        //Maps
        // Verifica que el elemento a tenga la clase linkMaps
        const linkElement = getByTestId('link-maps');
        expect(linkElement).toHaveClass('linkMaps');

        // Verifica el valor del href del elemento a
        expect(linkElement.getAttribute('href')).toMatch(/^https:\/\/maps\.app\.goo\.gl\//);

        // Verifica el contenido del elemento a
        expect(linkElement.textContent).toBe(' Oficinas ExtinSur ');
        //Maps

        // Verifica que el elemento article tenga la clase articleInfo
        expect(getByTestId('article-info')).toHaveClass('articleInfo');

        // Verifica que el elemento h1 tenga la clase h1Info
        expect(getByTestId('h1-puestos-venta')).toHaveClass('h1Info');

        // Verifica que el elemento span dentro de h1 tenga la clase text
        expect(getByTestId('span-puestos-venta')).toHaveClass('text');
        // Verifica el contenido del span dentro de h1
        expect(getByTestId('span-puestos-venta')).toHaveTextContent('Puestos de venta');

        // Verifica que el elemento con la clase icons contenga un icono FaMapMarked
        expect(getByTestId('icons-map')).toBeInTheDocument();
        //.....

        const contServicios = getByTestId('ContenedorUbicacion');
        expect(contServicios).toBeInTheDocument();

        // Verifica que el elemento article dentro de ContenedorUbicacion tenga la clase articleInfoTres
        expect(getByTestId('article-info-tres')).toHaveClass('articleInfoTres');

        // Verifica que la tabla tenga la clase tablaUbication
        expect(getByTestId('table-ubicacion')).toHaveClass('tablaUbication');

        // Verificar elementos dentro del artículo de servicios
        const articleServicios = getByTestId('article-servicios');
        const spanServicios = getByTestId('span-servicios');
        const iconsServicios = getByTestId('icons-servicios');

        expect(articleServicios).toBeInTheDocument();
        expect(spanServicios).toBeInTheDocument();
        expect(iconsServicios).toBeInTheDocument();


        // Verificar botones dentro del artículo de servicios
        const buttonMantenimiento = getByTestId('button-mantenimiento');
        const buttonRecarga = getByTestId('button-recarga');
        const buttonRevision = getByTestId('button-revision');

        expect(buttonMantenimiento).toBeInTheDocument();
        expect(buttonRecarga).toBeInTheDocument();
        expect(buttonRevision).toBeInTheDocument();
        
        // Datos de ubicación para probar la tabla
        const UbicacionData = [
            { Descripcion: 'Ubicación 1', enlace: 'Enlace 1', HoraInicio: '09:00', HoraCierre: '18:00' },
            { Descripcion: 'Ubicación 2', enlace: 'Enlace 2', HoraInicio: '10:00', HoraCierre: '19:00' },
        ];
        // Verificar que los elementos de la tabla se rendericen correctamente
        const tableUbicacion = getByTestId('table-ubicacion');
        expect(tableUbicacion).toBeInTheDocument();

        // Verificar que los datos de ubicación se muestren correctamente en la tabla
        UbicacionData.forEach((ubicacion, index) => {
            const descripcion = getByTestId(`ubicacion-descripcion-${index}`);
            const enlace = getByTestId(`ubicacion-enlace-${index}`);
            const horario = getByTestId(`ubicacion-horario-${index}`);

            expect(descripcion).toBeInTheDocument();
            expect(descripcion.textContent).toBe(ubicacion.Descripcion);

            expect(enlace).toBeInTheDocument();
            expect(enlace.textContent).toBe(ubicacion.enlace);

            expect(horario).toBeInTheDocument();
            expect(horario.textContent).toBe(`${ubicacion.HoraInicio} / ${ubicacion.HoraCierre}`);
        });




        // Simular clic en el botón de abrir modal del carousel
        const openCarouselButton = getByTestId('button-open-carousel');
        fireEvent.click(openCarouselButton);
        expect(handleModalOpenDos).toHaveBeenCalledTimes(1);

        // Verificar que el modal del carousel se abra
        const modalCarouselContainer = getByTestId('modal-carousel-container');
        expect(modalCarouselContainer).toBeInTheDocument();

        // Verificar que las imágenes del carousel se muestren correctamente
        const carouselImages = modalCarouselContainer.querySelectorAll('.fotos');
        expect(carouselImages.length).toBe(3); // Ajustar según la cantidad de imágenes esperadas en el carousel
    });

});

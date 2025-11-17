import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from '@testing-library/react';
import {server} from '../mocks/server'
import { http, HttpResponse } from 'msw'
import userEvent from '@testing-library/user-event';
import App from "../App";


describe('Visualización inicial del menú', () => {
    it('HU1 - debería mostrar listado de productos cuando se ingresa al sistema', async () => {
        render(<App />)

        // Esperamos a que se carguen los productos desde la API mockeada
        await waitFor(() => {
            expect(screen.getByText('Café')).toBeInTheDocument();
        });

        // Verificamos que se muestran múltiples productos
        const productos = screen.getAllByRole('listitem');
        expect(productos.length).toBeGreaterThan(0);
    })

    it('H2 - Agregar ítem al pedido', async () => {
        render(<App />) 

        await waitFor(() => {
            expect(screen.getByText('Café')).toBeInTheDocument();
        });

        const button = screen.getByRole('button', {name: /agregar: café/i});
        await userEvent.click(button)

        const pedidoList = screen.getByRole('list', {name: /pedido/i})

        expect(within(pedidoList).getByText(/café/i)).toBeInTheDocument();

    })

    it('H3 - Calcular total del pedido', async () => {
        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('Café')).toBeInTheDocument();
        });

        const botonesAgregar = screen.getAllByRole('button', {name: /agregar/i})

        await userEvent.click(botonesAgregar[0])
        await userEvent.click(botonesAgregar[1])
        await userEvent.click(botonesAgregar[2])

        expect(screen.getByText(/total: \$\d+/i)).toBeInTheDocument()
    })

    it('H4 - Eliminar item del pedido', async () => {
        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('Café')).toBeInTheDocument();
        });

        const order = screen.getByRole ('button', {name: /agregar: café/i})
        await userEvent.click(order)
        const pedidoList = screen.getByRole('list', {name: /pedido/i});

        const botonesEliminar = screen.getAllByRole('button', {name: /eliminar/i})
        await userEvent.click(botonesEliminar[0])

        expect(within(pedidoList).queryByText(/café/i)).not.toBeInTheDocument();

    })

    it('H5 - Enviar pedido (MSW + Contexto)', async () => {
        render(<App />)

        await waitFor(() => {
            expect(screen.getByText('Café')).toBeInTheDocument();
        });

        const order = screen.getByRole('button', {name: /agregar: café/i})
        await userEvent.click(order)
        const pedidoList = screen.getByRole('list', {name: /pedido/i});

        expect(within(pedidoList).queryByText(/café/i)).toBeInTheDocument();

        const button = screen.getByRole('button', {name: /enviar pedido/i});
        await userEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('Pedido exitoso')).toBeInTheDocument();
        });

    })

    it('H6 - Caso límite: error del servidor', async () => {

        server.use(
            http.get('/api/menu', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText(/error al cargar/i)).toBeInTheDocument();
        })
    })

    it('HU6 - Mostrar mensaje cuando el menú está vacío', async () => {
        server.use(
            http.get('/api/menu', () => {
                return HttpResponse.json([])
            })
        )
    
        render(<App />)
    
        await waitFor(() => {
            expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
        })
    })
})
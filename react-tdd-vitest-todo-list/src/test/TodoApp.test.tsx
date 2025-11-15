import {render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {TodoApp} from '../TodoApp';

describe('TodoApp', () => {
    
    test('muestra mensaje cuando no hay tareas', () => {
        render(<TodoApp />);

        // Busca un elemento que contenga el texto "no hay tareas" (ignorando mayúsculas/minúsculas)
        // y verifica que esté presente en el documento.

        expect(screen.getByText(/no hay tareas/i)).toBeInTheDocument();
    })

    test('permite agregar una tarea', async () => {
        render(<TodoApp />);

        const input = screen.getByPlaceholderText(/nueva tarea/i);
        const button = screen.getByRole('button', {name: /agregar/i});

        await userEvent.type(input, 'Comprar Torta');
        await userEvent.click(button);

        expect(screen.getByText('Comprar Torta')).toBeInTheDocument();
    })

    test('permite marcar una tarea como completada', async () => {
        render(<TodoApp/>)
        const input = screen.getByPlaceholderText(/nueva tarea/i);
        const button = screen.getByRole('button', {name: /agregar/i});

        await userEvent.type(input, 'Estudiar React');
        await userEvent.click(button);

        const task = screen.getByText(/estudiar react/i);
        await userEvent.click(task)
        
        expect(task).toHaveStyle({textDecoration: 'line-through'});

        await userEvent.click(task);
        expect(task).not.toHaveStyle({textDecoration: 'line-through'});
    })

    test('permite elminar una tarea', async () => {
        render(<TodoApp />)
        
        const input = screen.getByPlaceholderText(/nueva tarea/i);
        const button = screen.getByRole('button', {name: /agregar/i});
        
        await userEvent.type(input, 'Tarea a borrar');
        await userEvent.click(button);
        
        expect(screen.getByText('Tarea a borrar')).toBeInTheDocument();
        
        const deleteBtn = screen.getByRole('button', {name: /borrar/i});

        await userEvent.click(deleteBtn);

        // Diferencia entre getByText y queryByText:
        // getByText: lanza error si no encuentra → usar cuando esperas que sí esté
        // queryByText: retorna null si no encuentra → usar cuando esperas que no esté
        expect(screen.queryByText('Tarea a borrar')).not.toBeInTheDocument();

    })

})
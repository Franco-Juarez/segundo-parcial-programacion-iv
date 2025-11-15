// src/test/TodoIntegration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Para simular interacciones de usuario
import { TodoProvider } from '../TodoContext';
import TodoApp from '../TodoApp';
import { server } from './mocks/server';
import { rest } from 'msw';

// userEvent es útil para simular interacciones más realistas
const user = userEvent.setup();

describe('TodoApp integración con API simulada y Contexto', () => {
  test('carga tareas desde la API y permite interactuar con ellas', async () => {
    // 1. Renderizamos el componente principal dentro de su contexto
    // Esto simula cómo se usaría en la aplicación real
    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    // 2. Esperamos que las tareas iniciales (mockeadas por MSW) aparezcan en la pantalla
    // `waitFor` es clave para esperar por operaciones asíncronas (como la llamada a la API)
    await waitFor(() => {
      expect(screen.getByText('Aprender React')).toBeInTheDocument();
      expect(screen.getByText('Configurar Vitest', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Integrar con MSW')).toBeInTheDocument();
    }, { timeout: 3000 }); // Opcional: aumentar el timeout si el delay de MSW es alto

    // Verificamos que 'Configurar Vitest' ya aparece como completada desde el mock
    const configuredTask = screen.getByText('Configurar Vitest', { exact: false });
    expect(configuredTask).toHaveStyle({ textDecoration: 'line-through' });
    expect(configuredTask).toHaveTextContent('(Completada)');

    // 3. Simulamos una interacción de usuario: hacemos click para completar una tarea
    const learnReactTask = screen.getByText('Aprender React');
    await user.click(learnReactTask); // Usamos userEvent para un click más realista

    // 4. Verificamos que la UI se actualiza correctamente tras la interacción
    // El contexto debe haber manejado el cambio de estado y el componente re-renderizado
    expect(learnReactTask).toHaveStyle({ textDecoration: 'line-through' });
    expect(learnReactTask).toHaveTextContent('(Completada)');

    // 5. Verificamos que al hacer click de nuevo, la tarea se descompleta
    await user.click(learnReactTask);
    expect(learnReactTask).not.toHaveStyle({ textDecoration: 'line-through' });
    expect(learnReactTask).not.toHaveTextContent('(Completada)');
  });

  test('muestra "No hay tareas" si la API devuelve una lista vacía', async () => {
    // Sobreescribir el manejador de MSW solo para este test
    // Esto demuestra cómo `server.resetHandlers()` es útil y cómo puedes adaptar mocks
    server.use(
      rest.get('http://localhost/api/tasks', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([])); // Devuelve un array vacío
      })
    );

    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    });

    // Asegurarse de que no aparecen tareas que no deberían
    expect(screen.queryByText('Aprender React')).not.toBeInTheDocument();
  });
});

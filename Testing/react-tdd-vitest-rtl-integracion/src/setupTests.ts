import '@testing-library/jest-dom';
import { server } from './test/mocks/server';

// **Ciclo de vida de MSW en Vitest:**

// 1. Antes de todas las pruebas (una vez por ejecución de test suite):
beforeAll(() => {
    server.listen(); // Inicia el servidor de MSW
    // Esto permite que MSW intercepte las peticiones HTTP desde el inicio.
    console.log('MSW server started');
  });
  
  // 2. Después de cada prueba individual:
  afterEach(() => {
    server.resetHandlers(); // Resetea los manejadores de MSW
    // Esto asegura que cada prueba es independiente; si una prueba cambia los manejadores,
    // se restauran a su estado original para la siguiente prueba.
  });
  
  // 3. Después de todas las pruebas (una vez por ejecución de test suite):
  afterAll(() => {
    server.close(); // Cierra el servidor de MSW
    // Libera los recursos de red utilizados por MSW.
    console.log('MSW server closed');
  });
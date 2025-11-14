// src/test/mocks/handlers.ts
import { rest } from 'msw';

// Definimos los manejadores de las peticiones que queremos interceptar
export const handlers = [
  // Intercepta peticiones GET a '/api/tasks'
  rest.get('http://localhost/api/tasks', (req, res, ctx) => {
    // req: contiene información sobre la petición entrante
    // res: función para construir la respuesta mockeada
    // ctx: utilidades para la respuesta (status, json, delay, etc.)
    return res(
      ctx.status(200), // Estado HTTP 200 (OK)
      ctx.json([ // Cuerpo de la respuesta en formato JSON
        { id: 1, text: 'Aprender React', done: false },
        { id: 2, text: 'Configurar Vitest', done: true }, // Una tarea completada
        { id: 3, text: 'Integrar con MSW', done: false },
      ]),
      ctx.delay(150) // Simula un pequeño retardo de red (opcional, para realismo)
    );
  }),
];

// Importamos los handlers que definen qué requests interceptar
import { handlers } from "./handler";
// setupServer es la función que crea un servidor mock para Node.js (usado en tests)
import { setupServer } from 'msw/node'

// Creamos y exportamos el servidor de MSW con todos nuestros handlers
// El spread operator (...handlers) pasa cada handler como argumento separado
export const server = setupServer(...handlers)
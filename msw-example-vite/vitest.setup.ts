// Hooks de Vitest para configurar el ciclo de vida de los tests
import { beforeAll, afterEach, afterAll } from 'vitest'
// Importamos el servidor mock de MSW
import { server } from "./src/mocks/server"

// beforeAll: se ejecuta UNA vez antes de todos los tests
// Inicia el servidor MSW para que comience a interceptar las HTTP requests
beforeAll(() => server.listen())

// afterEach: se ejecuta después de CADA test individual
// Resetea los handlers a su estado original para que cada test sea independiente
// (por si en algún test modificaste un handler específico)
afterEach(() => server.resetHandlers())

// afterAll: se ejecuta UNA vez después de todos los tests
// Cierra el servidor MSW y limpia los recursos
afterAll(() => server.close())
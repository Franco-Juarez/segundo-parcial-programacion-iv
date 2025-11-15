// Importamos las utilidades de Vitest para definir tests y assertions
import { test, expect } from 'vitest'

// Definimos un test que verifica que la API devuelve los datos correctos del usuario
test('responds with the user', async () => {
  // Hacemos un fetch a la API
  // MSW intercepta esta request (gracias al setup en vitest.setup.ts)
  // En vez de hacer la llamada real, devuelve la respuesta mockeada del handler
  const response = await fetch('http://localhost/api/users')

  // Verificamos que la respuesta JSON sea exactamente lo que esperamos
  // .resolves se usa porque response.json() es una Promise
  await expect(response.json()).resolves.toEqual({
    id: 'abc-123',
    firstName: 'John',
    lastName: 'Maverick',
  })
})

test('responder con producto', async () => {
    const response = await fetch('http://localhost/api/products')

    await expect(response.json()).resolves.toEqual({
        id: 'product-1',
        productName: 'Producto',
        price: 15000
    })
})
// Importamos las utilidades de MSW para definir los mocks de las HTTP requests
import {http, HttpResponse} from 'msw'

// Array de handlers: cada handler intercepta una request específica y devuelve una respuesta mockeada
export const handlers = [
    // Intercepta todas las llamadas GET a 'http://localhost/api/users'
    http.get('http://localhost/api/users', () => {
        // Devuelve una respuesta JSON mockeada con datos hardcodeados
        // En vez de hacer la request real, MSW devuelve estos datos
        return HttpResponse.json({
            id: 'abc-123',
            firstName: 'John',
            lastName: 'Maverick',
        })
    }),

    http.get('http://localhost/api/products', () => {
        return HttpResponse.json({
            id: 'product-1',
            productName: 'Producto',
            price: 15000
        })
    })
]

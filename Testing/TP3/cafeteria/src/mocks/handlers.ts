import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json([
      {
        id: '1',
        product: 'Café',
        price: 3000
      },
      {
        id: '2',
        product: 'Té',
        price: 2500
      },
      {
        id: '3',
        product: 'Medialunas',
        price: 1500
      },
    ])
  }),
  http.post('/api/orders', async({request}) => {
    const order = await request.json();
    if(!order) {
      return HttpResponse.json(
        {error: 'Pedido inválido'},
        {status: 400}
      )
    }
    
    return HttpResponse.json({
      success: true, 
      message: 'Pedido exitoso'
    }, {status: 201})
  }),
]
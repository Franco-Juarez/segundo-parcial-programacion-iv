// src/stest/TodoApp.test.tsx
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


type Product = {
    id: number
    title: string
    description: string
    urlImg: string
    price: number
  }

const products:Product[] = [
    {
      id: 1,
      title: "Producto A",
      description: "Descripción del producto",
      urlImg: "https://toledodigitalar.vtexassets.com/arquivos/ids/166133-800-auto?v=638796816097630000&width=800&height=auto&aspect=true",
      price: 12000
    }
  ]

describe('TodoApp', () => {
  test('muestra mensaje cuando no hay card', () => {
    // Renderiza el componente App en un entorno de prueba virtual
    render(<App />);
    // Busca un elemento que contenga el texto "no hay productos disponibles" (ignorando mayúsculas/minúsculas)
    // y verifica que esté presente en el documento.
    expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
  });

  test('muestra una tarjeta si hay disponibles y el contenido de la misma', () => {
    render(<App products={products}
    />)

    expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
  })

  test('Si hace click en el botón, se guarda el contenido del input', async () => {
    render(<App products={products} />)

    const input = screen.getByPlaceholderText(/Escribí tu mensaje/i)
    const button = screen.getByRole('button', {name: /Dejá tu mensaje/i})

    await userEvent.type(input, 'Me interesa!');
    await userEvent.click(button);

    expect(screen.getByText('Me interesa!')).toBeInTheDocument();
  })

});

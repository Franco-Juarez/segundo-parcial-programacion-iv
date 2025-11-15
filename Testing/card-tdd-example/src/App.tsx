import './App.css'
import { Card } from './components/card'

type Product = {
  id: number
  title: string
  description: string
  urlImg: string
  price: number
}


function App({ products = [] }: { products?: Product[] }) {

  return (
    <>
      <h1>Heladería</h1>
      {products.length <= 0 ? (
        <p>No hay productos disponibles</p>
      ) :
      products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            urlImg={product.urlImg}
            price={product.price}
          />
      ))}
    </>
  )
}

export default App

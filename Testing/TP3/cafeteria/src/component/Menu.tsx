import { useState, useEffect } from "react"

type MenuItem = {
    id: string
    product: string
    price: number
}

export const Menu = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [order, setOrder] = useState<MenuItem[]>([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('/api/menu')
                if (!response.ok) {
                    setError('Error al cargar menú')
                    throw new Error('Error al cargar el menú')
                }
                const data = await response.json()
                setMenuItems(data)
            } catch (e) {
                console.error('Error:', e)
                setError('Error al cargar menú')
            }
        }

        fetchMenu()
    }, [])

    const handleOrder = (id: string) => {
        const selectedItem = menuItems.find(item => item.id === id);
        if (selectedItem) {
            setOrder([...order, selectedItem]);
            setPrecioTotal(selectedItem.price + precioTotal)
        }
    }

    const handleDelete = (id: string) => {
        const itemToRemove = order.find(item => item.id === id);
        if (itemToRemove) {
            setOrder(order.filter(item => item.id !== id));
            setPrecioTotal(precioTotal - itemToRemove.price)
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: order,
                    total: precioTotal
                })
            })

            if (!response.ok) {
                throw new Error('Error al enviar el pedido')
            }

            const data = await response.json()
            setSuccessMessage(data.message)

            setOrder([])
            setPrecioTotal(0)
        } catch (e) {
            console.error('Error:', e)
            setSuccessMessage('Error al enviar el pedido')
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            {!error && (
                <ul>
                    {menuItems.length <= 0 ? (
                        <p>No hay productos disponibles</p>
                    ) : (
                        menuItems.map((item) => (
                            <li key={item.id}>
                                {item.product}
                                <span>{item.price}</span>
                                <button
                                onClick={() => handleOrder(item.id)}
                                >Agregar: {item.product}</button>
                            </li>
                        ))
                    )}
                </ul>
            )}
            <h2>Lista de órdenes</h2>
            <ul aria-label="pedido">
                {order.length <= 0 ? (
                    <p>No hay productos seleccionados</p>
                ): (
                    order.map((item) => (
                        <li key={item.id}>
                            <p>Pedido: {item.product}</p>
                            <button
                            onClick={() => handleDelete(item.id)}
                            >Eliminar</button>
                        </li>
                        
                    ))
                )}
            </ul>
            <p>{`Total: $${precioTotal}`}</p>
            <button onClick={handleSubmit}>Enviar pedido</button>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}
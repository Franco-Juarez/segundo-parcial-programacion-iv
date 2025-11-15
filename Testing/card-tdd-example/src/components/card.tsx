import { useState } from "react"

interface CardProps {
    title: string
    description: string
    urlImg: string
    price: number
}

export const Card: React.FC<CardProps> = ({title, description, urlImg, price}) => {

    const [text, setText] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleMessage = () => {
        setMessage(text);
        setText('');
    }

    return (
        <div className="product-card">
            <img
            src={urlImg}
            alt={title}
            className="product-card__image"
            />
            <div className="product-card__content">
                <h1 className="product-card__title">{title}</h1>
                <p className="product-card__description">{description}</p>
                <span className="product-card__price">{price}</span>
            </div>
            <textarea 
            placeholder="Escribí tu mensaje"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <button
            onClick={handleMessage}
            >
                Dejá tu mensaje
            </button>
            <p>
                {message}
            </p>
        </div>
    )
}

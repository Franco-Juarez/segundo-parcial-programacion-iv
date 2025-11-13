import { pointer } from "@testing-library/user-event/dist/cjs/pointer/index.js";
import { useState } from "react";

type Task = {
    text: string,
    done: boolean
};

export const TodoApp = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState('');

    const addTask = () => {
        if(text.trim() !== '') {
            setTasks([...tasks, {text, done: false}]);
            setText('');
        }
    }

    const toggleTask = (index: number) => {
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, done: !t.done } : t // Si es la tarea del índice, alternamos 'done'
        ));
    }

    return (
        <div>
            {tasks.length === 0 && <p>No hay tareas</p>}
             
            <input
            placeholder="Nueva Tarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <button onClick={addTask}>Agregar</button>
            <ul> {tasks.map((t, i) => 
            (
                <li 
                onClick={() => toggleTask(i)}
                style={{
                    textDecoration: t.done ? 'line-through' : 'none',
                    cursor: 'pointer',
                }}
                key={i}>
                    {t.text}
                </li>))
            }</ul>

        </div>
    )
}
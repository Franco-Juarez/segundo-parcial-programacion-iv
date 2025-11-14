// src/TodoApp.tsx
import { useEffect, useState } from 'react';
import { useTodos } from './TodoContext';

// Este componente mostrará la lista de tareas y manejará la carga inicial
export default function TodoApp() {
  const { tasks, addTask, toggleTask, deleteTask, loadInitialTasks } = useTodos();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Simulación de fetch inicial para obtener tareas
    fetch('http://localhost/api/tasks')
      .then(res => {
        if (!res.ok) { // Manejo básico de errores de red
          throw new Error('Error al cargar las tareas');
        }
        return res.json();
      })
      .then((data: { id: number; text: string; done: boolean }[]) => {
        // En lugar de addTask individualmente, cargamos todas las tareas de golpe
        loadInitialTasks(data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las tareas:", error);
        // Aquí podríamos establecer un estado de error en el contexto o en el componente
      });
  }, [loadInitialTasks]); // Dependencia del efecto: loadInitialTasks del contexto

  return (
    <div>
      <h1>Mis Tareas</h1>
      {tasks.length === 0 && <p>No hay tareas</p>}
      <ul>
        {tasks.map(t => (
          <li
            key={t.id}
            onClick={() => toggleTask(t.id)}
            style={{
              textDecoration: t.done ? 'line-through' : 'none',
              cursor: 'pointer', // Indicamos que es clickable
              marginBottom: '5px'
            }}
          >
            {t.text} {t.done ? '(Completada)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

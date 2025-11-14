import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Task = {
    id: number,
    text: string,
    done: boolean
}

type TodoContextType =  {
    tasks: Task[],
    addTask: (text: string) => void,
    toggleTask: (id: number) => void,
    deleteTask: (id: number) => void,
    loadInitialTasks: (initialTasks: Task[]) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({children}: { children: ReactNode}) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = useCallback((text: string) => {
        setTasks(prevTasks => [...prevTasks, { id: Date.now(), text, done: false }]);
    }, []);

    const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
        prevTasks.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
    }, []);

    const deleteTask = useCallback((id: number) => {
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    }, []);

    const loadInitialTasks = useCallback((initialTasks: Task[]) => {
        setTasks(initialTasks);
    }, []);

    const contextValue = { tasks, addTask, toggleTask, deleteTask, loadInitialTasks };

    return (
      <TodoContext.Provider value={contextValue}>
        {children}
      </TodoContext.Provider>
    );
}

export function useTodos() {
    const ctx = useContext(TodoContext);
    if (!ctx) {
      // Es un error común olvidar envolver el componente con el Provider
      throw new Error('useTodos debe usarse dentro de TodoProvider');
    }
    return ctx;
  }
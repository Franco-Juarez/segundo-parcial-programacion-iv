# Segundo Parcial - Programación IV

Repositorio con ejemplos prácticos de TDD, Testing e Integración con React, TypeScript y Vitest para preparar el segundo parcial de Programación IV.

## Proyectos Incluidos

### 1. [card-tdd-example](./card-tdd-example)
**Tema:** TDD - Desarrollo Guiado por Pruebas

Ejemplo completo del ciclo TDD (Red-Green-Refactor) aplicado a un componente Card de producto con React.

**Qué contiene:**
- Proceso paso a paso de TDD con capturas de pantalla
- Componente Card con funcionalidad de mensajes
- Tests con React Testing Library y Vitest
- Ejemplos de render y user events


**Para practicar:**
- Ciclo TDD completo (escribir test > falla > implementar > pasa > refactorizar)
- Testing de componentes con RTL(React Testing Library)
- Manejo de estado y eventos
- User events (click, type)

---

### 2. [msw-example-vite](./msw-example-vite)
**Tema:** Mock Service Worker (MSW)

Ejemplo de cómo mockear APIs HTTP para testing sin depender de servicios reales.

**Qué contiene:**
- Configuración de MSW
- Mocks de handlers HTTP (GET, POST, etc.)
- Tests de componentes que consumen APIs
- Integración con Vitest


**Para practicar:**
- Mockear peticiones HTTP
- Testing de componentes que hacen fetch
- Manejo de estados de carga y errores
- Configuración de MSW con Vitest

---

### 3. [react-tdd-vitest-rtl-integracion](./react-tdd-vitest-rtl-integracion)
**Tema:** Tests de Integración

Tests de integración que prueban múltiples componentes trabajando juntos (TodoApp completo).

**Qué contiene:**
- Tests de integración de flujos completos
- Aplicación Todo List con Context API
- Tests que verifican la interacción entre componentes
- Mockeo de APIs con MSW


---

### 4. [react-tdd-vitest-todo-list](./react-tdd-vitest-todo-list)
**Tema:** TDD con React + Vitest + TypeScript

Aplicación Todo List desarrollada con metodología TDD desde cero.

**Qué contiene:**
- Aplicaciín Todo completa (agregar, completar, eliminar tareas)
- Suite completa de tests unitarios
- Configuración de Vitest UI
- Tests de componentes y estado


**Para practicar:**
- TDD aplicado a una aplicación
- Manejo de listas y estado
- Testing de interaccionescon usuarios

---

## Cómo usar este repositorio

### Instalación
Cada proyecto tiene sus propias dependencias. Entra a cada carpeta e instala:

```bash
cd nombre-del-proyecto
npm install
```

### Ejecutar tests
```bash
npm test              # Ejecuta los tests una vez
npm run test:watch    # Ejecuta los tests en modo watch
npm run test:ui       # Abre la interfaz gráfica de Vitest (donde está configurado)
```

### Ejecutar la aplicación
```bash
npm run dev
```

---

##  Conceptos clave para el parcial

### React Testing Library
- `render()`: Renderiza componentes
- `screen`: Query para encontrar elementos
- `userEvent`: Simular interacciones del usuario
- `waitFor`: Esperar cambios asíncronos

### Vitest
- `describe()`: Agrupar tests relacionados
- `it()` / `test()`: Definir un test individual
- `expect()`: Hacer assertions
- Matchers: `toBe()`, `toBeInTheDocument()`, `toHaveTextContent()`, etc.

### MSW (Mock Service Worker)
- Mockear APIs HTTP sin modificar el código de la app
- Handlers para diferentes métodos HTTP
- Testing de estados de carga y error

### Tests de Integración
- Probar múltiples componentes juntos
- Verificar flujos completos de usuario
- Testing de Context API y estado global

---

### Mucha suerte en el parcial 🍀

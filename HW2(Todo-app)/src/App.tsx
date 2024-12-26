import { useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoStats } from "./components/TodoStats";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, isUrgent: boolean) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      isUrgent,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    urgent: todos.filter((todo) => todo.isUrgent).length,
  };

  return (
    <main>
      <div className="container">
        <h1 className="heading">Todo List</h1>

        <h5 className="date">{new Date().toDateString()}</h5>
        <TodoForm onSubmit={addTodo} />
        <TodoStats {...stats} />

        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;

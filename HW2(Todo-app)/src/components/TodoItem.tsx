import { AlertCircle, CheckCircle, Circle, Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`todo-item ${todo.completed ? "todo-completed" : ""}`}>
      <div className="todo-content">
        <button onClick={() => onToggle(todo.id)} className="todo-toggle">
          {todo.completed ? (
            <CheckCircle className="todo-check-icon" />
          ) : (
            <Circle className="todo-circle-icon" />
          )}
        </button>

        <span
          className={`todo-title ${
            todo.completed ? "todo-title-completed" : ""
          }`}
        >
          {todo.title}
        </span>

        {todo.isUrgent && <AlertCircle className="todo-urgent-icon" />}
      </div>

      <button onClick={() => onDelete(todo.id)} className="todo-delete">
        <Trash2 className="todo-trash-icon" />
      </button>
    </div>
  );
}

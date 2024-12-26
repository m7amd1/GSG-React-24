import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import "./style.css";

interface TodoFormProps {
  onSubmit: (title: string, isUrgent: boolean) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    onSubmit(title.trim(), isUrgent);
    setTitle("");
    setIsUrgent(false);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        {error && (
          <div className="error-msg">
            <AlertCircle className="alertIcon" />
            {error}
          </div>
        )}
      </div>

      <div className="wrapper">
        <input
          type="checkbox"
          id="urgent"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
          className="urgentInput"
        />
        <label htmlFor="urgent">Mark as urgent</label>
      </div>

      <button type="submit" className="btn">
        Add Todo
      </button>
    </form>
  );
}

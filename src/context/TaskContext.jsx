import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext(null);

// هر وظیفه: { id, title, description, priority, status, createdAt }
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = ({ title, description, priority, status }) =>
    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        createdAt: new Date().toISOString(), // تاریخ ایجاد
      },
      ...prev,
    ]);

  const updateTask = (id, changes) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      todo: tasks.filter((t) => t.status === "Todo").length,
    }),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, stats, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks باید داخل TaskProvider استفاده شود");
  return ctx;
}

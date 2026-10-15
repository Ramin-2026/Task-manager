import { useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";
import StatsBar from "../components/StatsBar";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // وظیفه در حال ویرایش
  const [toDelete, setToDelete] = useState(null); // وظیفه در انتظار تأیید حذف

  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        (filters.status === "all" || t.status === filters.status) &&
        (filters.priority === "all" || t.priority === filters.priority) &&
        (!q ||
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q))
    );
  }, [tasks, filters]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (task) => {
    setEditing(task);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSubmit = (data) => {
    if (editing) updateTask(editing.id, data);
    else addTask(data);
    closeForm();
  };

  return (
    <main className="container">
      <div className="top">
        <h1>📋 داشبورد وظایف</h1>
        <button className="btn primary" onClick={openCreate}>
          + وظیفه جدید
        </button>
      </div>

      <StatsBar />
      <TaskFilters filters={filters} onChange={setFilters} />

      {visible.length === 0 ? (
        <p className="empty">
          {tasks.length === 0
            ? "هنوز وظیفه‌ای ثبت نکرده‌اید. اولین وظیفه را بسازید!"
            : "وظیفه‌ای با این فیلترها پیدا نشد."}
        </p>
      ) : (
        <section className="list">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={(id, status) => updateTask(id, { status })}
              onEdit={openEdit}
              onDelete={setToDelete}
            />
          ))}
        </section>
      )}

      {formOpen && (
        <TaskForm task={editing} onSubmit={handleSubmit} onCancel={closeForm} />
      )}

      {toDelete && (
        <ConfirmDialog
          message={`وظیفه «${toDelete.title}» حذف شود؟`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteTask(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </main>
  );
}

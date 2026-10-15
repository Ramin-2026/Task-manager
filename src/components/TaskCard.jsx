import { PRIORITIES, STATUSES, labelOf, formatDate } from "../utils/constants";

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const done = task.status === "Completed";

  return (
    <article className={`task ${done ? "is-done" : ""}`}>
      <div className="task-top">
        <h3>{task.title}</h3>
        <span className={`pill p-${task.priority.toLowerCase()}`}>
          {labelOf(PRIORITIES, task.priority)}
        </span>
      </div>

      {task.description && <p className="desc">{task.description}</p>}

      <div className="task-meta">
        <small>📅 {formatDate(task.createdAt)}</small>
        <select
          className={`status s-${task.status.replace(" ", "").toLowerCase()}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="task-actions">
        <button className="btn ghost" onClick={() => onEdit(task)}>
          ✏️ ویرایش
        </button>
        <button className="btn danger" onClick={() => onDelete(task)}>
          🗑️ حذف
        </button>
      </div>
    </article>
  );
}

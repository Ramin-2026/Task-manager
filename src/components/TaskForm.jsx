import { useState } from "react";
import { PRIORITIES, STATUSES } from "../utils/constants";

const EMPTY = { title: "", description: "", priority: "Medium", status: "Todo" };

// task = null  → ایجاد وظیفه جدید ، task = {...} → ویرایش
export default function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    task
      ? {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
        }
      : EMPTY
  );
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("عنوان وظیفه الزامی است.");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>{task ? "ویرایش وظیفه" : "وظیفه جدید"}</h2>

        <label>
          عنوان
          <input
            autoFocus
            value={form.title}
            onChange={set("title")}
            placeholder="مثلاً: آماده‌سازی گزارش هفتگی"
          />
        </label>
        {error && <p className="error">{error}</p>}

        <label>
          توضیحات
          <textarea
            rows={4}
            value={form.description}
            onChange={set("description")}
            placeholder="جزئیات وظیفه..."
          />
        </label>

        <div className="row">
          <label>
            اولویت
            <select value={form.priority} onChange={set("priority")}>
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            وضعیت
            <select value={form.status} onChange={set("status")}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>
            انصراف
          </button>
          <button type="submit" className="btn primary">
            {task ? "ذخیره تغییرات" : "ایجاد وظیفه"}
          </button>
        </div>
      </form>
    </div>
  );
}

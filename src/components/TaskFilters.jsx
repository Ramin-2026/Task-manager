import { PRIORITIES, STATUSES } from "../utils/constants";

export default function TaskFilters({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="filters">
      <input
        type="search"
        placeholder="جست‌وجو در عنوان و توضیحات..."
        value={filters.search}
        onChange={set("search")}
      />
      <select value={filters.status} onChange={set("status")}>
        <option value="all">همه وضعیت‌ها</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <select value={filters.priority} onChange={set("priority")}>
        <option value="all">همه اولویت‌ها</option>
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}

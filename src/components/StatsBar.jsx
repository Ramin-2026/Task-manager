import { useTasks } from "../context/TaskContext";

const fa = (n) => n.toLocaleString("fa-IR");

export default function StatsBar() {
  const { stats } = useTasks();
  const percent = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <section className="stats">
      <div className="stat">
        <span>کل وظایف</span>
        <strong>{fa(stats.total)}</strong>
      </div>
      <div className="stat">
        <span>انجام نشده</span>
        <strong>{fa(stats.todo)}</strong>
      </div>
      <div className="stat">
        <span>در حال انجام</span>
        <strong>{fa(stats.inProgress)}</strong>
      </div>
      <div className="stat done">
        <span>تکمیل شده</span>
        <strong>{fa(stats.completed)}</strong>
      </div>
      <div className="progress" title={`${fa(percent)}٪ تکمیل شده`}>
        <div className="bar" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}

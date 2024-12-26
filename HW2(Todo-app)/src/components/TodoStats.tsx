interface TodoStatsProps {
  total: number;
  completed: number;
  urgent: number;
}

export function TodoStats({ total, completed, urgent }: TodoStatsProps) {
  return (
    <div className="stats-container">
      <div className="box">
        <div className="count">{total}</div>
        <div className="label">Total Tasks</div>
      </div>
      <div className="box">
        <div className="count count-completed">{completed}</div>
        <div className="label">Completed</div>
      </div>
      <div className="box">
        <div className="count count-urgent">{urgent}</div>
        <div className="label">Urgent</div>
      </div>
    </div>
  );
}
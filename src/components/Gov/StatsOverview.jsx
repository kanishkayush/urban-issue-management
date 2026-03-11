import { AlertOctagon, TrendingUp, CheckCircle, Activity } from 'lucide-react';

export default function StatsOverview() {
  const stats = [
    {
      title: 'Total Active Issues',
      value: '2,451',
      trend: '+12%',
      trendUp: true,
      icon: <Activity size={24} className="text-primary" />,
      color: 'rgba(79, 70, 229, 0.1)',
      border: 'var(--primary)'
    },
    {
      title: 'Critical Priority (AI)',
      value: '843',
      trend: '+5%',
      trendUp: true,
      icon: <AlertOctagon size={24} className="text-danger" />,
      color: 'rgba(239, 68, 68, 0.1)',
      border: 'var(--danger)'
    },
    {
      title: 'Resolved This Month',
      value: '1,204',
      trend: '+24%',
      trendUp: true,
      icon: <CheckCircle size={24} className="text-secondary" />,
      color: 'rgba(16, 185, 129, 0.1)',
      border: 'var(--secondary)'
    },
    {
      title: 'Avg. AI Confidence',
      value: '94.2%',
      trend: '+1.2%',
      trendUp: true,
      icon: <TrendingUp size={24} className="text-accent" />,
      color: 'rgba(245, 158, 11, 0.1)',
      border: 'var(--accent)'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="glass-panel stat-card" style={{ borderTop: `3px solid ${stat.border}` }}>
          <div className="stat-header">
            <h4 className="text-muted">{stat.title}</h4>
            <div className="icon-wrapper" style={{ background: stat.color }}>
              {stat.icon}
            </div>
          </div>
          <div className="stat-body">
            <h2 className="stat-value">{stat.value}</h2>
            <div className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
              <TrendingUp size={14} /> {stat.trend} from last month
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .icon-wrapper {
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.05em;
          margin-bottom: 0.25rem;
        }
        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .trend-up { color: var(--secondary); }
        .trend-down { color: var(--danger); transform: scaleY(-1); }
      `}</style>
    </div>
  );
}

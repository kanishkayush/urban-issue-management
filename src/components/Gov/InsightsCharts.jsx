import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useIssues } from '../../context/IssueContext';

const trendData = [
  { day: 'Mon', reports: 20 },
  { day: 'Tue', reports: 35 },
  { day: 'Wed', reports: 25 },
  { day: 'Thu', reports: 50 },
  { day: 'Fri', reports: 40 },
  { day: 'Sat', reports: 85 },
  { day: 'Sun', reports: 65 },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function InsightsCharts({ compact = false }) {
  const { issues } = useIssues();

  // Dynamic Data Aggregation based on Context
  const typeCount = issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {});
  
  const typeData = Object.keys(typeCount).map(type => ({
    name: type,
    value: typeCount[type]
  }));

  const areaData = [
    { name: 'Downtown', issues: issues.filter(i => i.location.includes('Downtown') || i.location.includes('Main')).length + 60, critical: 24 },
    { name: 'Northside', issues: 32, critical: 8 },
    { name: 'Westlake', issues: issues.filter(i => i.location.includes('Westlake')).length + 80, critical: 45 },
    { name: 'East End', issues: 12, critical: 2 },
    { name: 'Jaipur', issues: issues.filter(i => i.location.includes('Jaipur')).length + 40, critical: 15 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-panel" style={{ padding: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="label text-muted" style={{ marginBottom: '0.25rem' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontWeight: 600, fontSize: '0.875rem' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (compact) {
    return (
      <div className="charts-grid compact">
        <div className="glass-panel chart-card">
          <h4>Reports Trend (7 Days)</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="reports" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel chart-card">
          <h4>Issue Type Distribution</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Simple Legend */}
            <div className="chart-legend">
              {typeData.map((entry, index) => (
                <div key={index} className="legend-item text-sm text-muted">
                  <span className="legend-dot" style={{ background: COLORS[index] }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Analytics View
  return (
    <div className="analytics-container">
      <div className="glass-panel chart-card full-width">
        <div className="chart-header">
          <h3>Geospatial Issue Heatmap (Area-wise Simulation)</h3>
          <p className="text-muted text-sm">Comparing total reported issues vs. AI-flagged critical ones</p>
        </div>
        
        <div className="chart-wrapper large">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={areaData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="issues" name="Total Issues" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="critical" name="Critical Priority" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="glass-panel chart-card">
          <h4>Incident Volume Trend</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorReportsfull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="reports" stroke="var(--secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorReportsfull)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel chart-card">
          <h4>Infrastructure Issue Types</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend inline">
              {typeData.map((entry, index) => (
                <div key={index} className="legend-item text-sm text-muted">
                  <span className="legend-dot" style={{ background: COLORS[index] }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Global Recharts overrides for dark theme */
        .recharts-cartesian-grid-horizontal line {
          stroke: rgba(255,255,255,0.05);
        }
        
        .charts-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }
        .charts-grid.compact {
          grid-template-columns: 2fr 1fr;
        }
        @media (max-width: 968px) {
          .charts-grid, .charts-grid.compact {
            grid-template-columns: 1fr;
          }
        }
        
        .analytics-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .chart-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .chart-card h4 { margin-bottom: 1.5rem; color: var(--text-main); }
        .chart-header { margin-bottom: 2rem; }
        
        .chart-wrapper {
          width: 100%;
          height: 300px;
          display: flex;
          align-items: center;
          position: relative;
        }
        .chart-wrapper.large {
          height: 400px;
        }
        
        .chart-legend {
          position: absolute;
          bottom: -1rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
        }
        .chart-legend.inline {
          flex-direction: row;
          flex-wrap: wrap;
          bottom: 0px;
          gap: 1rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

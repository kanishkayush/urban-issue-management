import { MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function NearbyAreas() {
  const data = [
    { name: 'Malviya Ngr', score: 85, color: 'var(--danger)' },
    { name: 'Vaishali Ngr', score: 65, color: 'var(--accent)' },
    { name: 'Mansarovar', score: 45, color: 'var(--primary)' },
    { name: 'C-Scheme', score: 20, color: 'var(--secondary)' },
    { name: 'Bapu Ngr', score: 75, color: 'var(--danger)' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel" style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.9)' }}>
          <p className="text-muted text-sm">{payload[0].payload.name}</p>
          <p style={{ color: payload[0].payload.color, fontWeight: 700 }}>Severity Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel nearby-card">
      <div className="card-header">
        <h3>Nearby Areas Severity</h3>
        <p className="text-muted text-sm">Real-time localized AI hazard scores</p>
      </div>

      <div className="chart-container" style={{ flex: 1, width: '100%', minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
              width={80}
            />
            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .nearby-card {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .text-sm { font-size: 0.875rem; }
        .card-header { margin-bottom: 1rem; }
      `}</style>
    </div>
  );
}
